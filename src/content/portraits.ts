import { character } from "./character.ts";

export interface CharacterPortrait {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Stable profile IDs; adopted representation with individually interpreted faces and clothing. */
export const characterPortraits: Record<string, CharacterPortrait> = {
  ...(character.portrait ? { hanno: { src: character.portrait, alt: "Ink and watercolor portrait of Hanno, a Black half-elf with tied curls and subtly pointed ears, holding an amber vial in his apothecary.", width: 1024, height: 1536 } } : {}),
  dyia: { src: "/images/portraits/dyia-v2.webp", alt: "Ink and watercolor portrait of Dyia, a Black guard captain with short natural curls, in practical teal clothing beside case papers.", width: 1024, height: 1536 },
  adil: { src: "/images/portraits/adil-v2.webp", alt: "Ink and watercolor portrait of Idris, a mature Black fruit seller with salt-and-pepper curls and beard, at his stall with a basket and brass balance.", width: 1024, height: 1536 },
  amara: { src: "/images/portraits/amara.webp", alt: "Ink and watercolor portrait of Amara inspecting a handmade bowl at her pottery bench.", width: 1024, height: 1536 },
  alethea: { src: "/images/portraits/alethea-v2.webp", alt: "Ink and watercolor portrait of Alethea, a Black physician with gathered natural curls, attending to a patient beside her carrying case and notebook.", width: 1024, height: 1536 },
  virello: { src: "/images/portraits/virello.webp", alt: "Ink and watercolor portrait of Sinna studying a compendium beside apothecary jars and a balance.", width: 1024, height: 1536 },
  numarius: { src: "/images/portraits/numarius.webp", alt: "Ink and watercolor portrait of Numarius in embroidered civic robes beside a grain measure.", width: 1024, height: 1536 },
  corvo: { src: "/images/portraits/corvo-v2.webp", alt: "Ink and watercolor portrait of Corvo, a mature Black magistrate with gray-streaked braids, beside a customs register and harbor window.", width: 1024, height: 1536 },
  vael: { src: "/images/portraits/vael.webp", alt: "Ink and watercolor portrait of Vael in restrained military dress beside a closed muster ledger.", width: 1024, height: 1536 },
  phylios: { src: "/images/portraits/phylios.webp", alt: "Ink and watercolor portrait of gray-eyed Phylios in his study, with Lysandria’s two mountains beyond.", width: 1024, height: 1536 },
  chuluun: { src: "/images/portraits/chuluun.webp", alt: "Ink and watercolor portrait of Chuluun, a graying Leonin elder with a record notebook inside a repaired camp shelter.", width: 1024, height: 1536 },
  iskandar: { src: "/images/portraits/iskandar.webp", alt: "Ink and watercolor portrait of young adult Iskandar in plain highland wool beside a stone passage.", width: 1024, height: 1536 },
  rukhsana: { src: "/images/portraits/rukhsana.webp", alt: "Ink and watercolor portrait of Rukhsana, with subtly pointed ears and a wooden flute in a highland shelter.", width: 1024, height: 1536 },
};
