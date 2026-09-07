import { designedVoices } from "./designed-voices.ts";
import { voiceDesigns, sceneVoiceCues } from "./voice-designs.ts";

/** Performance choices, not additional biography. Manuscript remains in chapters/. */
export interface CastVoice {
  name: string;
  direction: string;
  lang: string;
  pitch: number;
  rate: number;
  elevenLabsVoiceId?: string;
}

export const voiceCast: Record<string, CastVoice> = {
  narrator: { name: "Narrator", direction: "Warm British storyteller; patient, clear, restrained. Let conversations breathe.", lang: "en-GB", pitch: 1, rate: 0.94, elevenLabsVoiceId: "JBFqnCBsd6RMkjVDRZzb" },
  hanno: { name: "Hanno", direction: "Precise and curious, later controlled and persuasive. Pride emerges under pressure; avoid a stock villain's sneer.", lang: "en-GB", pitch: 1.05, rate: 1, elevenLabsVoiceId: "TX3LPaxmHKxFdv7VOQHJ" },
  adil: { name: "Idris", direction: "A fruit merchant proud of the name he built. A welcoming selling voice, firmer when challenged; ambition and affection coexist.", lang: "en-GB", pitch: 0.92, rate: 0.97, elevenLabsVoiceId: "onwK4e9ZLuTAKqWW03F9" },
  amara: { name: "Amara", direction: "Practical, dry warmth, direct questions. A working potter with standards and agency, never merely a frail mother.", lang: "en-GB", pitch: 1.02, rate: 0.95, elevenLabsVoiceId: "pFZP5JQG7iQjIQuC4Bku" },
  dyia: { name: "Dyia", direction: "Direct, impatient with evasion; love and shame beneath growing official authority. Childhood lines remain light.", lang: "en-GB", pitch: 1.08, rate: 1.02, elevenLabsVoiceId: "IKne3meq5aSn9XLyUdCD" },
  virello: { name: "Sinna", direction: "Measured scholarly clarity. A convincing teacher whose patience contracts when ownership or status is threatened.", lang: "en-GB", pitch: 0.9, rate: 0.91, elevenLabsVoiceId: "pqHfZKP75CvOlQylNhV4" },
  alethea: { name: "Alethea", direction: "Attentive and assured; gentle without yielding professional boundaries. Allow humor and disagreement.", lang: "en-GB", pitch: 1.08, rate: 0.97, elevenLabsVoiceId: "EXAVITQu4vr4xnSDxMaL" },
  chuluun: { name: "Chuluun", direction: "An experienced Leonin with limited time and concrete obligations. Grounded, sometimes tired or angry; no growling caricature.", lang: "en-GB", pitch: 0.86, rate: 0.92, elevenLabsVoiceId: "nPczCjzI2devNBz1zQrb" },
  phylios: { name: "Phylios", direction: "Accustomed to command, vulnerable when asking for his son's care.", lang: "en-GB", pitch: 0.9, rate: 0.96, elevenLabsVoiceId: "pNInz6obpgDQGcFmaJgB" },
  numarius: { name: "Numarius", direction: "Social ease and unhurried entitlement. Threats sound ordinary because he expects obedience.", lang: "en-GB", pitch: 0.9, rate: 0.93, elevenLabsVoiceId: "CwhRBWXzGAHq8TQ4Fs17" },
  corvo: { name: "Corvo", direction: "Crisp, commercially precise, alert to practical consequences. Neither omniscient nor theatrically sinister.", lang: "en-GB", pitch: 0.97, rate: 1, elevenLabsVoiceId: "XrExE9yKIg1WjnnlVkGX" },
  vael: { name: "Vael", direction: "Clipped, practical authority; listens for what can actually be done.", lang: "en-GB", pitch: 0.88, rate: 0.98, elevenLabsVoiceId: "cjVigY5qzO86Huf0OWal" },
  rukhsana: { name: "Rukhsana", direction: "Plain, resourceful, willing to correct a king. Community obligations matter more than grandeur.", lang: "en-GB", pitch: 1.05, rate: 0.97, elevenLabsVoiceId: "hpp4J3VqNfWAUOO0d1Us" },
  iskandar: { name: "Iskandar", direction: "Confident young command, easily wounded in public. Authority gradually loses its audience.", lang: "en-GB", pitch: 0.96, rate: 0.99, elevenLabsVoiceId: "SOYHLrjzK2X1ezoPC6cr" },
  woman: { name: "Supporting woman", direction: "Natural conversational delivery for unnamed women; each scene retains its own speaker.", lang: "en-GB", pitch: 1.13, rate: 1, elevenLabsVoiceId: "Xb7hH8MSUJpSbSDYk0k2" },
  man: { name: "Supporting man", direction: "Plain conversational delivery for unnamed men; do not imply they are one recurring character.", lang: "en-GB", pitch: 1, rate: 1, elevenLabsVoiceId: "iP95p4xoKVk53GoZ742B" },
  child: { name: "Young supporting speaker", direction: "Young, natural delivery for the messenger, junior guard, and apprentice; let urgency or hesitation follow the scene without comic exaggeration.", lang: "en-GB", pitch: 1.2, rate: 1.03, elevenLabsVoiceId: "bIHbv24MWmeRgasZH58o" },
  guard: { name: "Guard / sergeant", direction: "Practical official delivery; individual orders and doubts, not a constant shout.", lang: "en-GB", pitch: 0.91, rate: 1, elevenLabsVoiceId: "iP95p4xoKVk53GoZ742B" },
  clerk: { name: "Clerk / collector", direction: "Matter-of-fact administrative certainty. No elaborate villain performance.", lang: "en-GB", pitch: 0.98, rate: 0.96, elevenLabsVoiceId: "SAz9YHcvj6GT2YYXdXww" },
  broker: { name: "Broker", direction: "A clear negotiator conscious of risk and the limits of promises.", lang: "en-GB", pitch: 0.96, rate: 1, elevenLabsVoiceId: "N2lVS1w4EtoT3dr4eOWO" },
};

