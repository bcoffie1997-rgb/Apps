import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { samples } from "@/content/demos";

const PAGES = ["/", "/pricing", "/work", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const es = (p: string) => (p === "/" ? "/es" : `/es${p}`);
  const pages = PAGES.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
    alternates: { languages: { en: `${site.url}${path === "/" ? "" : path}`, es: `${site.url}${es(path)}` } },
  }));
  const spanish = PAGES.map((path) => ({
    url: `${site.url}${es(path)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 0.9 : 0.7,
  }));
  const demos = samples.map((d) => ({ url: `${site.url}/samples/${d.slug}`, lastModified: now, priority: 0.5 }));
  return [...pages, ...spanish, ...demos];
}
