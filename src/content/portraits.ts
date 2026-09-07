import { character } from "./character.ts";

export interface CharacterPortrait {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Stable profile IDs; new appearances are visual interpretations, not prose canon. */
export const characterPortraits: Record<string, CharacterPortrait> = {
  ...(character.portrait ? { hanno: { src: character.portrait, alt: "Portrait of Hanno in his apothecary, wearing charcoal robes and holding a small amber vial.", width: 1024, height: 1536 } } : {}),
  dyia: { src: "/images/portraits/dyia.webp", alt: "Ink and watercolor portrait of Dyia in practical guard clothing beside case papers.", width: 1024, height: 1536 },
  adil: { src: "/images/portraits/adil.webp", alt: "Ink and watercolor portrait of Idris at his fruit stall with a basket and brass balance.", width: 1024, height: 1536 },
  amara: { src: "/images/portraits/amara.webp", alt: "Ink and watercolor portrait of Amara inspecting a handmade bowl at her pottery bench.", width: 1024, height: 1536 },
  alethea: { src: "/images/portraits/alethea.webp", alt: "Ink and watercolor portrait of Alethea in a treatment room with a carrying case and notebook.", width: 1024, height: 1536 },
  virello: { src: "/images/portraits/virello.webp", alt: "Ink and watercolor portrait of Sinna studying a compendium beside apothecary jars and a balance.", width: 1024, height: 1536 },
  numarius: { src: "/images/portraits/numarius.webp", alt: "Ink and watercolor portrait of Numarius in embroidered civic robes beside a grain measure.", width: 1024, height: 1536 },
  corvo: { src: "/images/portraits/corvo.webp", alt: "Ink and watercolor portrait of Corvo beside a customs register, with ship masts beyond her window.", width: 1024, height: 1536 },
  vael: { src: "/images/portraits/vael.webp", alt: "Ink and watercolor portrait of Vael in restrained military dress beside a closed muster ledger.", width: 1024, height: 1536 },
  phylios: { src: "/images/portraits/phylios.webp", alt: "Ink and watercolor portrait of gray-eyed Phylios in his study, with Lysandria’s two mountains beyond.", width: 1024, height: 1536 },
  chuluun: { src: "/images/portraits/chuluun.webp", alt: "Ink and watercolor portrait of Chuluun, a graying Leonin elder with a record notebook inside a repaired camp shelter.", width: 1024, height: 1536 },
  iskandar: { src: "/images/portraits/iskandar.webp", alt: "Ink and watercolor portrait of young adult Iskandar in plain highland wool beside a stone passage.", width: 1024, height: 1536 },
  rukhsana: { src: "/images/portraits/rukhsana.webp", alt: "Ink and watercolor portrait of Rukhsana, with subtly pointed ears and a wooden flute in a highland shelter.", width: 1024, height: 1536 },
};
