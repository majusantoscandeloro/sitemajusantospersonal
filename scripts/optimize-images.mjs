/**
 * Otimiza imagens pesadas do site para WebP com dimensões controladas.
 *
 * Uso: node scripts/optimize-images.mjs
 *
 * Gera arquivos `.webp` ao lado dos originais (não apaga a fonte).
 * Depois atualize os imports nos componentes para apontar ao `.webp`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/** @type {{ input: string; maxWidth: number; quality: number }[]} */
const targets = [
  // Hero — full-bleed ~1920px
  {
    input: 'src/assets/fotos atuais maju/IMG_7210.JPEG',
    maxWidth: 2800,
    quality: 95,
  },
  // Seções editoriais
  {
    input: 'src/assets/fotos atuais maju/IMG_7211.JPEG',
    maxWidth: 1600,
    quality: 80,
  },
  {
    input: 'src/assets/fotos atuais maju/IMG_7212.JPEG',
    maxWidth: 1400,
    quality: 80,
  },
  {
    input: 'src/assets/fotos atuais maju/IMG_7214.JPEG',
    maxWidth: 1600,
    quality: 80,
  },
  // Consultoria (card)
  {
    input: 'src/assets/novo preset/online.JPG',
    maxWidth: 1000,
    quality: 80,
  },
  // Capas de programas (cards ~320px, retina ~640–800)
  {
    input: 'src/assets/novo preset/superiores-biceps.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/quadriceps.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/gluteos.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/superiores-triceps.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/treino_em_casa_sem_equipamento.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/treino_casa_completo.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/Hiit_em_casa.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/desafios.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/superiore-ombro.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/posteriores.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/abdominal.png',
    maxWidth: 800,
    quality: 75,
  },
  {
    input: 'src/assets/novo preset/superiores-biceps2.png',
    maxWidth: 800,
    quality: 75,
  },
  // App mockup
  {
    input: 'src/assets/imagens_site/app5_no_bg_clean.png',
    maxWidth: 900,
    quality: 80,
  },
  // Flyer eventos
  {
    input: 'src/assets/imagens_site/team_maju.png',
    maxWidth: 1200,
    quality: 80,
  },
];

function mb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

async function optimizeOne({ input, maxWidth, quality }) {
  const absIn = path.join(root, input);
  if (!fs.existsSync(absIn)) {
    console.warn(`SKIP (missing): ${input}`);
    return;
  }

  const parsed = path.parse(absIn);
  const absOut = path.join(parsed.dir, `${parsed.name}.webp`);
  const before = fs.statSync(absIn).size;

  await sharp(absIn)
    .rotate()
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: 'inside',
    })
    .webp({ quality, effort: 6 })
    .toFile(absOut);

  const after = fs.statSync(absOut).size;
  console.log(
    `${input}\n  → ${path.relative(root, absOut)}  ${mb(before)} MB → ${mb(after)} MB`,
  );

  // Hero também vai para public/ (preload LCP + src do Hero.tsx)
  if (input.includes('IMG_7210')) {
    const publicHero = path.join(root, 'public', 'hero.webp');
    fs.copyFileSync(absOut, publicHero);
    console.log(`  → public/hero.webp  ${mb(after)} MB`);
  }
}

async function main() {
  console.log('Otimizando imagens…\n');
  for (const target of targets) {
    await optimizeOne(target);
  }
  console.log('\nPronto. Atualize os imports para .webp onde aplicável.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
