'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { ArrowUpRight, Minus, Plus, RotateCcw, Move, Compass } from 'lucide-react';
import type { Floor, Room } from '@/types/architecture';
import { constrainPan, constrainZoom, roomsForFloor } from '@/lib/plan';
import { MediaImage } from './MediaImage';

export function FloorExplorer({ floors, rooms }: { floors: Floor[]; rooms: Room[] }) {
  const [floorId, setFloorId] = useState(floors[0]?.id ?? '');
  const [roomId, setRoomId] = useState(rooms.find((room) => room.floorId === floors[0]?.id)?.id ?? '');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; originalX: number; originalY: number } | null>(null);
  const floor = floors.find((item) => item.id === floorId) ?? floors[0];
  if (!floor) return <p className="empty-state">Floor drawings will be added here.</p>;
  const floorRooms = roomsForFloor(floor, rooms);
  const room = floorRooms.find((item) => item.id === roomId);
  const reset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  function selectFloor(next: Floor) {
    setFloorId(next.id);
    setRoomId(roomsForFloor(next, rooms)[0]?.id ?? '');
    reset();
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % floors.length;
    else if (event.key === 'ArrowLeft') next = (index + floors.length - 1) % floors.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = floors.length - 1;
    else return;
    event.preventDefault();
    selectFloor(floors[next]);
    document.getElementById(`tab-${floors[next].id}`)?.focus();
  }
  function adjustZoom(delta: number) {
    const next = constrainZoom(zoom + delta);
    setZoom(next);
    setPan({ x: constrainPan(pan.x, viewport.current?.clientWidth ?? 0, next), y: constrainPan(pan.y, viewport.current?.clientHeight ?? 0, next) });
  }
  function startPan(event: PointerEvent<HTMLDivElement>) {
    if (zoom <= 1 || (event.target as HTMLElement).closest('button')) return;
    drag.current = { x: event.clientX, y: event.clientY, originalX: pan.x, originalY: pan.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function movePan(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !viewport.current) return;
    setPan({ x: constrainPan(drag.current.originalX + event.clientX - drag.current.x, viewport.current.clientWidth, zoom), y: constrainPan(drag.current.originalY + event.clientY - drag.current.y, viewport.current.clientHeight, zoom) });
  }
  return <div className="explorer" data-reveal>
    <div className="explorer-top"><div className="floor-tabs" role="tablist" aria-label="Choose a floor">{floors.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-controls="floor-panel" aria-selected={item.id === floor.id} tabIndex={item.id === floor.id ? 0 : -1} onClick={() => selectFloor(item)} onKeyDown={(event) => tabKey(event, index)}><span aria-hidden="true">{item.label}</span>{item.name}</button>)}</div><span className="eyebrow plan-demo">Demo plan · not to scale</span></div>
    <div className="explorer-body" role="tabpanel" id="floor-panel" aria-labelledby={`tab-${floor.id}`}>
      <div className="plan-column">
        <div className={`plan-viewport ${zoom > 1 ? 'is-zoomed' : ''}`} ref={viewport} onPointerDown={startPan} onPointerMove={movePan} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
          <div className="plan-drawing" style={{ aspectRatio: `${floor.width}/${floor.height}`, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
            <Image src={floor.plan} width={floor.width} height={floor.height} alt={`${floor.name} schematic. Use the numbered room buttons or the room list below to explore.`} draggable={false} />
            {floor.hotspots.map((spot, index) => {
              const target = floorRooms.find((item) => item.id === spot.roomId);
              if (!target) return null;
              return <button key={spot.roomId} className={`room-hotspot ${roomId === spot.roomId ? 'is-selected' : ''}`} style={{ left: `${spot.x}%`, top: `${spot.y}%` }} aria-label={`Select ${target.name}`} aria-pressed={roomId === spot.roomId} onClick={() => setRoomId(spot.roomId)} onFocus={() => setPan({ x: 0, y: 0 })}><span>{String(index + 1).padStart(2, '0')}</span></button>;
            })}
          </div>
        </div>
        <div className="plan-tools"><span className="plan-hint"><Compass size={16} />N <span className="hint-text">{zoom > 1 ? <><Move size={13} /> Drag to pan</> : 'Select a space to explore'}</span></span><div className="zoom-controls" aria-label="Plan zoom"><button className="icon-button" aria-label="Zoom out" disabled={zoom === 1} onClick={() => adjustZoom(-0.25)}><Minus size={16} /></button><output aria-label="Plan magnification" aria-live="polite">{Math.round(zoom * 100)}%</output><button className="icon-button" aria-label="Zoom in" disabled={zoom === 2} onClick={() => adjustZoom(0.25)}><Plus size={16} /></button><button className="icon-button" aria-label="Reset plan view" onClick={reset}><RotateCcw size={14} /></button></div></div>
        <div className="room-list" aria-label="Rooms on this floor">{floorRooms.map((item, i) => <button key={item.id} aria-pressed={item.id === roomId} onClick={() => setRoomId(item.id)}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{item.name}<ArrowUpRight size={14} aria-hidden="true" /></button>)}</div>
      </div>
      <div className="room-detail">
        <div className="room-render" key={room?.image?.src ?? 'empty'}>{room?.image ? <MediaImage src={room.image.src} alt={room.image.alt} /> : <div className="image-fallback">Render to follow</div>}<span className="image-tag">Illustrative render</span></div>
        <div className="room-copy"><span className="eyebrow">{floor.name} / Selected space</span><h3>{room?.name ?? 'Select a room'}</h3><p>{room?.description ?? floor.description}</p>{room?.areaSqm !== undefined && <p>{room.areaSqm} m²</p>}<span className="sr-only" role="status" aria-live="polite">{room ? `Selected ${room.name} on ${floor.name}` : 'Select a room'}</span></div>
      </div>
    </div>
  </div>;
}
