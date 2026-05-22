/**
 * Faz upload das capas dos programas (src/assets/novo preset/...) para o Firebase Storage
 * e atualiza programs/{productId}.coverImage no Firestore com a URL pública.
 *
 * Uso (PowerShell, raiz do projeto):
 *   npm run upload:covers              # todos os programas
 *   npm run upload:covers:dry          # simular
 *   npm run upload:covers -- definicao_total start_inicial   # só esses
 *
 * Pré-requisitos:
 *   1. tools/serviceAccountKey.json (mesma chave usada no seed)
 *   2. Firebase Storage HABILITADO no Console (Storage → Get started → modo produção)
 *
 * Bucket: tenta detectar automaticamente. Se precisar forçar, defina:
 *   $env:FIREBASE_STORAGE_BUCKET="apponfit.appspot.com"
 *   (ou apponfit.firebasestorage.app, conforme o Console)
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join, extname, basename } from 'path';
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

const MIME_BY_EXT = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

function loadServiceAccount() {
  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    join(root, 'tools', 'serviceAccountKey.json');

  if (!existsSync(credPath)) {
    console.error('\n❌ tools/serviceAccountKey.json não encontrado. Veja tools/README-seed.md\n');
    process.exit(1);
  }
  return JSON.parse(readFileSync(credPath, 'utf8'));
}

function initFirebase() {
  const sa = loadServiceAccount();
  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || sa.project_id;

  const bucketName =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.VITE_FIREBASE_STORAGE_BUCKET ||
    `${projectId}.appspot.com`;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(sa),
      projectId,
      storageBucket: bucketName,
    });
  }

  return {
    db: admin.firestore(),
    bucket: admin.storage().bucket(),
    projectId,
    bucketName,
  };
}

function buildPublicUrl(bucketName, objectPath) {
  return `https://storage.googleapis.com/${bucketName}/${encodeURI(objectPath)}`;
}

function pickSeeds() {
  let seeds = PROGRAM_SEEDS.filter((s) => s.coverImagePath);
  if (!includeAll) {
    seeds = seeds.filter((s) => s.type === 'programa');
  }
  if (onlyIds.length > 0) {
    seeds = seeds.filter((s) => onlyIds.includes(s.productId));
  }
  return seeds;
}

async function uploadOne({ bucket, bucketName, db }, seed) {
  const localPath = join(root, seed.coverImagePath);
  if (!existsSync(localPath)) {
    console.warn(`✗ ${seed.productId}: imagem local não encontrada (${seed.coverImagePath})`);
    return { ok: false };
  }

  const ext = extname(localPath).toLowerCase();
  const contentType = MIME_BY_EXT[ext] || 'application/octet-stream';
  const destination = `programs/${seed.productId}/cover${ext.toLowerCase()}`;

  if (dryRun) {
    console.log(`[dry-run] ${seed.productId}`);
    console.log(`   local : ${seed.coverImagePath}`);
    console.log(`   dest  : gs://${bucketName}/${destination}`);
    console.log(`   url   : ${buildPublicUrl(bucketName, destination)}`);
    return { ok: true };
  }

  await bucket.upload(localPath, {
    destination,
    metadata: {
      contentType,
      cacheControl: 'public,max-age=31536000,immutable',
    },
    resumable: false,
  });

  const file = bucket.file(destination);
  await file.makePublic();
  const url = buildPublicUrl(bucketName, destination);

  const payload = {
    coverImage: url,
    coverImageStoragePath: destination,
    coverImageFileName: basename(localPath),
    updatedAt: FieldValue.serverTimestamp(),
  };

  // Atualiza site_templates (estrutura usada pelo app) e programs (legado do seed antigo, se existir)
  await Promise.all([
    db.collection('site_templates').doc(seed.productId).set(payload, { merge: true }),
    db.collection('programs').doc(seed.productId).set(payload, { merge: true }),
  ]);

  console.log(`✓ ${seed.productId}`);
  console.log(`   ${url}`);
  return { ok: true, url };
}

async function main() {
  const seeds = pickSeeds();
  if (seeds.length === 0) {
    console.error('Nenhum programa com coverImagePath para processar.');
    process.exit(1);
  }

  const ctx = dryRun
    ? { bucketName: process.env.FIREBASE_STORAGE_BUCKET || 'PROJECT.appspot.com' }
    : initFirebase();

  console.log(`
🖼️  Upload de capas — bucket: ${ctx.bucketName}
   Modo: ${dryRun ? 'DRY-RUN' : 'GRAVAÇÃO'}
   Itens: ${seeds.length}
`);

  let ok = 0;
  let fail = 0;
  for (const seed of seeds) {
    try {
      const res = await uploadOne(ctx, seed);
      res.ok ? ok++ : fail++;
    } catch (err) {
      fail++;
      console.error(`✗ ${seed.productId}:`, err.message || err);
      if (String(err.message || '').toLowerCase().includes('does not exist')) {
        console.error(`
⚠ O bucket "${ctx.bucketName}" não existe.
   1. Acesse Firebase Console → Storage → "Começar agora"
   2. Se o nome real for diferente (ex.: apponfit.firebasestorage.app), rode:
        $env:FIREBASE_STORAGE_BUCKET="apponfit.firebasestorage.app"
        npm run upload:covers
`);
        process.exit(1);
      }
    }
  }

  console.log(`
${dryRun ? '✅ Dry-run' : '✅ Concluído'}: ${ok} ok, ${fail} falha(s).
${dryRun ? '' : 'Cada programs/{productId} agora tem coverImage com URL pública do Storage.'}
`);
}

main().catch((err) => {
  console.error('Erro no upload:', err);
  process.exit(1);
});
