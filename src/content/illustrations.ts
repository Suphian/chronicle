/** Curated book plates. Captions describe illustrations, not additional story events. */
export interface BookPlate {
  src: string;
  alt: string;
  caption: string;
  number: string;
}

export const bookPlates: Record<string, BookPlate> = {
  "market-awnings/the-fruit-stall": {
    src: "/images/plates/carthara-market.webp",
    alt: "Ink and watercolor drawing of fruit stalls beneath red awnings, with carved arcades, hanging gardens, and green domes rising above Carthara.",
    caption: "Carthara · Beneath the market awnings",
    number: "01",
  },
  "bitter-apprenticeship/a-world-unto-itself": {
    src: "/images/plates/apothecary.webp",
    alt: "Hand-drawn apothecary with ceramic vessels, brass balances, carved wooden screens, and an arched passage to a fountain courtyard.",
    caption: "Carthara · An apothecary’s workshop",
    number: "02",
  },
};
