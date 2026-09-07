# The Chronicle: working story bible

The aim is a world that can sustain a novel, with a website that makes it easy to read that novel and understand the people and places around it. Depth comes from choices with consequences, conflicting institutions, ordinary livelihoods, and histories people disagree about. It does not require a large cast before there is a compelling story. The author welcomes tens of chapters: the present ten numbered chapters and prologue are compressed seeds that may expand into substantial epic arcs, with no chapter-count cap.

The current material already has a strong tragedy: a healer who needs a city's love decides to poison that city, while his brother pursues justice through the institution that dispossessed their family. Treat this as a developed **candidate story spine**. The user has not yet settled the larger primary story.

## How to navigate the workshop

- [Collaboration prompt](PROMPT.md): a ready-to-use brief for the lead and optional specialist agents.
- [Characters](characters/hanno.md): individual profiles for all thirteen named people in the codex. Follow their relationship links.
- [Places](places/carthara.md) and [factions](factions/the-three-seats.md): existing geography and institutions, with explicit questions for development.
- [Visual direction](visual-direction.md): the reference aesthetic translated into world and interface choices.
- [Sound cues](sound-cues.md): an intake ledger for future audio.
- [Pitch template](templates/pitch.md), [character template](templates/character.md), [place template](templates/place.md), and [faction template](templates/faction.md): small formats that preserve both evidence and possibility.
- The website's chapter sequence lives in [`src/content/chapters/index.ts`](../src/content/chapters/index.ts). The codex lives in [`src/content/codex.ts`](../src/content/codex.ts); geographical pins live in [`src/content/world.ts`](../src/content/world.ts). Profiles supplement these files rather than replacing their chapter prose.

## Four evidence labels

**Established in current draft** means explicitly stated in repository narrative or its current supporting canon notes. It is true for this draft, even though the author can revise it. **Interpretation** means a defensible reading that is not itself a recorded event. **Proposed development** means a new idea, not yet adopted. **Open question** means a choice or factual gap we should not conceal with confident prose.

Profiles contain full-story spoilers. Their endpoint is the end of Chapter Ten unless they state otherwise. That is different from what a reader or a character knows in an earlier chapter. Alethea is alive in Chapters Four–Nine and dead at the end of Ten; Dyia does not know the Dust's maker in Chapter Nine. His knowledge on arrival at the final door has not been written.

## Source order and older versions

Latest explicit user decisions govern. The current chapter drafts, codex, character file, and `CLAUDE.md` preserve deliberate changes made after the early documents. When they conflict with one another, record the conflict and make a reasoned repair in the affected task; do not pretend one file resolves every issue automatically.

The [early narrative](https://docs.google.com/document/d/15yBJhMt-ZnlQByomvJn9YZcW9isOCK_kHsO2p0GcQ6E/edit) and [early character questionnaire](https://docs.google.com/document/d/1aZ0V575eBJkAhTxrmRZ2HFDqkOWwtknnz_HMRcgc9ac/edit) were reviewed as source material. The narrative takes priority over the older questionnaire where they conflict. These documents preserve useful discarded possibilities, not mandatory instructions.

The author's latest decision restores **Dyia**, replacing the intervening repository alias Adris. Other current revisions include **Tengeri Wastes, Sidrat Al Muntaha, and Lysandria**, rather than literal Mongolia, Japan, and Macedonia; Amara's death after the cure; and Virello's death through a stolen shipment rather than an earlier direct killing. The Three Seats, Bakhtari ancestry, prologue, and Chapter Ten extend the early narrative. The questionnaire's wish for a fruit cart or simpler agricultural life remains useful *early-source material*, not a new event in the chapters.

Repository copies preserve the [early narrative](sources/early-narrative.md), [questionnaire](sources/early-questionnaire.md), and newly recovered [geography document](sources/early-geography.md). The geography includes Ruhania, the Solunari sanctuary, the Grand Codexium, a more developed Sidrat Al Muntaha, and the fragmented Leonin Khanate. These are author-created source concepts worth recovering; their exact relationship to the current story still needs reconciliation. In particular, its **Chuluun, prince of the Altan Tribe**, conflicts with or substantially extends the current **Leonin elder** role. Do not silently merge those biographies.

## How a pitch becomes part of the story

1. Keep the user's original idea in a pitch note. Record whether it is an exploration or a request to implement; ordinary pitches may remain alternatives without stalling other work.
2. Identify its dramatic purpose, plausible place and era, affected people, required resources, and cost. Link the relevant evidence and flag contradictions.
3. Recommend one fit and, where useful, one substantially different alternative. Explain the tradeoff in story terms. A missing motive needs a scene or changed premise, not a convenient secret.
4. When adopted, update the affected profiles and outline, then chapter/codex/map content as appropriate. State which old premise changed. An idea accepted for exploration is not automatically an established historical event.
5. Check chronology, travel, who knows what, money and supplies, cultural specificity, and the consequences for people outside the lead cast. Report what remains open.

## Near-term development priorities

Start with the family and Carthara. Give Alethea a goal and relationships beyond Hanno; give Amara decisions and work beyond victimhood; show the costs of Dyia's method. Then specify how fields, harbor, and garrison depend on each other. One well-developed dispute over grain, medicine, or testimony will reveal more than ten new noble houses.

Before adding distant wars, choose the book's entry point: chronological family tragedy, an investigation with the past revealed gradually, or a wider ensemble beginning at the cure. Those remain alternatives; none has been silently installed as the final story.

The proposed pilgrimage-ship atrocity belongs first in historical research and the idea ledger. If incorporated, connect trade, protection, survivor testimony, and political consequences. Do not reduce murdered pilgrims to treasure or use the event solely as Hanno's motivation.

## Continuity questions already visible

- Hanno is 115, but the draft remembers the same market vendors from childhood. Establish elapsed years and lifespans for Dyia, the parents, Virello, Numarius, and Alethea before dating the story.
- Chapter One removes Amara's wheel and rooms; Chapter Two stages a fight among household pottery. Establish their subsequent housing and what possessions they retain.
- The text repeatedly calls **Zaharaz** a palindrome. It is not one in its present spelling. Preserve the name until deliberately deciding between changing the claim, explaining a different script, or changing the name.
- The conqueror arrives with fifty thousand, loses many soldiers, then fifty thousand leave. Clarify whether the song exaggerates or revise the literal count. His cause of death already intentionally varies by telling.
- Corvo controls customs, yet Hanno's network leaves no trace. Define her jurisdiction's limits, imperfect records, or a bargain; do not retroactively grant everyone omniscience.
- Distinguish relief from withdrawal, recovery, relapse, and overdose in the fictional Ravash cure. Alethea's knowledgeable self-experiment and subsequent concealment require credible progression, not an assertion that all healers behave that way.
- The codex describes the Three Seats; the map still describes Carthara as ruled by Numarius. Specify his primacy without erasing Corvo and Vael. Carthara's relationship to an unnamed larger empire is unresolved.
