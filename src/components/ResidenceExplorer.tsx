"use client";
import { createContext, useContext, useState } from "react";
import { Gallery } from "./Gallery";
import { images } from "@/data/project";

const ExplorerContext = createContext<{ spaceId: string; version: number; selectSpace: (id: string) => void } | null>(null);
export function ResidenceExplorer({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState({ spaceId: "living", version: 0 });
  function selectSpace(spaceId: string) {
    setSelection((previous) => ({ spaceId, version: previous.version + 1 }));
    requestAnimationFrame(() => {
      const heading = document.getElementById("explore-title");
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    });
  }
  return <ExplorerContext.Provider value={{ ...selection, selectSpace }}>{children}</ExplorerContext.Provider>;
}
export function useResidenceExplorer() {
  const context = useContext(ExplorerContext);
  if (!context) throw new Error("Residence explorer provider is required");
  return context;
}
export function SpaceGallery() {
  const { spaceId, version } = useResidenceExplorer();
  return <Gallery key={version} items={images} initialSpaceId={spaceId} />;
}
