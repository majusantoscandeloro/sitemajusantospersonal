/**
 * Popula Firestore: programs/{productId} + semana/treino de exemplo.
 *
 * Pré-requisitos:
 * 1. Firebase Admin SDK: npm install (já no package.json após setup)
 * 2. Service Account JSON do projeto Firebase
 * 3. Variáveis de ambiente (veja tools/README-seed.md)
 *
 * Uso:
 *   npm run seed:programs              # todos os programas de treino (16)
 *   npm run seed:programs -- --all     # inclui consultorias (18)
 *   npm run seed:programs -- definicao_total hipertrofia_feminina
 *   npm run seed:programs -- --dry-run
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { PROGRAM_SEEDS, buildSampleWeek } from './seed-programs-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const includeAll = args.includes('--all');
const onlyIds = args.filter((a) => !a.startsWith('--'));

function loadServiceAccount() {
  const jsonInline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (jsonInline) {
    return JSON.parse(jsonInline);
  }

  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    join(root, 'tools', 'serviceAccountKey.json');

  if (!existsSync(credPath)) {
    console.error(`
❌ Credenciais não encontradas.

Opção A — arquivo (recomendado):
  1. Firebase Console → Configurações do projeto → Contas de serviço
  2. "Gerar nova chave privada" → salve como:
     tools/serviceAccountKey.json
  3. Rode: npm run seed:programs

Opção B — variável de ambiente:
  $env:GOOGLE_APPLICATION_CREDENTIALS="C:\\caminho\\para\\chave.json"
  npm run seed:programs

Opção C — JSON inline (PowerShell):
  $env:FIREBASE_SERVICE_ACCOUNT_JSON = Get-Content .\\tools\\serviceAccountKey.json -Raw
  npm run seed:programs
`);
    process.exit(1);
  }

  return JSON.parse(readFileSync(credPath, 'utf8'));
}

function initFirebase() {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.VITE_FIREBASE_PROJECT_ID ||
    loadServiceAccount().project_id;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(loadServiceAccount()),
      projectId,
    });
  }

  return { db: admin.firestore(), projectId };
}

function buildProgramDoc(seed, { forDryRun = false } = {}) {
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
    totalWorkouts: seed.type === 'programa' ? 1 : 0,
    accessDays: seed.type === 'consultoria' ? (seed.productId.includes('trimestral') ? 90 : 30) : 90,
    published: true,
    seededAt: now,
    updatedAt: now,
  };
}

async function seedOneProgram(db, seed, { withSampleWeek }) {
  const programData = buildProgramDoc(seed, { forDryRun: !db });

  if (!db) {
    console.log(`[dry-run] programs/${seed.productId}`, programData);
    if (withSampleWeek) {
      const sample = buildSampleWeek(seed.productId, seed.title);
      console.log(`  └─ weeks/${sample.weekDocId}`, sample.week);
      console.log(`     └─ workouts/${sample.workouts[0].workoutDocId}`, sample.workouts[0].workout);
    }
    return;
  }

  const ref = db.collection('programs').doc(seed.productId);
  await ref.set(programData, { merge: true });
  console.log(`✓ programs/${seed.productId}`);

  if (!withSampleWeek) return;

  const sample = buildSampleWeek(seed.productId, seed.title);
  const weekRef = ref.collection('weeks').doc(sample.weekDocId);
  await weekRef.set(sample.week, { merge: true });
  console.log(`  ✓ weeks/${sample.weekDocId}`);

  for (const { workoutDocId, workout } of sample.workouts) {
    await weekRef.collection('workouts').doc(workoutDocId).set(workout, { merge: true });
    console.log(`    ✓ workouts/${workoutDocId}`);
  }
}

function resolveSeeds() {
  let seeds = PROGRAM_SEEDS;
  if (!includeAll) {
    seeds = seeds.filter((s) => s.type === 'programa');
  }
  if (onlyIds.length > 0) {
    seeds = seeds.filter((s) => onlyIds.includes(s.productId));
    const missing = onlyIds.filter((id) => !seeds.some((s) => s.productId === id));
    if (missing.length) {
      console.warn('⚠ productIds não encontrados no catálogo:', missing.join(', '));
    }
  }

  if (seeds.length === 0) {
    console.error('Nenhum programa para popular. Verifique os productIds.');
    process.exit(1);
  }
  return seeds;
}

async function main() {
  const seeds = resolveSeeds();

  if (dryRun) {
    console.log(`\n🌱 Seed de programas — DRY-RUN\n   Itens: ${seeds.length}\n`);
    for (const seed of seeds) {
      await seedOneProgram(null, seed, { withSampleWeek: seed.type === 'programa' });
    }
    console.log(`\n✅ Dry-run: ${seeds.length} programa(s). Nada gravado.\n`);
    return;
  }

  const { db, projectId } = initFirebase();

  console.log(`
🌱 Seed de programas — projeto: ${projectId}
   Modo: GRAVAÇÃO
   Itens: ${seeds.length}
`);

  for (const seed of seeds) {
    const withSampleWeek = seed.type === 'programa';
    await seedOneProgram(db, seed, { withSampleWeek });
  }

  console.log(`
✅ Concluído: ${seeds.length} documento(s) em programs/
Próximos passos:
  1. Suba as capas para Firebase Storage e atualize coverImage em cada programs/{productId}
  2. Edite semanas/treinos/exercícios reais (o script criou só Semana 1 / Treino A de modelo)
  3. No app Flutter, teste: login → Meus Programas → abrir um programa comprado
`);
}

main().catch((err) => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
