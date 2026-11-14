import type { ArchitecturalImage, Project } from '@/types/architecture';

const exterior: ArchitecturalImage = {
  id: 'garden', src: '/images/house.webp', category: 'Exterior',
  alt: 'Illustrative limestone courtyard residence with bronze glazing, an olive tree and a reflecting pool at golden hour.',
  caption: 'The garden elevation · illustrative render',
};
const living: ArchitecturalImage = {
  id: 'living', src: '/images/living.webp', category: 'Interior',
  alt: 'Illustrative living space with a linen sofa, travertine table and glazed opening to an olive garden.',
  caption: 'Living with the landscape · illustrative render',
};
const bedroom: ArchitecturalImage = {
  id: 'bedroom', src: '/images/bedroom.webp', category: 'Interior',
  alt: 'Illustrative bedroom with warm oak joinery, a low linen bed and filtered garden light.',
  caption: 'A quieter retreat · illustrative render',
};
const detail: ArchitecturalImage = {
  id: 'detail', src: '/images/detail.webp', category: 'Detail',
  alt: 'Illustrative close view of limestone, oak and a bronze window frame meeting in warm sunlight.',
  caption: 'An honest material language · illustrative render',
};

export const project: Project = {
  name: 'The Courtyard House',
  studio: 'FORM & FIELD',
  subtitle: 'A study in light, stillness, and the spaces in between.',
  demo: true,
  hero: exterior,
  gallery: [living, bedroom, detail, exterior],
  floors: [
    {
      id: 'ground', name: 'Ground floor', label: '01',
      description: 'Shared spaces arranged around an open courtyard.',
      plan: '/plans/ground.svg', width: 800, height: 600,
      hotspots: [{ roomId: 'living', x: 29, y: 40 }, { roomId: 'kitchen', x: 72, y: 34 }, { roomId: 'courtyard', x: 58, y: 72 }],
    },
    {
      id: 'upper', name: 'Upper floor', label: '02',
      description: 'Private rooms with a sheltered view toward the garden.',
      plan: '/plans/upper.svg', width: 800, height: 600,
      hotspots: [{ roomId: 'suite', x: 29, y: 40 }, { roomId: 'guest', x: 72, y: 34 }, { roomId: 'study', x: 72, y: 72 }],
    },
  ],
  rooms: [
    { id: 'living', floorId: 'ground', name: 'Living room', description: 'A generous, light-filled space that opens to the courtyard. Low seating and a quiet material palette let the garden become part of the room.', image: living },
    { id: 'kitchen', floorId: 'ground', name: 'Kitchen & dining', description: 'A gathering place imagined in oak and stone. The open arrangement connects daily rituals with the shared living spaces.', image: detail },
    { id: 'courtyard', floorId: 'ground', name: 'The courtyard', description: 'An open-air room at the heart of the concept. Planting, water and shifting shadows soften the meeting of architecture and landscape.', image: exterior },
    { id: 'suite', floorId: 'upper', name: 'Primary suite', description: 'A sheltered retreat with soft textures and framed garden views. Deep reveals temper the sunlight throughout the day.', image: bedroom },
    { id: 'guest', floorId: 'upper', name: 'Guest room', description: 'A simple, welcoming room shaped around rest, warm materials and a generous connection to natural light.', image: bedroom },
    { id: 'study', floorId: 'upper', name: 'Study', description: 'A quiet place to read and think, overlooking the courtyard. Built-in timber joinery keeps the space calm and uncluttered.', image: detail },
  ],
  // Add the architect's approved email, hosted MP4 and web-ready GLB here.
  // contactEmail: 'hello@your-studio.com',
  // video: { url: 'https://your-cdn.com/walkthrough.mp4', poster: '/images/house.webp' },
  // model: { url: 'https://your-cdn.com/house.glb', poster: '/images/house.webp', description: 'An orbitable model of the residence.' },
};

export const editorial = {
  vision: {
    heading: 'Less noise.\nMore meaning.',
    body: 'A home conceived as a pause. A place where light moves slowly across stone, where inside and outside meet, and where everyday moments find room to unfold.',
    note: 'This illustrative concept explores a simple idea: architecture should bring us closer to the way we want to live.',
    principles: ['Follow the light', 'Frame the landscape', 'Make room for stillness'],
  },
  exterior: {
    heading: 'Grounded in nature.\nOpen to possibility.',
    body: 'Quiet volumes. Deep shadows. A considered relationship between solid and open. The architecture creates a sense of shelter without turning away from its surroundings.',
  },
  interiors: {
    heading: 'Spaces to simply be.',
    body: 'Natural textures, soft light, and a sense of ease. Each space is imagined around the moments that make a house a home.',
  },
  materials: [
    { name: 'Natural limestone', description: 'Grounded. Textural. Timeless.', className: 'limestone' },
    { name: 'Warm oak', description: 'Quiet warmth, honest grain.', className: 'oak' },
    { name: 'Patinated bronze', description: 'A subtle, enduring contrast.', className: 'bronze' },
    { name: 'Lime plaster', description: 'Soft light, gently held.', className: 'plaster' },
  ],
  facts: [
    ['Project type', 'Private residence concept'],
    ['Design approach', 'Courtyard living'],
    ['Material direction', 'Stone · timber · bronze'],
    ['Project status', 'Illustrative demonstration'],
  ],
};
