# The Chronicle: working story bible

The aim is a world that can sustain a novel, with a website that makes it easy to read that novel and understand the people and places around it. Depth comes from choices with consequences, conflicting institutions, ordinary livelihoods, and histories people disagree about. The ten numbered units now have a first prose pass, alongside an optional highland legend. They remain expandable material, with no chapter-count cap and a further structural revision ahead.

The current material already has a strong tragedy: a healer who needs a city's love decides to poison that city, while his brother pursues justice through the institution that dispossessed their family. Treat this as a developed **candidate story spine**. The user has not yet settled the larger primary story.

## How to navigate the workshop

- **Story** (`/story`): read the current narrative from Hanno's family onward, with book plates, text sizing, and saved reading place. Cinematic mode and chapter music have been removed at the author's request.
- **People** (`/people`): searchable character directory and individual Markdown dossiers. Profiles contain full-story spoilers.
- **World** (`/world`): atlas, place directory, history, institutions, and everyday life.
- **Writing room** (`/workshop`): the [overall story outline](story/overall-outline.md), [writing direction](story/writing-direction.md), architecture, chapter and scene plans, proposals, reviews, and original materials.

- [Collaboration prompt](PROMPT.md): a ready-to-use brief for the lead and optional specialist agents.
- [Characters](characters/hanno.md): individual profiles for all thirteen named people in the codex. Follow their relationship links.
- [Places](places/carthara.md) and [factions](factions/the-three-seats.md): existing geography and institutions, with explicit questions for development.
- [Visual direction](visual-direction.md): the reference aesthetic translated into world and interface choices.
- [Sound cues](sound-cues.md): an intake ledger for future audio.
- [Narration](narration.md): optional chapter playback, character casting, and the ElevenLabs opening sample.
- [Pitch template](templates/pitch.md), [character template](templates/character.md), [place template](templates/place.md), and [faction template](templates/faction.md): small formats that preserve both evidence and possibility.
- The website's chapter sequence lives in [`src/content/chapters/index.ts`](../src/content/chapters/index.ts). The codex lives in [`src/content/codex.ts`](../src/content/codex.ts); geographical pins live in [`src/content/world.ts`](../src/content/world.ts). Profiles supplement these files rather than replacing their chapter prose.

## Four evidence labels

**Established in current draft** means explicitly stated in repository narrative or its current supporting canon notes. It is true for this draft, even though the author can revise it. **Interpretation** means a defensible reading that is not itself a recorded event. **Proposed development** means a new idea, not yet adopted. **Open question** means a choice or factual gap we should not conceal with confident prose.

Profiles contain full-story spoilers. Their endpoint is the end of Chapter Ten unless they state otherwise. That is different from what a reader or a character knows in an earlier chapter. Alethea is alive in Chapters Four–Nine and dead at the end of Ten; Dyia does not know the Dust's maker in Chapter Nine. His knowledge on arrival at the final door has not been written.

## Source order and older versions

Latest explicit user decisions govern. The current chapter drafts, codex, character file, and `CLAUDE.md` preserve deliberate changes made after the early documents. When they conflict with one another, record the conflict and make a reasoned repair in the affected task; do not pretend one file resolves every issue automatically.

