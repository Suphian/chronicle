# Character portrait studies

Thirteen ink-and-watercolor portraits give every named character a distinct face. Each character’s Markdown dossier displays its own image through `src/content/portraits.ts`; Hanno’s shared source path remains in `src/content/character.ts`. No chapter or profile prose is duplicated.

| Character | Asset |
|---|---|
| Hanno Averroes | [hanno.webp](hanno.webp) |
| Dyia Averroes | [dyia-v2.webp](dyia-v2.webp) |
| Idris Averroes | [adil-v2.webp](adil-v2.webp) |
| Amara Averroes | [amara.webp](amara.webp) |
| Alethea | [alethea-v2.webp](alethea-v2.webp) |
| Master Sinna | [virello.webp](virello.webp) |
| Lord Numarius | [numarius.webp](numarius.webp) |
| Magistra Ilvane Corvo | [corvo-v2.webp](corvo-v2.webp) |
| General Tarquin Vael | [vael.webp](vael.webp) |
| General Phylios | [phylios.webp](phylios.webp) |
| Chuluun | [chuluun.webp](chuluun.webp) |
| Iskandar | [iskandar.webp](iskandar.webp) |
| Rukhsana | [rukhsana.webp](rukhsana.webp) |

All current portraits were generated with the **built-in image_gen tool** and inspected individually. The first twelve original studies are documented in [prompts.json](prompts.json). The five revised portraits of Hanno, Idris, Dyia, Alethea and Corvo are documented in [representation-v2-prompts.json](representation-v2-prompts.json), including complete edit prompts, input and output hashes, source profiles, original PNG paths, dimensions and inspection notes. WebP conversion uses Sharp at quality 88 without cropping, resizing, retouching or compositing. Original PNGs remain at their recorded Codex paths. Earlier portrait files remain preserved; revised image URLs prevent cached earlier faces from appearing in the current cast.

These are AI-generated project artworks governed by the generating service terms, without a claim of exclusive copyright. No new external portrait, celebrity likeness, historical scan or stock image was introduced. Hanno’s revision used the project’s legacy painted portrait as its edit reference; the original remains unchanged at `../chronicle/hanno.webp`. Its earlier source and license are not established by this revision.

The author explicitly requested stronger visible Black representation. The current visual implementation depicts Idris and his sons Hanno and Dyia with compatible, individually distinct Black appearances, and Alethea and Corvo as Black women with independent professional lives. This does not invent real-world ethnic labels or new ancestry. Amara’s existing brown appearance remains part of the family. Exact faces, hair styling, apparent ages and costume details remain visual interpretations. Chuluun remains a Leonin with an elder’s record book and repaired camp shelter; his folded homeland cloth leaves the flag’s exact design unsettled. Sinna is a fictional scholar, not a portrait of Ibn Sina. The legend portraits do not decide Iskandar’s death or turn Rukhsana into a magical oracle. Stable IDs `adil` and `virello` preserve existing links while display names remain Idris and Sinna.
