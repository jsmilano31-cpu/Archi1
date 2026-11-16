import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import sharp from "sharp";
import { images, spaces } from "../src/data/project";
test("all source filenames, checksums and output IDs are independently tracked", () => {
  assert.equal(images.length, 48);
  for (const field of ["id", "sourceFilename", "sourceSha256"] as const)
    assert.equal(new Set(images.map((i) => i[field])).size, 48);
  assert.equal(images.filter((i) => i.spaceId === "balcony").length, 4);
  assert.equal(spaces.length, 23);
});
test("every responsive file exists, decodes and preserves its aspect ratio", async () => {
  for (const image of images) {
    for (const asset of [
      ...image.sources,
      { src: image.fullSrc, width: 2560 },
    ]) {
      assert.ok(existsSync("public" + asset.src), asset.src);
      const m = await sharp("public" + asset.src).metadata();
      assert.equal(m.width, asset.width);
      assert.ok(
        Math.abs(m.width! / m.height! - image.width / image.height) < 0.002,
      );
    }
  }
});
test("public and application manifests are identical", () => {
  assert.deepEqual(
    JSON.parse(readFileSync("public/residence/manifest.json", "utf8")),
    images,
  );
});
