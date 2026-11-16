import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
const html = await readFile("out/index.html", "utf8");
const doc = new JSDOM(html).window.document;
for (const id of [
  "hero",
  "vision",
  "exterior",
  "floorplans",
  "interiors",
  "experience",
  "materials",
  "finale",
])
  assert.ok(doc.querySelector("main > section#" + id), id);
assert.equal(doc.querySelectorAll("h1").length, 1);
assert.ok(doc.querySelector('img[fetchpriority="high"]'));
assert.equal(doc.querySelector('video,canvas,input[type="password"]'), null);
assert.equal(
  doc.querySelector('meta[name="robots"]')?.content.includes("noindex"),
  process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true",
);
assert.ok(!html.includes("The Courtyard House"));
for (const link of doc.querySelectorAll('a[href^="#"]'))
  assert.ok(doc.getElementById(link.getAttribute("href").slice(1)));
const assets = new Set();
for (const node of doc.querySelectorAll("img[src],script[src],link[href]")) {
  const url = node.getAttribute("src") ?? node.getAttribute("href");
  if (url?.startsWith("/") && !url.startsWith("//"))
    assets.add(url.split("?")[0]);
}
for (const path of assets) await access(resolve("out", "." + path));
const manifest = JSON.parse(
  await readFile("out/residence/manifest.json", "utf8"),
);
assert.equal(manifest.length, 48);
for (const image of manifest)
  for (const path of [
    image.src,
    image.fullSrc,
    ...image.sources.map((s) => s.src),
  ])
    await access(resolve("out", "." + path));
await access("out/404.html");
console.log(
  "Verified 8 sections, 48 supplied renders, all 192 responsive assets, anchors, initial media loading and 404 output.",
);