The [early narrative](https://docs.google.com/document/d/15yBJhMt-ZnlQByomvJn9YZcW9isOCK_kHsO2p0GcQ6E/edit) and [early character questionnaire](https://docs.google.com/document/d/1aZ0V575eBJkAhTxrmRZ2HFDqkOWwtknnz_HMRcgc9ac/edit) were reviewed as source material. The narrative takes priority over the older questionnaire where they conflict. These documents preserve useful discarded possibilities, not mandatory instructions.

The author's latest decision restores **Dyia**, replacing the intervening repository alias Adris. Other current revisions include **Tengeri Wastes, Sidrat Al Muntaha, and Lysandria**, rather than literal Mongolia, Japan, and Macedonia; Amara's death after the cure; and Sinna's death through a stolen shipment rather than an earlier direct killing. The Three Seats, Bakhtari ancestry, prologue, and Chapter Ten extend the early narrative. The questionnaire's wish for a fruit cart or simpler agricultural life remains useful *early-source material*, not a new event in the chapters.

The father's current name is **Idris Averroes**, replacing Adil on 2026-09-07. The `adil` ID and profile filename preserve existing links; original source snapshots keep Adil. Idris and the brother's old alias Adris are separate naming decisions.

Repository copies preserve the [early narrative](sources/early-narrative.md), [questionnaire](sources/early-questionnaire.md), and newly recovered [geography document](sources/early-geography.md). The geography includes Ruhania, the Solunari sanctuary, the Grand Codexium, a more developed Sidrat Al Muntaha, and the fragmented Leonin Khanate. These are author-created source concepts worth recovering; their exact relationship to the current story still needs reconciliation. In particular, its **Chuluun, prince of the Altan Tribe**, conflicts with or substantially extends the current **Leonin elder** role. Do not silently merge those biographies.

## How a pitch becomes part of the story

1. Keep the user's original idea in a pitch note. Record whether it is an exploration or a request to implement; ordinary pitches may remain alternatives without stalling other work.
2. Identify its dramatic purpose, plausible place and era, affected people, required resources, and cost. Link the relevant evidence and flag contradictions.
3. Recommend one fit and, where useful, one substantially different alternative. Explain the tradeoff in story terms. A missing motive needs a scene or changed premise, not a convenient secret.
4. When adopted, update the affected profiles and outline, then chapter/codex/map content as appropriate. State which old premise changed. An idea accepted for exploration is not automatically an established historical event.
5. Check chronology, travel, who knows what, money and supplies, cultural specificity, and the consequences for people outside the lead cast. Report what remains open.

## Near-term development priorities

Start with the family and Carthara. Give Alethea a goal and relationships beyond Hanno; give Amara decisions and work beyond victimhood; show the costs of Dyia's method. Then specify how fields, harbor, and garrison depend on each other. One well-developed dispute over grain, medicine, or testimony will reveal more than ten new noble houses.

The first pass starts chronologically with Hanno and the family, influenced by the author's love of *The Count of Monte Cristo*. The optional legend is available in the world without delaying that opening. Investigation-led and wider ensemble structures remain possible later revisions rather than competing installed openings.

The proposed pilgrimage-ship atrocity belongs first in historical research and the idea ledger. If incorporated, connect trade, protection, survivor testimony, and political consequences. Do not reduce murdered pilgrims to treasure or use the event solely as Hanno's motivation.

## Continuity questions already visible

The first prose pass repairs several earlier defects: adult recruitment follows elapsed apprenticeship years; a borrowed back room explains surviving pottery; an explicit death notice reaches Hanno on his return; the army count is a storyteller's refrain; the false palindrome claim is removed. See the current repair table in the [continuity audit](continuity.md) and the [integrated review](reviews/integrated-continuity.md). The remaining questions include:

- Hanno is 115, but the draft remembers the same market vendors from childhood. Establish elapsed years and lifespans for Dyia, the parents, Sinna, Numarius, and Alethea before dating the story.
- Reconcile Amara's Lysandrian origin with the older Bakhtari lineage without inventing a convenient migration history.
- Date the Leonin's welcome to Numarius's displaced people and subsequent dispossession, distinguishing the present rulers from earlier generations.
- Develop the limits of Corvo's customs authority and the evidence surviving Hanno's trade. The first pass now gives the network fallible records and intermediaries; it is not untraceable.
- Review Sinna's escalation to Amara's death, the treatment's limits, and Alethea's dependence as sustained character developments. The sabotage/intended-rescue alternative remains a proposal.
- The map now names all Three Seats consistently with the codex. Carthara's relationship to an unnamed larger empire and the precise balance of power among its Seats remain unresolved.
