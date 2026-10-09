import { en, type Copy } from "@/content/en";
import { es } from "@/content/es";

export type Lang = "en" | "es";
export const LANG_KEY = "mcp-lang";

export const getCopy = (lang: Lang): Copy => (lang === "es" ? es : en);

/** "/pricing" → "/es/pricing" for Spanish. */
export function localize(lang: Lang, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/es" : `/es${path}`;
}

/** "/es/pricing" → "/pricing" */
export function stripLang(pathname: string) {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

/** canonical + hreflang links for a page. */
export function alternates(lang: Lang, path: string) {
  return {
    canonical: localize(lang, path),
    languages: { "en-US": path, "es-US": localize("es", path), "x-default": path },
  };
}
