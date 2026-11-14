'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Box, Play, X, ArrowUpRight } from 'lucide-react';
import type { ModelMedia, VideoMedia } from '@/types/architecture';
import { MediaImage } from './MediaImage';

const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false, loading: () => <div className="model-loading" role="status">Preparing the model viewer…</div> });

export function Experience({ video, model, poster }: { video?: VideoMedia; model?: ModelMedia; poster: string }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoDialog = useRef<HTMLDialogElement>(null);
  const modelDialog = useRef<HTMLDialogElement>(null);
  const videoTrigger = useRef<HTMLButtonElement>(null);
  const modelTrigger = useRef<HTMLButtonElement>(null);
  return <>
    <div className="experience-stage" data-reveal>
      <MediaImage src={video?.poster ?? poster} alt="Illustrative view of the residence, opening toward the garden." />
      <div className="experience-shade" />
      <div className="experience-content"><span className="eyebrow">06 / A different perspective</span><h2>Beyond the<br /><em>still image.</em></h2><p>{video || model ? 'Take a closer look at the spaces, the light, and the way it all comes together.' : 'A place to pause, look closer, and imagine life within. Walkthrough and model experiences will follow with the final project assets.'}</p>
        <div className="experience-actions">{video && <button ref={videoTrigger} className="button light" onClick={() => { setVideoOpen(true); videoDialog.current?.showModal(); }}><Play size={14} /> Play walkthrough</button>}{model && <button ref={modelTrigger} className="button light" onClick={() => { setModelOpen(true); modelDialog.current?.showModal(); }}><Box size={16} /> Explore in 3D</button>}{!video && !model && <a className="text-link" href="#interiors">Explore the image collection <ArrowUpRight size={16} /></a>}</div>
      </div><span className="experience-note">Illustrative concept / Final media to follow</span>
    </div>
    {video && <dialog ref={videoDialog} className="media-dialog" aria-label="Project walkthrough" onClose={() => { setVideoOpen(false); setVideoError(false); videoTrigger.current?.focus(); }}><div className="media-dialog-top"><h3>Project walkthrough</h3><button className="icon-button" aria-label="Close walkthrough" onClick={() => videoDialog.current?.close()}><X /></button></div>{videoOpen && !videoError && <video controls autoPlay playsInline preload="none" poster={video.poster} onError={() => setVideoError(true)}><source src={video.url} type="video/mp4" />{video.captionsUrl && <track kind="captions" src={video.captionsUrl} srcLang="en" label="English" default />}</video>}{videoError && <div className="empty-state"><p>The walkthrough could not be loaded.</p><button className="button" onClick={() => setVideoError(false)}>Try again</button></div>}{video.transcript && <details><summary>Read transcript</summary><p>{video.transcript}</p></details>}</dialog>}
    {model && <dialog ref={modelDialog} className="media-dialog" aria-label="Interactive project model" onClose={() => { setModelOpen(false); modelTrigger.current?.focus(); }}><div className="media-dialog-top"><h3>Explore the model</h3><button className="icon-button" aria-label="Close 3D viewer" onClick={() => modelDialog.current?.close()}><X /></button></div>{modelOpen && <ModelViewer model={model} />}</dialog>}
  </>;
}
