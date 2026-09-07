import Image from "next/image";
import styles from "./HeroArtwork.module.css";

export function HeroArtwork() {
  return <div id="hero-artwork" className={`home-art ${styles.artwork}`}>
    <Image src="/images/plates/carthara-market-hero-v3.webp" alt="A panoramic ink and watercolor view of Carthara: Black families and traders beneath shaded market awnings, planted terraces, and intricate limestone arcades" fill sizes="(max-width: 700px) 1500px, 100vw" preload className={styles.painting} />
  </div>;
}
