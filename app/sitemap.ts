import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/pricing", "/work", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
