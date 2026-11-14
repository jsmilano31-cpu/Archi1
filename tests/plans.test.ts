import assert from 'node:assert/strict';
import test from 'node:test';
import { project } from '../src/data/project';
import { constrainPan, constrainZoom, roomsForFloor, validateProjectPlans } from '../src/lib/plan';

test('demo has two internally consistent floors and three rooms per floor', () => {
  assert.deepEqual(validateProjectPlans(project.floors, project.rooms), []);
  assert.equal(project.floors.length, 2);
  for (const floor of project.floors) assert.equal(roomsForFloor(floor, project.rooms).length, 3);
});

test('switching floors returns only rooms on the destination floor', () => {
  const ground = roomsForFloor(project.floors[0], project.rooms);
  const upper = roomsForFloor(project.floors[1], project.rooms);
  assert.equal(ground[0].id, 'living');
  assert.equal(upper[0].id, 'suite');
  assert.ok(upper.every((room) => !ground.some((other) => other.id === room.id)));
});

test('invalid hotspots, duplicate IDs and cross-floor references are rejected', () => {
  const floors = structuredClone(project.floors);
  floors[0].hotspots[0].x = 101;
  floors[0].hotspots[1].roomId = 'suite';
  assert.ok(validateProjectPlans(floors, project.rooms).some((message) => message.includes('Invalid position')));
  assert.ok(validateProjectPlans(floors, project.rooms).some((message) => message.includes('Invalid room reference')));
  assert.ok(validateProjectPlans([...floors, floors[0]], project.rooms).includes('Duplicate floor ID'));
  assert.ok(validateProjectPlans(floors, [...project.rooms, project.rooms[0]]).includes('Duplicate room ID'));
});

test('zoom and pan stay inside plan bounds, including after zooming out', () => {
  assert.equal(constrainZoom(0.5), 1);
  assert.equal(constrainZoom(3), 2);
  assert.equal(constrainPan(1000, 400, 2), 200);
  assert.equal(constrainPan(-1000, 400, 1.5), -100);
  assert.equal(constrainPan(60, 400, 1), 0);
});

test('rooms without render images or measurements remain valid', () => {
  const rooms = structuredClone(project.rooms);
  delete rooms[0].image;
  delete rooms[0].areaSqm;
  assert.deepEqual(validateProjectPlans(project.floors, rooms), []);
});
