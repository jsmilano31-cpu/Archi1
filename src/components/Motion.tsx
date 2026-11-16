"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      if (connection?.saveData) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-copy > *", {
          y: 20,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        });
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .forEach((el) =>
            gsap.from(el, {
              y: 22,
              opacity: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 95%", once: true },
            }),
          );
      });
      mm.add(
        "(min-width:1200px) and (min-height:720px) and (pointer:fine) and (prefers-reduced-motion:no-preference)",
        () => {
          const chapter = root.current?.querySelector(".arrival-sequence");
          const scenes = gsap.utils.toArray<HTMLElement>(".arrival-scene");
          if (!chapter || scenes.length < 2) return;
          gsap.set(chapter, { height: "90svh" });
          gsap.set(scenes, { position: "absolute", inset: 0, height: "100%" });
          gsap.set(scenes.slice(1), { autoAlpha: 0 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: "top 76px",
              end: () => "+=" + window.innerHeight * 1.8,
              scrub: 0.6,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
          scenes.slice(1).forEach((scene, index) => {
            tl.to(scenes[index], { autoAlpha: 0, duration: 0.65 }).to(
              scene,
              { autoAlpha: 1, duration: 0.65 },
              "<",
            );
          });
        },
      );
      let disposed = false;
      const refresh = () => {
        if (!disposed) ScrollTrigger.refresh();
      };
      const loaded = (event: Event) => {
        if (event.target instanceof HTMLImageElement) refresh();
      };
      const element = root.current;
      element?.addEventListener("load", loaded, true);
      document.fonts?.ready.then(refresh);
      return () => {
        disposed = true;
        element?.removeEventListener("load", loaded, true);
        mm.revert();
      };
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
