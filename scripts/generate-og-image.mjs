/**
 * Gera public/og-image.jpg (1200×630) — identidade creme + terracota + navy.
 * Uso: npm run og:image
 */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const photo = join(root, 'src', 'assets', 'fotos atuais maju', 'IMG_7210.JPEG');
const output = join(root, 'public', 'og-image.jpg');

const CREAM = '#F5F0ED';
const TERRACOTTA = '#C15847';
const INK = '#171717';

const overlay = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${CREAM}" stop-opacity="1"/>
      <stop offset="46%" stop-color="${CREAM}" stop-opacity="1"/>
      <stop offset="62%" stop-color="${CREAM}" stop-opacity="0.55"/>
      <stop offset="78%" stop-color="${CREAM}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${CREAM}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <text x="64" y="160" font-family="Georgia, 'Times New Roman', serif" font-size="24" font-weight="700" letter-spacing="5" fill="${TERRACOTTA}">MAJU SANTOS</text>
  <text x="64" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" fill="${INK}">Programas de treino</text>
  <text x="64" y="310" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" fill="${INK}">e consultoria</text>
  <text x="64" y="370" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" fill="${TERRACOTTA}">personalizada</text>
  <text x="64" y="440" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#6F6A68">Acesso pelo Majunity GO</text>
  <rect x="64" y="472" width="48" height="3" rx="1.5" fill="${TERRACOTTA}"/>
</svg>
`;

const photoLayer = await sharp(photo)
  .rotate()
  .resize(1200, 630, {
    fit: 'cover',
    // Maju fica à direita no ensaio — prioriza esse lado no crop
    position: 'right',
  })
  .modulate({ brightness: 1.02, saturation: 1.05 })
  .toBuffer();

await sharp(photoLayer)
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log(`og-image.jpg gerado: ${meta.width}×${meta.height}`);
