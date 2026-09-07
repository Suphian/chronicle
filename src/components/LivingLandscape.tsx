import Image from "next/image";
import styles from "./LivingLandscape.module.css";
import { livingArtwork, type LivingArtworkId } from "@/content/living-vignettes";

/** Chapter artwork stays still until a scene-specific animation is developed. */
export function LivingLandscape({ artwork = "lysandria-terrace", title, headingLevel = 2 }: { artwork?: LivingArtworkId; title?: string; headingLevel?: 2 | 3 }) {
  const art = livingArtwork(artwork);
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return <section className={styles.landscape} aria-label={title ?? art.title} data-living-vignette={artwork}>
    <Heading className={styles.title}>{title ?? art.title}</Heading>
    <figure className={styles.figure}>
      <div className={styles.window} style={{ aspectRatio: `${art.width} / ${art.height}` }}>
        <Image src={art.src} alt={art.alt} fill sizes="(min-width: 1300px) 900px, (min-width: 901px) 70vw, 95vw" className={styles.painting} />
      </div>
      {art.caption && <figcaption className={styles.caption}>{art.caption}</figcaption>}
    </figure>
  </section>;
}
