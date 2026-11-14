import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const html = await readFile('out/index.html', 'utf8');
const doc = new JSDOM(html).window.document;
const chapters = ['hero', 'vision', 'exterior', 'floorplans', 'interiors', 'experience', 'materials', 'finale'];
for (const id of chapters) assert.ok(doc.querySelector(`main > section#${id}`), `Missing chapter ${id}`);
assert.equal(doc.querySelectorAll('h1').length, 1, 'Page needs one primary heading');
assert.equal(doc.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex'), process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'true');
assert.equal(doc.querySelector('video, canvas'), null, 'Heavy media must not mount initially');
assert.equal(doc.querySelector('input[type="password"]'), null);
for (const link of doc.querySelectorAll('a[href^="#"]')) {
  assert.ok(doc.getElementById(link.getAttribute('href').slice(1)), `Broken anchor ${link.getAttribute('href')}`);
}
const paths = new Set();
for (const node of doc.querySelectorAll('img[src],script[src],link[href]')) {
  const url = node.getAttribute('src') ?? node.getAttribute('href');
  if (url?.startsWith('/') && !url.startsWith('//')) {
    assert.ok(!url.startsWith('/_next/image'), 'Export must not depend on the image server');
    paths.add(url.split('?')[0]);
  }
}
for (const path of paths) await access(resolve('out', `.${path}`));
await access('out/404.html');
console.log(`Static export verified: ${chapters.length} chapters, valid anchors, ${paths.size} local assets, no initial video or canvas, and a 404 page.`);
