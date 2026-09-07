import pictures from "./mizan-pictures.json";

interface MapPicture {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** Explicit assignments: a point never borrows another point's picture. */
export const mapPictures: Record<string, MapPicture> = pictures;

export function locationArt(selected: string | null): MapPicture | undefined {
  return selected ? mapPictures[selected] : undefined;
}
