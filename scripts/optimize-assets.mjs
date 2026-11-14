import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
for (const name of ['house', 'living', 'bedroom', 'detail']) {
  await sharp(`assets-source/${name}.png`).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 83, effort: 6 }).toFile(`public/images/${name}.webp`);
  console.log(`Optimized ${name}.webp`);
}
