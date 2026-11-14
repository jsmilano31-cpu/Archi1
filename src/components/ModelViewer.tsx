'use client';

import { Component, Suspense, useRef, useState } from 'react';
import type { ComponentRef, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, Html, OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import type { ModelMedia } from '@/types/architecture';
import { MediaImage } from './MediaImage';

class ModelBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function Building({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <Center><primitive object={scene} /></Center>;
}

function Progress() {
  const { progress } = useProgress();
  return <Html center><span className="model-progress" role="status">Loading model · {Math.round(progress)}%</span></Html>;
}

export default function ModelViewer({ model }: { model: ModelMedia }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const [resetKey, setResetKey] = useState(0);
  const fallback = <div className="model-fallback"><MediaImage src={model.poster} alt={model.description} /><div><p>The interactive model is unavailable on this device.</p><p className="small">{model.description}</p></div></div>;
  return <div><ModelBoundary fallback={fallback}><div className="model-canvas" role="img" aria-label={model.description}>
    <Canvas key={resetKey} camera={{ position: [8, 6, 8], fov: 45 }} dpr={[1, 1.5]} frameloop="demand" fallback={fallback} gl={{ antialias: true }}>
      <color attach="background" args={['#191b18']} /><ambientLight intensity={1.5} /><directionalLight position={[5, 8, 3]} intensity={3} />
      <Suspense fallback={<Progress />}><Bounds fit clip observe margin={1.25}><Building url={model.url} /></Bounds></Suspense>
      <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={1} maxDistance={40} autoRotate={false} />
    </Canvas>
  </div></ModelBoundary><div className="model-controls"><p className="small muted">Drag to rotate · Scroll or pinch to zoom. Use the image gallery for an accessible alternative.</p><button className="button" onClick={() => { controls.current?.reset(); setResetKey((key) => key + 1); }}>Reset camera</button></div><p className="small muted">{model.description}</p></div>;
}
