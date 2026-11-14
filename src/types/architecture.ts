export type ArchitecturalImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'Exterior' | 'Interior' | 'Detail';
  position?: string;
};

export type Room = {
  id: string;
  floorId: string;
  name: string;
  description: string;
  image?: ArchitecturalImage;
  areaSqm?: number;
};

export type Hotspot = { roomId: string; x: number; y: number };

export type Floor = {
  id: string;
  name: string;
  label: string;
  description: string;
  plan: string;
  width: number;
  height: number;
  hotspots: Hotspot[];
};

export type VideoMedia = {
  url: string;
  poster: string;
  captionsUrl?: string;
  transcript?: string;
};

export type ModelMedia = {
  url: string;
  poster: string;
  description: string;
};

export type Project = {
  name: string;
  studio: string;
  subtitle: string;
  demo: boolean;
  hero: ArchitecturalImage;
  gallery: ArchitecturalImage[];
  floors: Floor[];
  rooms: Room[];
  video?: VideoMedia;
  model?: ModelMedia;
  contactEmail?: string;
};
