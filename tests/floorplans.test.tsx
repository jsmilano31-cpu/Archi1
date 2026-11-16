import "./setup-dom";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import { FloorPlans, floorPlans } from "../src/components/FloorPlans";
import { ResidenceExplorer, SpaceGallery } from "../src/components/ResidenceExplorer";
import { spaces } from "../src/data/project";

afterEach(cleanup);
HTMLElement.prototype.scrollIntoView = function () {};
function presentation() {
  return render(<ResidenceExplorer><FloorPlans /><h2 id="explore-title" tabIndex={-1}>Explore your home</h2><SpaceGallery /></ResidenceExplorer>);
}
test("both floor plans preserve source checksums, dimensions, previews, and valid room mappings", async () => {
  assert.equal(floorPlans.length, 2);
  assert.deepEqual(JSON.parse(await readFile("public/floorplans/manifest.json", "utf8")), floorPlans);
  for (const plan of floorPlans) {
    const original = await readFile("public" + plan.fullSrc);
    assert.equal(createHash("sha256").update(original).digest("hex"), plan.sourceSha256);
    const metadata = await sharp(original).metadata();
    assert.equal(metadata.width, plan.width);
    assert.equal(metadata.height, plan.height);
    for (const source of plan.sources) {
      const preview = await sharp("public" + source.src).metadata();
      assert.equal(preview.width, source.width);
      assert.equal(preview.height, source.width * plan.height / plan.width);
    }
    for (const id of plan.roomIds) assert.ok(spaces.some((space) => space.id === id));
  }
});
test("floor room lists are static and leave the independent gallery selection unchanged", () => {
  const view = presentation();
  for (const plan of floorPlans) {
    fireEvent.click(view.getByRole("button", { name: `${plan.title} ${plan.japanese}` }));
    const aside = view.getByRole("complementary", { name: `${plan.title} rooms` });
    const roomList = within(aside);
    assert.equal(roomList.queryAllByRole("link").length, 0);
    assert.equal(roomList.queryAllByRole("button").length, 0);
    assert.equal(aside.querySelectorAll("svg,[tabindex]").length, 0);
    const rows = roomList.getAllByRole("listitem");
    assert.equal(rows.length, plan.roomIds.length);
    for (const [index, id] of plan.roomIds.entries()) {
      const room = spaces.find((space) => space.id === id)!;
      assert.ok(rows[index].textContent?.includes(room.name));
      assert.ok(rows[index].textContent?.includes(room.japanese));
      fireEvent.click(rows[index]);
      assert.equal((view.getByRole("combobox") as HTMLSelectElement).value, "living");
    }
  }
});

test("plan viewer loads originals on demand, limits zoom, resets between floors and restores focus", () => {
  const view = presentation();
  assert.equal(view.container.querySelectorAll('img[src$="-original.png"]').length, 0);
  const opener = view.getByRole("button", { name: "Enlarge Ground Floor plan" });
  fireEvent.click(opener);
  const modal = within(view.getByRole("dialog", { name: "Floor plan viewer" }));
  assert.ok(modal.getByRole("img").getAttribute("src")?.endsWith("ground-original.png"));
  assert.ok((modal.getByRole("button", { name: "Zoom out" }) as HTMLButtonElement).disabled);
  for (let i = 0; i < 4; i++) fireEvent.click(modal.getByRole("button", { name: "Zoom in" }));
  assert.ok((modal.getByRole("button", { name: "Zoom in" }) as HTMLButtonElement).disabled);
  assert.ok(modal.getByText("300%"));
  fireEvent.click(modal.getByRole("button", { name: "Second Floor 2階" }));
  assert.ok(modal.getByText("100%"));
  assert.ok(modal.getByRole("img").getAttribute("src")?.endsWith("second-original.png"));
  fireEvent.click(modal.getByRole("button", { name: "Zoom in" }));
  fireEvent.click(modal.getByRole("button", { name: "Fit to view" }));
  assert.ok(modal.getByText("100%"));
  fireEvent.click(modal.getByRole("button", { name: "Close floor plan" }));
  assert.equal(document.activeElement, opener);
  assert.equal(view.container.querySelectorAll('img[src$="-original.png"]').length, 0);
});
