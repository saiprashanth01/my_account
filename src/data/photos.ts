import { featuredWorkImages } from '../assets/featuredWorkImages';

export interface Photo {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Creative titles for the images
const creativeTitles = [
  "Whispers of Light",
  "Eternal Moment",
  "Silent Symphony",
  "Dancing Shadows",
  "Golden Hour",
  "Urban Poetry",
  "Nature's Canvas",
  "Timeless Beauty",
  "Frozen Motion",
  "Dreamscape",
  "Urban Rhythm",
  "Serene Reflections",
  "Mystical Journey",
  "Harmony in Chaos",
  "Ephemeral Beauty",
  "Urban Tales",
  "Nature's Whisper",
  "Light and Shadow",
  "Timeless Elegance",
  "Urban Dreams",
  "Serene Moments",
  "Mystical Light",
  "Harmonious Chaos",
  "Ephemeral Grace",
  "Urban Poetry",
  "Nature's Symphony",
  "Light Play",
  "Timeless Charm",
  "Urban Stories",
  "Serene Beauty",
  "Mystical Journey",
  "Harmonious Flow",
  "Ephemeral Magic",
  "Urban Canvas",
  "Nature's Palette",
  "Light Dance",
  "Timeless Grace",
  "Urban Rhythm",
  "Serene Harmony",
  "Mystical Light",
  "Harmonious Balance",
  "Ephemeral Beauty",
  "Urban Tales",
  "Nature's Whisper",
  "Light and Shadow",
  "Timeless Elegance",
  "Urban Dreams",
  "Serene Moments",
  "Mystical Journey",
  "Harmonious Chaos",
  "Ephemeral Grace",
  "Urban Poetry",
  "Nature's Symphony",
  "Light Play",
  "Timeless Charm",
  "Urban Stories",
  "Serene Beauty",
  "Mystical Journey",
  "Harmonious Flow",
  "Ephemeral Magic",
  "Urban Canvas",
  "Nature's Palette",
  "Light Dance",
  "Timeless Grace",
  "Urban Rhythm",
  "Serene Harmony"
];

export const photos: Photo[] = featuredWorkImages.map((image, index) => ({
  id: (index + 1).toString(),
  title: creativeTitles[index],
  description: 'A stunning capture from our featured collection',
  image: image
})); 