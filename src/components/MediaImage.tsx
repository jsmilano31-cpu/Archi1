'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export function MediaImage({ src, alt, priority = false, className = '', position }: {
  src: string; alt: string; priority?: boolean; className?: string; position?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`image-fallback ${className}`} role="img" aria-label={alt}><ImageOff size={28} /><span>Image unavailable</span></div>;
  return <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 767px) 100vw, 80vw" className={className} style={{ objectFit: 'cover', objectPosition: position }} onError={() => setFailed(true)} />;
}
