'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X, Expand } from 'lucide-react';
import type { ArchitecturalImage } from '@/types/architecture';
import { MediaImage } from './MediaImage';

export function Gallery({ items }: { items: ArchitecturalImage[] }) {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState('All spaces');
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visible = items.filter((item) => filter === 'All spaces' || item.category === filter);
  const item = visible[selected];
  function open(index: number, button: HTMLButtonElement) { setSelected(index); trigger.current = button; dialog.current?.showModal(); }
  function step(delta: number) { setSelected((current) => (current + delta + visible.length) % visible.length); }
  function close() { dialog.current?.close(); }
  return <>
    <div className="gallery-toolbar"><div className="gallery-filters" aria-label="Filter gallery">{['All spaces', 'Interior', 'Exterior', 'Detail'].map((category) => <button key={category} aria-pressed={filter === category} onClick={() => { setFilter(category); setSelected(0); }}>{category}</button>)}</div><span className="small muted">{String(visible.length).padStart(2, '0')} views</span></div>
    <div className="gallery-grid">{visible.map((image, index) => <figure key={image.id} className={index === 0 ? 'gallery-featured' : ''}>
      <button className="gallery-image" onClick={(event) => open(index, event.currentTarget)} aria-label={`Enlarge: ${image.caption}`}><MediaImage src={image.src} alt={image.alt} /><span className="gallery-expand"><Expand size={19} /></span><span className="image-tag">Demo imagery</span></button>
      <figcaption><span>{image.caption}</span><ArrowUpRight size={15} /></figcaption>
    </figure>)}</div>
    {visible.length === 0 && <p className="empty-state">Images for this collection will follow.</p>}
    <dialog ref={dialog} className="lightbox" aria-label="Architectural image gallery" onClose={() => trigger.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); step(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); } }}>
      <div className="lightbox-top"><span className="eyebrow">The Courtyard House / Demo gallery</span><button className="icon-button" aria-label="Close gallery" onClick={close}><X /></button></div>
      {item && <div className="lightbox-image"><MediaImage key={item.src} src={item.src} alt={item.alt} /></div>}
      <div className="lightbox-bottom"><p aria-live="polite">{item?.caption}<span>{selected + 1} / {visible.length}</span></p>{visible.length > 1 && <div className="lightbox-arrows"><button className="icon-button" aria-label="Previous image" onClick={() => step(-1)}><ArrowLeft /></button><button className="icon-button" aria-label="Next image" onClick={() => step(1)}><ArrowRight /></button></div>}</div>
    </dialog>
  </>;
}
