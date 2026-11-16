import renders from "./renders.json";
import type { ArchitecturalImage } from "@/types/architecture";
export const images: ArchitecturalImage[] = renders;
export const categories = [
  "All spaces",
  "Arrival",
  "Shared spaces",
  "Private spaces",
  "Circulation",
  "Bathrooms & utility",
  "Outdoor & details",
];
const spaceOrder = [
  "exterior",
  "entry",
  "ramp",
  "garage",
  "living",
  "dining",
  "kitchen",
  "bar",
  "stairs",
  "hallway",
  "primary",
  "primary-bath",
  "closet",
  "bedroom-1",
  "bedroom-2",
  "bedroom-3",
  "bedroom-4",
  "upper-bath",
  "common-bath",
  "secondary-kitchen",
  "laundry",
  "balcony",
  "facade-detail",
];
export const spaces = [
  ...new Map(
    images.map((i) => [
      i.spaceId,
      {
        id: i.spaceId,
        name: i.spaceName,
        japanese: i.japanese,
        category: i.category,
      },
    ]),
  ).values(),
].sort((a, b) => spaceOrder.indexOf(a.id) - spaceOrder.indexOf(b.id));
export function renderByFile(name: string) {
  const image = images.find((i) => i.sourceFilename === name);
  if (!image) throw new Error("Missing supplied render: " + name);
  return image;
}
export const project = {
  name: "The Residence",
  hero: renderByFile("EXTERIOR PERSPECTIVE 2.png"),
  living: renderByFile("LIVING AREA 2.png"),
  bedroom: renderByFile("MASTER'S BEDROOM AREA 1.png"),
  balcony: renderByFile("BALCONY 2.png"),
};
export const arrival = [
  "EXTERIOR PERSPECTIVE 1.png",
  "ENTRY PORCH 1.png",
  "RAMP 1.png",
  "CAR GARAGE 2.png",
].map(renderByFile);