// Saved character designs supersede stock auditions while preserving stable story IDs.
for (const [speaker, saved] of Object.entries(designedVoices)) {
  if (voiceCast[speaker]) voiceCast[speaker].elevenLabsVoiceId = saved.voiceId;
}

export function dialogueCue(chapterSlug: string, sceneId: string, speaker: string): string {
  const cue = sceneVoiceCues[`${chapterSlug}/${sceneId}`]?.[speaker] ?? voiceDesigns[speaker]?.cue;
  return cue ? `[${cue}] ` : "";
}

/** One cast ID per quoted span, in scene order; narration between quotes is preserved. */
export const dialogueSpeakers: Record<string, string[]> = Object.fromEntries(Object.entries({
  "the-conqueror/the-graveyard-of-empires": "woman rukhsana",
  "the-conqueror/the-flutes": "rukhsana guard rukhsana",
  "the-conqueror/iskandar": "rukhsana",
  "the-conqueror/rukhsana": "rukhsana iskandar rukhsana rukhsana rukhsana woman",
  "the-conqueror/the-mutiny": "iskandar",
  "market-awnings/the-fruit-stall": "adil adil woman adil hanno adil hanno adil adil hanno hanno adil adil hanno adil adil adil hanno adil adil adil dyia hanno",
  "market-awnings/above-the-pottery-shop": "amara amara dyia amara dyia amara amara hanno amara amara dyia amara amara hanno amara amara amara adil amara adil amara amara adil amara adil amara adil amara amara adil adil amara amara amara adil",
  "market-awnings/the-drought": "adil clerk adil adil clerk adil",
  "market-awnings/the-fields": "clerk clerk adil clerk adil adil amara",
  "market-awnings/the-apothecary": "amara virello hanno amara virello virello amara virello amara amara hanno amara virello virello virello",
  "market-awnings/ravash": "dyia hanno dyia dyia hanno dyia hanno dyia amara dyia dyia dyia hanno dyia hanno dyia hanno dyia dyia amara",
  "market-awnings/the-door": "guard guard dyia guard dyia guard man man man man amara amara",
  "market-awnings/the-sentencing": "amara clerk amara adil",
  "bitter-apprenticeship/a-world-unto-itself": "virello virello virello virello virello hanno virello virello virello virello virello",
  "bitter-apprenticeship/respect-every-ingredient": "virello hanno hanno virello virello virello virello virello",
  "bitter-apprenticeship/the-alleys": "amara man amara man dyia amara dyia amara",
  "bitter-apprenticeship/something-breaking": "hanno dyia dyia hanno dyia dyia hanno dyia hanno hanno amara hanno hanno amara hanno amara amara",
  "bitter-apprenticeship/go-then": "dyia hanno dyia hanno amara dyia amara dyia hanno dyia dyia",
  "journeys/sent-away": "virello hanno virello hanno amara amara amara",
  "journeys/tengeri-wastes": "chuluun chuluun chuluun woman woman chuluun man man woman woman chuluun chuluun chuluun chuluun",
  "journeys/lake-siraj": "hanno woman woman man man",
  "journeys/toward-lysandria": "man",
  "journeys/nightly-patrols": "dyia man dyia child dyia",
  "gift-of-lysandria/ancient-guardians": "phylios",
  "gift-of-lysandria/the-spear": "phylios phylios phylios",
  "gift-of-lysandria/alethea": "alethea alethea alethea alethea",
  "gift-of-lysandria/the-elysian-flower": "alethea hanno alethea",
  "gift-of-lysandria/hand-in-hand": "alethea hanno alethea hanno alethea",
  "the-cure/return": "alethea virello hanno virello virello hanno hanno alethea amara hanno amara",
  "the-cure/a-city-in-despair": "alethea amara amara amara hanno amara",
  "the-cure/trials": "alethea alethea amara amara",
  "the-cure/the-savior-of-carthara": "man",
  "the-cure/seeds-of-conflict": "numarius numarius",
  "shadows-and-accusations/false-kindness": "virello virello amara virello virello virello amara virello amara virello",
  "shadows-and-accusations/amara": "child alethea hanno alethea hanno alethea alethea",
  "shadows-and-accusations/whispers": "hanno hanno dyia hanno dyia child hanno virello",
  "shadows-and-accusations/the-shipment": "alethea hanno",
  "shadows-and-accusations/a-public-demise": "numarius numarius",
  "rising-influence/the-heart-of-carthara": "man man hanno man",
  "rising-influence/the-clinic-ledger": "alethea alethea hanno alethea hanno alethea hanno alethea",
  "rising-influence/courtesies": "numarius vael corvo hanno numarius",
  "rising-influence/patient-vigilance": "dyia woman dyia woman dyia hanno hanno hanno hanno",
  "a-dark-turn/hollow": "alethea hanno hanno alethea hanno alethea alethea",
  "a-dark-turn/fertilizer": "numarius hanno numarius numarius numarius hanno numarius numarius numarius numarius hanno numarius",
  "a-dark-turn/witnesses": "hanno",
  "a-dark-turn/a-network-of-shadows": "broker broker broker broker",
  "shadows-closing-in/beneath-the-veneer": "dyia man man man",
  "shadows-closing-in/dead-ends": "guard dyia guard",
  "shadows-closing-in/numarius-stirs": "numarius dyia numarius dyia corvo corvo corvo vael",
  "shadows-closing-in/closer-than-he-imagines": "broker hanno broker hanno broker hanno",
  "shadows-closing-in/alethea-watches": "alethea dyia alethea dyia alethea",
  "shadows-closing-in/reckoning": "dyia",
  "the-flower-in-her-hair/a-stranger-at-the-table": "alethea hanno alethea hanno alethea alethea alethea hanno",
  "the-flower-in-her-hair/he-does-not-see": "alethea alethea alethea alethea",
  "the-flower-in-her-hair/the-mirror": "hanno woman",
}).map(([key, speakers]) => [key, speakers.split(" ")]));

