import "./setup-dom";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Gallery } from "../src/components/Gallery";
import { images, spaces } from "../src/data/project";
afterEach(cleanup);
test("every supplied image can be selected through the space and angle controls", () => {
  const view = render(<Gallery items={images} />);
  const selector = view.getByRole("combobox");
  let selectedCount = 0;
  for (const space of spaces) {
    fireEvent.change(selector, { target: { value: space.id } });
    const perspectives = images.filter((image) => image.spaceId === space.id);
    for (const [index, image] of perspectives.entries()) {
      fireEvent.click(view.getByRole("button", {
        name: `${space.name}, angle ${index + 1}`,
      }));
      const displayed = view.getByRole("button", {
        name: `Enlarge: ${image.caption}`,
      }).querySelector("img");
      assert.ok(displayed, image.sourceFilename);
      assert.equal(displayed.getAttribute("src"), image.src);
      assert.equal(displayed.getAttribute("alt"), image.alt);
      assert.ok(displayed.getAttribute("srcset")?.includes(image.sources[0].src));
      selectedCount++;
    }
  }
  assert.equal(selectedCount, 48);
});
test("all 48 perspectives are reachable in the complete collection", () => {
  const v = render(<Gallery items={images} />);
  fireEvent.click(v.getByRole("button", { name: "Browse all 48 views" }));
  const collection = document.getElementById("all-perspectives")!;
  assert.equal(collection.querySelectorAll("figure").length, 48);
  for (const image of images)
    assert.ok(collection.querySelector('img[alt="' + image.alt + '"]'));
});
test("category and space selection reset to a valid first angle", () => {
  const v = render(<Gallery items={images} />);
  fireEvent.click(v.getByRole("button", { name: /Primary bedroom 主寝室/ }));
  assert.ok(
    v.getByRole("button", { name: "Enlarge: Primary bedroom — View 01" }),
  );
  fireEvent.click(v.getByRole("button", { name: "Next angle" }));
  assert.ok(
    v.getByRole("button", { name: "Enlarge: Primary bedroom — View 02" }),
  );
  fireEvent.click(v.getByRole("button", { name: "Arrival" }));
  assert.ok(
    v.getByRole("button", { name: "Enlarge: Exterior perspectives — View 01" }),
  );
  assert.equal(
    v.queryByRole("button", { name: /Primary bedroom 主寝室/ }),
    null,
  );
});
test("angle navigation wraps and both similar balcony images remain independently selectable", () => {
  const v = render(<Gallery items={images} />);
  fireEvent.click(v.getByRole("button", { name: /^Balcony バルコニー/ }));
  assert.equal(v.getAllByRole("button", { name: /^Balcony, angle/ }).length, 4);
  fireEvent.click(v.getByRole("button", { name: "Previous angle" }));
  assert.ok(v.getByRole("button", { name: "Enlarge: Balcony — View 04" }));
  fireEvent.click(v.getByRole("button", { name: "Next angle" }));
  assert.ok(v.getByRole("button", { name: "Enlarge: Balcony — View 01" }));
});
test("lightbox loads full-resolution image only when open and restores focus on close", () => {
  const v = render(<Gallery items={images} />);
  assert.equal(document.querySelectorAll('img[src$="-2560.webp"]').length, 0);
  const opener = v.getByRole("button", {
    name: "Enlarge: Living room — View 01",
  });
  fireEvent.click(opener);
  const d = v.getByRole("dialog");
  assert.ok(d.hasAttribute("open"));
  assert.equal(d.querySelectorAll('img[src$="-2560.webp"]').length, 1);
  fireEvent.keyDown(d, { key: "ArrowRight" });
  assert.ok(d.textContent?.includes("Living room — View 02"));
  fireEvent.click(v.getByRole("button", { name: "Close gallery" }));
  assert.equal(document.activeElement, opener);
  assert.equal(document.querySelectorAll('img[src$="-2560.webp"]').length, 0);
});
test("single-perspective spaces disable angle navigation", () => {
  const v = render(<Gallery items={images} />);
  fireEvent.click(v.getByRole("button", { name: /^Entrance ramp/ }));
  assert.equal(
    (v.getByRole("button", { name: "Next angle" }) as HTMLButtonElement)
      .disabled,
    true,
  );
});
test("mobile swipe changes angle without opening a modal", () => {
  const v = render(<Gallery items={images} />);
  const image = v.getByRole("button", {
    name: "Enlarge: Living room — View 01",
  });
  fireEvent.touchStart(image, { touches: [{ clientX: 200 }] });
  fireEvent.touchEnd(image, { changedTouches: [{ clientX: 80 }] });
  assert.ok(v.getByRole("button", { name: "Enlarge: Living room — View 02" }));
  assert.equal(v.queryByRole("dialog"), null);
});
