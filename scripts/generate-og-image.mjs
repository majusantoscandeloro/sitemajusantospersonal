/**
 * Gera public/og-image.jpg (1200×630) para Open Graph / WhatsApp.
 * Uso: npm run og:image
 */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const input = join(root, 'src', 'assets', 'imagens_site', 'hero4.png');
const output = join(root, 'public', 'og-image.jpg');

await sharp(input)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log(`og-image.jpg gerado: ${meta.width}×${meta.height}`);
