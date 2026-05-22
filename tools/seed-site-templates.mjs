/**
 * Popula Firestore na estrutura que o APP FLUTTER já lê:
 *
 *   site_templates/{productId}
 *     ├── (campos: title, description, level, durationWeeks, priceCents, coverImage, ...)
 *     └── rotinas/{rotinaId}
 *           ├── (campos da rotina)
 *           └── exercicios/{exercicioId}
 *                 └── (campos do exercício)
 *
 * Pré-requisitos: ver tools/README-seed.md
 *
 * Uso (PowerShell):
 *   npm run seed:site            # 16 programas + Rotina 1 modelo
 *   npm run seed:site:dry        # simular
 *   npm run seed:site -- --all   # inclui consultorias
 *   npm run seed:site -- definicao_total start_inicial
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { PROGRAM_SEEDS } from './seed-programs-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const includeAll = args.includes('--all');
const onlyIds = args.filter((a) => !a.startsWith('--'));

function loadServiceAccount() {
  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    join(root, 'tools', 'serviceAccountKey.json');
  if (!existsSync(credPath)) {
    console.error('\n❌ tools/serviceAccountKey.json não encontrado.\n   Veja tools/README-seed.md\n');
    process.exit(1);
  }
  return JSON.parse(readFileSync(credPath, 'utf8'));
}

function initFirebase() {
  const sa = loadServiceAccount();
  const projectId = process.env.FIREBASE_PROJECT_ID || sa.project_id;
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(sa), projectId });
  }
  return { db: admin.firestore(), projectId };
}

/** Documento principal em site_templates/{productId} */
function buildTemplateDoc(seed, { forDryRun = false } = {}) {
  const now = forDryRun ? new Date().toISOString() : FieldValue.serverTimestamp();
  return {
    productId: seed.productId,
    siteId: seed.siteId,
    title: seed.title,
    subtitle: seed.subtitle || null,
    description: seed.description,
    level: seed.level,
    durationLabel: seed.durationLabel,
    durationWeeks: seed.durationWeeks,
    priceCents: seed.priceCents,
    category: seed.category || null,
    type: seed.type,
    tags: seed.tags,
    coverImage: null,
    coverImagePath: seed.coverImagePath,
    accessDays: seed.type === 'consultoria'
      ? (seed.productId.includes('trimestral') ? 90 : 30)
      : 90,
    published: true,
    rotinasCount: seed.type === 'programa' ? 1 : 0,
    createdBy: 'seed-script',
    seededAt: now,
    updatedAt: now,
  };
}

/** Rotina/treino modelo (substitua pelas reais depois) */
function buildSampleRotina(productId, title) {
  return {
    rotinaId: 'rotina_1',
    rotina: {
      number: 1,
      title: 'Rotina 1 — Adaptação',
      description: `Primeira rotina do programa ${title}. Edite pelo painel do app.`,
      day: 'A',
      focus: 'Corpo inteiro (modelo)',
      estimatedMinutes: 45,
      order: 1,
      productId,
    },
    exercicios: [
      {
        exercicioId: 'aquecimento',
        data: {
          order: 1,
          name: 'Aquecimento',
          sets: 1,
          reps: '5 min',
          restSeconds: 0,
          videoUrl: null,
          notes: 'Substitua pelos exercícios reais.',
        },
      },
      {
        exercicioId: 'exercicio_1',
        data: {
          order: 2,
          name: 'Exercício principal 1',
          sets: 3,
          reps: '10-12',
          restSeconds: 60,
          videoUrl: null,
          notes: null,
        },
      },
      {
        exercicioId: 'exercicio_2',
        data: {
          order: 3,
          name: 'Exercício principal 2',
          sets: 3,
          reps: '10-12',
          restSeconds: 60,
          videoUrl: null,
          notes: null,
        },
      },
    ],
  };
}

async function seedOne(db, seed, { withSample }) {
  const tplData = buildTemplateDoc(seed, { forDryRun: !db });

  if (!db) {
    console.log(`[dry-run] site_templates/${seed.productId}`, tplData);
    if (withSample) {
      const s = buildSampleRotina(seed.productId, seed.title);
      console.log(`  └─ rotinas/${s.rotinaId}`, s.rotina);
      s.exercicios.forEach((ex) =>
        console.log(`     └─ exercicios/${ex.exercicioId}`, ex.data)
      );
    }
    return;
  }

  const tplRef = db.collection('site_templates').doc(seed.productId);
  await tplRef.set(tplData, { merge: true });
  console.log(`✓ site_templates/${seed.productId}`);

  if (!withSample) return;

  const sample = buildSampleRotina(seed.productId, seed.title);
  const rotinaRef = tplRef.collection('rotinas').doc(sample.rotinaId);
  await rotinaRef.set(sample.rotina, { merge: true });
  console.log(`  ✓ rotinas/${sample.rotinaId}`);

  for (const ex of sample.exercicios) {
    await rotinaRef.collection('exercicios').doc(ex.exercicioId).set(ex.data, { merge: true });
    console.log(`    ✓ exercicios/${ex.exercicioId}`);
  }
}

function resolveSeeds() {
  let seeds = PROGRAM_SEEDS;
  if (!includeAll) seeds = seeds.filter((s) => s.type === 'programa');
  if (onlyIds.length > 0) {
    seeds = seeds.filter((s) => onlyIds.includes(s.productId));
    const missing = onlyIds.filter((id) => !seeds.some((s) => s.productId === id));
    if (missing.length) console.warn('⚠ productIds não encontrados:', missing.join(', '));
  }
  if (seeds.length === 0) {
    console.error('Nenhum programa para popular.');
    process.exit(1);
  }
  return seeds;
}

async function main() {
  const seeds = resolveSeeds();

  if (dryRun) {
    console.log(`\n🌱 site_templates — DRY-RUN\n   Itens: ${seeds.length}\n`);
    for (const s of seeds) await seedOne(null, s, { withSample: s.type === 'programa' });
    console.log(`\n✅ Dry-run: ${seeds.length} programa(s). Nada gravado.\n`);
    return;
  }

  const { db, projectId } = initFirebase();
  console.log(`\n🌱 site_templates — projeto: ${projectId}\n   Itens: ${seeds.length}\n`);

  for (const s of seeds) await seedOne(db, s, { withSample: s.type === 'programa' });

  console.log(`
✅ Concluído: ${seeds.length} documento(s) em site_templates/

Próximos passos:
  1. npm run upload:covers   → sobe capas para o Storage e preenche coverImage
  2. Edite as rotinas/exercícios reais via painel do app
  3. Teste no app: login → o aluno vê só os programas que comprou
`);
}

main().catch((err) => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
