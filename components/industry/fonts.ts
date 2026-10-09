import {
  Bebas_Neue, Cormorant_Garamond, DM_Serif_Display, Fraunces, Montserrat, Nunito, Oswald, Playfair_Display, Poppins, Barlow_Condensed,
} from "next/font/google";

// Display fonts used by the industry templates. preload:false keeps them off the main site.
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "700"], variable: "--f-oswald", preload: false });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--f-bebas", preload: false });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"], style: ["normal", "italic"], variable: "--f-playfair", preload: false });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--f-cormorant", preload: false });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "800"], variable: "--f-fraunces", preload: false });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-dmserif", preload: false });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--f-montserrat", preload: false });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--f-poppins", preload: false });
const nunito = Nunito({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--f-nunito", preload: false });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--f-barlow", preload: false });

export const FONT_VARS = [oswald, bebas, playfair, cormorant, fraunces, dmSerif, montserrat, poppins, nunito, barlow]
  .map((f) => f.variable)
  .join(" ");

export type DisplayFont =
  | "oswald" | "bebas" | "playfair" | "cormorant" | "fraunces" | "dmserif" | "montserrat" | "poppins" | "nunito" | "barlow";

export const fontFamily = (f: DisplayFont) => `var(--f-${f}), ui-sans-serif, system-ui, sans-serif`;
