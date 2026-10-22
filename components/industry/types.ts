import type { DisplayFont } from "./fonts";

export type SectionKey =
  | "trustBar" | "services" | "menu" | "gallery" | "beforeAfter" | "process" | "whyUs"
  | "about" | "serviceArea" | "reviews" | "faq" | "cta";

export type IndustryKey =
  | "barber" | "salon" | "braids" | "nails" | "tailor" | "auto" | "tires" | "detail"
  | "ac" | "handy" | "lawn" | "pressure" | "carib" | "cafe" | "pet"
  | "botanica" | "market" | "bakery" | "latin" | "jewelry" | "craft" | "shipping" | "cleaning" | "pizza";

export type Industry = {
  key: IndustryKey;
  label: string;
  font: DisplayFont;
  upper?: boolean; // uppercase headlines
  palette: {
    bg: string; fg: string; muted: string; card: string; line: string;
    accent: string; accentFg: string; dark: string; darkFg: string;
  };
  hero: "overlay" | "split" | "collage";
  radius: string; // corner style, e.g. "6px" sharp or "28px" soft
  sections: SectionKey[];
  urgency?: string; // thin strip on top, e.g. "AC out? We pick up."
  eyebrow: string;
  headline: string;
  sub: string; // {city}
  cta: string; // main button when the business has a phone
  cta2: string; // secondary button
  trust: { icon: IconName; text: string }[];
  servicesKicker: string;
  servicesTitle: string;
  servicesStyle: "cards" | "photoCards" | "list";
  services: { name: string; desc: string; icon?: IconName }[];
  menu?: { section: string; items: { name: string; desc: string }[] }[];
  process?: { t: string; d: string }[];
  whyUs?: { t: string; d: string; icon?: IconName }[];
  galleryTitle: string;
  beforeAfterTitle?: string;
  aboutTitle: string;
  about: string; // {name} {city} {ratingLine}
  faq: { q: string; a: string }[];
  finalTitle: string;
  finalSub: string; // {city}
};

export type IconName =
  | "star" | "pin" | "clock" | "phone" | "shield" | "check" | "calendar" | "spark" | "wrench" | "snow"
  | "car" | "leaf" | "drop" | "scissors" | "heart" | "paw" | "home" | "chat" | "fork" | "cup" | "tag" | "truck" | "bolt" | "gem" | "box" | "cake" | "candle" | "basket";
