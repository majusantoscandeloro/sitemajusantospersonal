/**
 * Apaga TODA a coleção `programs/` (legado do seed antigo) e suas subcoleções:
 *   programs/{productId}/weeks/{weekId}/workouts/{workoutId}
 *
 * NÃO mexe em:
 *   - site_templates/  (usada pelo app)
 *   - purchases/, users/, profiles/, etc.
 *   - Firebase Storage (capas continuam lá)
 *
 * Uso (PowerShell):
 *   npm run delete:programs:dry   # lista o que seria apagado (não apaga nada)
 *   npm run delete:programs       # apaga de verdade (pede confirmação)
 *
 * Para pular confirmação (CI): npm run delete:programs -- --yes
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import admin from 'firebase-admin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipConfirm = args.includes('--yes') || args.includes('-y');

function loadServiceAccount() {
  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    join(root, 'tools', 'serviceAccountKey.json');
  if (!existsSync(credPath)) {
    console.error('\n❌ tools/serviceAccountKey.json não encontrado.\n');
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

async function deleteSubcollections(docRef) {
  const subs = await docRef.listCollections();
  for (const sub of subs) {
    const docs = await sub.listDocuments();
    for (const d of docs) {
      await deleteSubcollections(d);
      if (!dryRun) await d.delete();
      console.log(`   ${dryRun ? '[dry-run]' : '✓'} ${d.path}`);
    }
  }
}

async function confirm(message) {
  if (skipConfirm) return true;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'sim');
    });
  });
}

async function main() {
  const { db, projectId } = initFirebase();

  console.log(`
🗑️  Apagar coleção programs/ — projeto: ${projectId}
   Modo: ${dryRun ? 'DRY-RUN (não apaga)' : 'EXCLUSÃO REAL'}
`);

  const snap = await db.collection('programs').get();
  if (snap.empty) {
    console.log('Coleção programs/ está vazia. Nada a fazer.');
    return;
  }

  console.log(`Encontrados ${snap.size} documento(s) em programs/:`);
  snap.docs.forEach((d) => console.log(`  - programs/${d.id}`));
  console.log('');

  if (!dryRun) {
    const ok = await confirm('Confirma apagar TUDO em programs/? Digite "sim" para continuar: ');
    if (!ok) {
      console.log('Cancelado.');
      return;
    }
  }

  for (const doc of snap.docs) {
    console.log(`\n${dryRun ? '[dry-run]' : '✓'} programs/${doc.id}`);
    await deleteSubcollections(doc.ref);
    if (!dryRun) await doc.ref.delete();
  }

  console.log(`
${dryRun ? '✅ Dry-run' : '✅ Concluído'}: coleção programs/ ${dryRun ? 'seria apagada' : 'foi apagada'}.
${dryRun ? '' : '   site_templates/ continua intacta (é o que o app usa).\n'}
`);
}

main().catch((err) => {
  console.error('Erro:', err);
  process.exit(1);
});
