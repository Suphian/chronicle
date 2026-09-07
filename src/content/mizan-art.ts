import { mizanById, type MizanPlace } from "./mizan";

const regions: Record<string, [string, string]> = {
  "region-1": ["lysandria", "Lysandria’s two mountains and harbor"],
  "region-3": ["sidrat", "Sidrat’s sacred lakes and bridges"],
  "region-4": ["tengeri", "Life in the Tengeri canyon camps"],
  "region-5": ["ruhania", "Ruhania’s highland settlements"],
  "region-6": ["tijara", "Tijara, the inland oasis capital of old Cathara"],
  "region-8": ["zorig", "Zorig’s wooded uplands"],
  "region-9": ["hikari", "Hikari’s hillside monasteries"],
};

export function locationArt(selected: string | null, place?: MizanPlace) {
  if (selected && ["carthara", "carthara-harbor", "carthara-garrison", "numarius-fields"].includes(selected)) {
    return { src: "/images/world/carthara-grand-study-v1.webp", alt: "Carthara’s sunlit harbor, terraces, domes and blue sea", caption: "Carthara · city panorama and visual reference" };
  }
  const region = place?.kind === "region" ? place.id : place?.regionId;
  const art = region ? regions[region] : undefined;
  if (art) return { src: `/images/world/mizan-${art[0]}-v1.webp`, alt: art[1], caption: `${art[1]} · regional visual study` };
  if (selected === "moonlit-isle") return { src: "/images/world/mizan-lysandria-v1.webp", alt: "Lysandria’s coastline and mountains", caption: "Nearby Lysandria · regional reference; Moonlit Isle’s own view remains to develop" };
  if (selected === "bakhtar") return { src: "/images/world/mizan-ruhania-v1.webp", alt: "A highland settlement among forested cliffs", caption: "Highland architecture study · a visual starting point for Bakhtar" };
  const biome = place?.terrain.biome ?? 0;
  const key = [5, 6, 7, 8, 9].includes(biome) ? "zorig" : biome === 1 ? "tijara" : "grasslands";
  return { src: `/images/world/mizan-${key}-v1.webp`, alt: key === "zorig" ? "Planted terraces in wooded uplands" : key === "tijara" ? "Sunlit desert oasis architecture" : "An open-country caravan settlement", caption: `${region && mizanById[region] ? mizanById[region].name + " · " : ""}Landscape and architecture reference · this place’s own view remains to develop` };
}
