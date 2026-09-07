/** Casting interpretations of the profiles, not new ages, origins, or story events.
 * Descriptions are sent to ElevenLabs Voice Design; cues guide v3 dialogue delivery.
 * British English is an audiobook performance choice, not fictional geography.
 */
export interface VoiceDesign {
  profile: string;
  description: string;
  cue: string;
}

const recording = " Natural British English in an intimate ensemble audiobook. Clean studio sound, no music. An original fictional voice.";
export const voiceDesigns: Record<string, VoiceDesign> = {
  adil: {
    profile: "adil",
    description: "A mature male fruit merchant with a warm, rounded baritone, lightly weathered grain and an audible smile. Conversational, supple rhythm; he knows his customers and enjoys a fair bargain. Pride earned by years of work gives his words weight. At home he is affectionate, stubborn and persuasive; when challenged he becomes firm without losing dignity. Clearly distinct from a polished narrator or an aristocratic broadcaster." + recording,
    cue: "warmly",
  },
  hanno: {
    profile: "hanno",
    description: "An adult male alchemist with a clear, lean tenor, precise consonants and quiet intensity. Curious questions land lightly; explanations are carefully paced and persuasive. A thoughtful working scholar who wants to be useful and admired. Pride makes his voice tighter and more deliberate under pressure. He can be tender with family. Understatement and calculation, never a growling warrior or a sneering villain." + recording,
    cue: "thoughtfully",
  },
  amara: {
    profile: "amara",
    description: "A mature female potter with an earthy contralto, textured warmth and direct, economical phrasing. Dry humor and an assured downward cadence. She is used to assessing work and asking practical questions; affection does not soften her standards. Her voice has substance and ordinary vitality, with room for frustration, pride and private tenderness. Not perpetually frail or sorrowful." + recording,
    cue: "matter-of-fact",
  },
  dyia: {
    profile: "dyia",
    description: "A younger adult man with a bright, forward baritone and quick, blunt phrasing. More impulsive and less polished than his scholarly brother. Clear direct questions; a guard captain learning to keep his urgency under control. Shame and love can catch at the ends of sentences in family conversations. Authority comes from conviction, not booming volume. Natural breathing and emotional range." + recording,
    cue: "directly",
  },
  virello: {
    profile: "virello",
    description: "An older male physician and scholar with a dry, fine-grained low tenor, meticulous diction and a measured teaching cadence. Genuine intellectual curiosity and credible patience. He carefully distinguishes observations before reaching a conclusion. When his ownership or status is challenged his rhythm tightens and warmth recedes. A persuasive human teacher, not a sinister whisper or a cartoon villain." + recording,
    cue: "measured",
  },
  alethea: {
    profile: "alethea",
    description: "An adult female healer with a clear, centered mezzo voice, gentle resonance and assured articulation. Attentive conversational pauses that leave space for an answer. Warmth, wit and firm professional boundaries; disagreement is calm but unmistakable. A working clinician with energy and independent judgment. Intimacy can soften the voice without making it breathy, submissive or ethereal." + recording,
    cue: "gently",
  },
  chuluun: {
    profile: "chuluun",
    description: "An older male teacher and resistance leader with a deep, weathered bass-baritone, dry grain and unhurried clarity. He conserves breath after physical work but can cut through a dispute with a short firm sentence. A patient instructor who listens, corrects and can admit an error. Affection, fatigue and anger belong to one living person. Grounded human intelligibility for a fictional Leonin; no animal growling, mystical chant or imitation of a historical person." + recording,
    cue: "patiently",
  },
  phylios: {
    profile: "phylios",
    description: "A mature male ruler with a full, steady baritone, open resonance and deliberate phrasing. Stern but fair, accustomed to being heard without raising his voice. Self-command creates a controlled pace. When asking for care for his son, allow a vulnerable softness and slight uncertainty beneath his public bearing. Plain sincere gratitude, no constant martial aggression." + recording,
    cue: "solemnly",
  },
  numarius: {
    profile: "numarius",
    description: "A mature male aristocrat with a plush low baritone, smooth vowels and leisurely social ease. He expects the room to wait for him. Patronage and threats arrive in the same pleasant conversational register; precise emphasis reveals entitlement. His public charm is credible, his cruelty casually ordinary. Keep him distinct from the merchant's textured warmth and the general's clipped orders." + recording,
    cue: "smoothly",
  },
  corvo: {
    profile: "corvo",
    description: "An adult female magistrate with a cool, polished alto, crisp consonants and brisk, exact phrasing. Commercially alert; numbers and conditions receive clean emphasis. Composure with a dry edge of humor, always listening for practical consequences. She can be courteous without warmth. Neither breathy seduction nor theatrical menace; the authority of someone accustomed to negotiating terms." + recording,
    cue: "precisely",
  },
  vael: {
    profile: "vael",
    description: "A mature male garrison commander with a compact, iron-edged low baritone, clipped consonants and short decisive phrases. Pragmatic institutional authority. He tests what can actually be done, with brief listening pauses and restrained volume. A dry, unsentimental timbre distinctly different from a wealthy patron's smooth drawl. No endless shouting or invented battle trauma." + recording,
    cue: "firmly",
  },
  rukhsana: {
    profile: "rukhsana",
    description: "An adult female flute-player with a bright, clear mezzo, agile musical phrasing and a grounded speaking register. Plain confidence and observant wit; she can correct a king without ceremonial deference. The voice is resourceful, direct and alive to other people, with easy breath and an unforced rhythm. Not an oracle, an ethereal elf stereotype or a romantic whisper." + recording,
    cue: "confidently",
  },
  iskandar: {
    profile: "iskandar",
    description: "A young adult male king with a ringing tenor, forward placement and a restless, commanding rhythm. Public confidence comes quickly, wounded pride shows in sharper emphasis when contradicted. Leave room for uncertainty when his listeners turn away. Youthful and forceful without permanent shouting, deep monster resonance or a comic warrior performance." + recording,
    cue: "assertively",
  },
};

/** Scene-specific performance choices supersede the usual delivery, not the voice identity. */
export const sceneVoiceCues: Record<string, Record<string, string>> = {
  "market-awnings/the-fruit-stall": { hanno: "curiously", dyia: "playfully" },
  "market-awnings/above-the-pottery-shop": { adil: "persuasively", hanno: "curiously", dyia: "playfully" },
  "market-awnings/the-drought": { adil: "insisting" },
  "market-awnings/the-fields": { adil: "strained" },
  "market-awnings/the-sentencing": { adil: "firmly" },
  "market-awnings/the-door": { dyia: "hesitantly" },
  "gift-of-lysandria/ancient-guardians": { phylios: "worried" },
  "shadows-and-accusations/false-kindness": { virello: "reassuringly" },
  "shadows-and-accusations/amara": { alethea: "seriously", hanno: "shaken" },
  "a-dark-turn/fertilizer": { numarius: "casually", hanno: "restrained" },
  "the-flower-in-her-hair/a-stranger-at-the-table": { alethea: "seriously", hanno: "distantly" },
};
