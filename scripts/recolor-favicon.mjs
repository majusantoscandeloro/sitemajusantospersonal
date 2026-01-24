/**
 * Recupera halter.png, troca preto por laranja (#ff6b35) e gera halter-orange.png
 * Uso: npm run favicon:recolor
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const input = join(root, 'public', 'halter.png');
const output = join(root, 'public', 'halter-orange.png');

const ORANGE = [255, 107, 53];
const BLACK_THRESHOLD = 45;
const SIZE = 32;

const buffer = readFileSync(input);
const png = PNG.sync.read(buffer);
const { width, height, data } = png;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  const isBlack = r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD;
  if (isBlack && a > 0) {
    data[i] = ORANGE[0];
    data[i + 1] = ORANGE[1];
    data[i + 2] = ORANGE[2];
  }
}

const scaled = new PNG({ width: SIZE, height: SIZE });
const scaleX = width / SIZE;
const scaleY = height / SIZE;
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const srcX = Math.min(Math.floor(x * scaleX), width - 1);
    const srcY = Math.min(Math.floor(y * scaleY), height - 1);
    const srcI = (srcY * width + srcX) << 2;
    const dstI = (y * SIZE + x) << 2;
    scaled.data[dstI] = data[srcI];
    scaled.data[dstI + 1] = data[srcI + 1];
    scaled.data[dstI + 2] = data[srcI + 2];
    scaled.data[dstI + 3] = data[srcI + 3];
  }
}
writeFileSync(output, PNG.sync.write(scaled));

console.log('✓ Favicon laranja gerado: public/halter-orange.png');