/** Reviewed against whole scene prose; edits require a fresh attribution review. */
export const dialogueRevisions: Record<string, string> = {
  "the-conqueror/the-graveyard-of-empires": "beffbdf3",
  "the-conqueror/the-flutes": "68624b71",
  "the-conqueror/iskandar": "acced6e6",
  "the-conqueror/rukhsana": "5b64b489",
  "the-conqueror/the-mutiny": "f485d9ad",
  "market-awnings/the-fruit-stall": "a070a5a2",
  "market-awnings/above-the-pottery-shop": "f961d4cc",
  "market-awnings/the-drought": "4b97a071",
  "market-awnings/the-fields": "dff929fa",
  "market-awnings/the-apothecary": "5eef0ffd",
  "market-awnings/ravash": "dd23f1d3",
  "market-awnings/the-door": "7aa68f6f",
  "market-awnings/the-sentencing": "ca553264",
  "bitter-apprenticeship/a-world-unto-itself": "05b8ed10",
  "bitter-apprenticeship/respect-every-ingredient": "44721508",
  "bitter-apprenticeship/the-alleys": "eb7f24e2",
  "bitter-apprenticeship/something-breaking": "527b5bf4",
  "bitter-apprenticeship/go-then": "820bc826",
  "journeys/sent-away": "e19a61a0",
  "journeys/tengeri-wastes": "d5de44eb",
  "journeys/lake-siraj": "cf1bfd72",
  "journeys/toward-lysandria": "986de318",
  "journeys/nightly-patrols": "8dc5e3e4",
  "gift-of-lysandria/ancient-guardians": "46e7b8b5",
  "gift-of-lysandria/the-spear": "8b04b210",
  "gift-of-lysandria/alethea": "170bb560",
  "gift-of-lysandria/the-elysian-flower": "26d7349d",
  "gift-of-lysandria/hand-in-hand": "1cb54467",
  "the-cure/return": "3e496635",
  "the-cure/a-city-in-despair": "70f1d1c7",
  "the-cure/trials": "7938aee0",
  "the-cure/the-savior-of-carthara": "0bc6d913",
  "the-cure/seeds-of-conflict": "0f765c7f",
  "shadows-and-accusations/false-kindness": "c66a2e32",
  "shadows-and-accusations/amara": "aa444512",
  "shadows-and-accusations/whispers": "7d8765cc",
  "shadows-and-accusations/the-shipment": "9ed7b5d9",
  "shadows-and-accusations/a-public-demise": "d673a637",
  "rising-influence/the-heart-of-carthara": "713e9501",
  "rising-influence/the-clinic-ledger": "06058ae3",
  "rising-influence/courtesies": "279dff07",
  "rising-influence/patient-vigilance": "01ea2a08",
  "a-dark-turn/hollow": "5a5151d4",
  "a-dark-turn/fertilizer": "9c50abc5",
  "a-dark-turn/witnesses": "1901e098",
  "a-dark-turn/a-network-of-shadows": "22bb1214",
  "shadows-closing-in/beneath-the-veneer": "1c177000",
  "shadows-closing-in/dead-ends": "83806c25",
  "shadows-closing-in/numarius-stirs": "9afd57a1",
  "shadows-closing-in/closer-than-he-imagines": "25d680dc",
  "shadows-closing-in/alethea-watches": "f6eb7002",
  "shadows-closing-in/reckoning": "3f6743c9",
  "the-flower-in-her-hair/a-stranger-at-the-table": "8527ea7a",
  "the-flower-in-her-hair/he-does-not-see": "5e47eb6b",
  "the-flower-in-her-hair/the-mirror": "dda9e74d"
};
