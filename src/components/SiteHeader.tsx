'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [['vision', 'Vision'], ['exterior', 'Architecture'], ['floorplans', 'The plans'], ['experience', 'Experience']];

export function SiteHeader({ studio }: { studio: string }) {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const hero = document.getElementById('hero');
    const headerObserver = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0.15 });
    if (hero) headerObserver.observe(hero);
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));
    return () => { headerObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="wordmark" href="#hero" aria-label={`${studio}, back to top`}>{studio}<span className="wordmark-dot" /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([id, name]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{name}</a>)}</nav>
      <a className="header-contact" href="#finale">Let’s talk <ArrowUpRight size={14} /></a>
      <button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={() => menu.current?.showModal()}><Menu size={22} /></button>
    </header>
    <dialog ref={menu} className="mobile-menu" onClick={(event) => { if (event.target === event.currentTarget) menu.current?.close(); }}>
      <div className="mobile-menu-top"><span className="eyebrow">Explore the house</span><button className="icon-button" aria-label="Close navigation" onClick={() => menu.current?.close()}><X /></button></div>
      <nav aria-label="Mobile navigation">{[...links, ['finale', 'Let’s talk']].map(([id, name], i) => <a key={id} href={`#${id}`} onClick={() => menu.current?.close()}><span>0{i + 1}</span>{name}<ArrowUpRight /></a>)}</nav>
      <p className="small muted">An illustrative architectural presentation.</p>
    </dialog>
  </>;
}
