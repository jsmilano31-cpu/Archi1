'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-title > span', { y: 40, autoAlpha: 0, stagger: 0.13, duration: 1.1, ease: 'power3.out' });
      gsap.from('.hero-media', { scale: 1.035, duration: 2, ease: 'power2.out' });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 26, autoAlpha: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
    });
    mm.add('(min-width: 1200px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const chapter = root.current?.querySelector('.exterior-scene');
      if (!chapter) return;
      gsap.fromTo('.exterior-scene .scene-media', { scale: 1.04 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top top', end: '+=28%', pin: true, scrub: 0.8, invalidateOnRefresh: true } });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts.ready.then(refresh);
    return () => { window.removeEventListener('load', refresh); mm.revert(); };
  }, { scope: root });
  return <div ref={root}>{children}</div>;
}
