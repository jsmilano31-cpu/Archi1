import type { Floor, Room } from '@/types/architecture';

export function roomsForFloor(floor: Floor, rooms: Room[]) {
  return rooms.filter((room) => room.floorId === floor.id);
}

export function constrainZoom(value: number) {
  return Math.min(2, Math.max(1, value));
}

export function constrainPan(value: number, extent: number, zoom: number) {
  const limit = Math.max(0, (extent * (zoom - 1)) / 2);
  return Math.min(limit, Math.max(-limit, value));
}

export function validateProjectPlans(floors: Floor[], rooms: Room[]) {
  const errors: string[] = [];
  if (new Set(floors.map((floor) => floor.id)).size !== floors.length) errors.push('Duplicate floor ID');
  if (new Set(rooms.map((room) => room.id)).size !== rooms.length) errors.push('Duplicate room ID');
  for (const room of rooms) {
    if (!floors.some((floor) => floor.id === room.floorId)) errors.push(`Unknown floor for ${room.id}`);
  }
  for (const floor of floors) {
    if (floor.width <= 0 || floor.height <= 0) errors.push(`Invalid plan dimensions for ${floor.id}`);
    for (const spot of floor.hotspots) {
      if (![spot.x, spot.y].every((v) => Number.isFinite(v) && v >= 0 && v <= 100)) errors.push(`Invalid position for ${spot.roomId}`);
      if (!rooms.some((room) => room.id === spot.roomId && room.floorId === floor.id)) errors.push(`Invalid room reference ${spot.roomId}`);
    }
  }
  return errors;
}
