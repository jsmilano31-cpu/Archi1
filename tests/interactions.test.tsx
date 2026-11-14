import './setup-dom';
import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { FloorExplorer } from '../src/components/FloorExplorer';
import { Gallery } from '../src/components/Gallery';
import { project } from '../src/data/project';

afterEach(cleanup);

test('room list and marker select the matching details, then floor change clears the old selection', () => {
  const view = render(<FloorExplorer floors={project.floors} rooms={project.rooms} />);
  assert.ok(view.getByRole('heading', { name: 'Living room' }));
  fireEvent.click(view.getByRole('button', { name: 'Kitchen & dining' }));
  assert.ok(view.getByRole('heading', { name: 'Kitchen & dining' }));
  assert.equal(view.getByRole('button', { name: 'Select Kitchen & dining' }).getAttribute('aria-pressed'), 'true');
  fireEvent.click(view.getByRole('button', { name: 'Select The courtyard' }));
  assert.ok(view.getByRole('heading', { name: 'The courtyard' }));
  fireEvent.click(view.getByRole('tab', { name: /Upper floor/ }));
  assert.ok(view.getByRole('heading', { name: 'Primary suite' }));
  assert.equal(view.queryByRole('button', { name: 'Select The courtyard' }), null);
});

test('floor tabs support arrow keys and zoom resets on floor change', () => {
  const view = render(<FloorExplorer floors={project.floors} rooms={project.rooms} />);
  fireEvent.click(view.getByRole('button', { name: 'Zoom in' }));
  assert.ok(view.getByText('Selected Living room on Ground floor'));
  assert.equal(view.getByText('125%').textContent, '125%');
  fireEvent.keyDown(view.getByRole('tab', { name: /Ground floor/ }), { key: 'ArrowRight' });
  const upper = view.getByRole('tab', { name: /Upper floor/ });
  assert.equal(upper.getAttribute('aria-selected'), 'true');
  assert.equal(document.activeElement, upper);
  assert.ok(view.getByText('100%'));
  assert.equal((view.getByRole('button', { name: 'Zoom out' }) as HTMLButtonElement).disabled, true);
});

test('missing render and empty floor data have purposeful fallbacks', () => {
  const rooms = structuredClone(project.rooms);
  delete rooms[0].image;
  const view = render(<FloorExplorer floors={project.floors} rooms={rooms} />);
  assert.ok(view.getByText('Render to follow'));
  view.rerender(<FloorExplorer floors={[]} rooms={[]} />);
  assert.ok(view.getByText('Floor drawings will be added here.'));
});

test('gallery filtering, lightbox next/previous and close update state', () => {
  const view = render(<Gallery items={project.gallery} />);
  fireEvent.click(view.getByRole('button', { name: 'Interior' }));
  assert.equal(view.getAllByRole('button', { name: /^Enlarge:/ }).length, 2);
  const open = view.getAllByRole('button', { name: /^Enlarge:/ })[0];
  fireEvent.click(open);
  const dialog = view.getByRole('dialog');
  assert.equal(dialog.hasAttribute('open'), true);
  assert.ok(view.getByText('1 / 2'));
  fireEvent.keyDown(dialog, { key: 'ArrowRight' });
  assert.ok(view.getByText('2 / 2'));
  fireEvent.click(view.getByRole('button', { name: 'Previous image' }));
  assert.ok(view.getByText('1 / 2'));
  fireEvent.click(view.getByRole('button', { name: 'Close gallery' }));
  assert.equal(dialog.hasAttribute('open'), false);
  assert.equal(document.activeElement, open);
});

test('one-image gallery hides inactive navigation controls', () => {
  const view = render(<Gallery items={[project.gallery[0]]} />);
  fireEvent.click(view.getByRole('button', { name: /^Enlarge:/ }));
  assert.equal(view.queryByRole('button', { name: 'Next image' }), null);
  assert.equal(view.queryByRole('button', { name: 'Previous image' }), null);
});
