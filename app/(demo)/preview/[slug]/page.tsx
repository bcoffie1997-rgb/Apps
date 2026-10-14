import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPreview, previews } from "@/content/demos";
import { DemoSite } from "@/components/DemoSite";
import { DemoBanner } from "@/components/DemoBanner";
import { IndustrySite } from "@/components/industry/IndustrySite";
import { industryFor } from "@/content/industries.es";

export const dynamicParams = false;
export const generateStaticParams = () => previews.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = findPreview((await params).slug);
  if (!d) return {};
  return { title: `${d.name} — ${d.lang === "es" ? "Vista Previa" : "Website Preview"}`, robots: { index: false, follow: false } };
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = findPreview((await params).slug);
  if (!d) notFound();
  const lang = d.lang ?? "en";
  const banner = <DemoBanner previewFor={d.name} lang={lang} />;
  const langLinks = d.lang ? { es: `/preview/${d.slug}`, en: `/preview/${d.slug}/en` } : undefined;
  if (d.industry) return <IndustrySite demo={d} ind={industryFor(d.industry, lang)} banner={banner} lang={lang} langLinks={langLinks} />;
  return <DemoSite demo={d} banner={banner} />;
}
