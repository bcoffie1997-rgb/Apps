import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPreview, previews } from "@/content/demos";
import { DemoBanner } from "@/components/DemoBanner";
import { IndustrySite } from "@/components/industry/IndustrySite";
import { industryFor } from "@/content/industries.es";

/** English version of a bilingual (Spanish-first) preview. */
export const dynamicParams = false;
export const generateStaticParams = () => previews.filter((d) => d.lang && d.industry).map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = findPreview((await params).slug);
  if (!d) return {};
  return { title: `${d.name} — Website Preview`, robots: { index: false, follow: false } };
}

export default async function PreviewEnPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = findPreview((await params).slug);
  if (!d?.lang || !d.industry) notFound();
  return (
    <IndustrySite demo={d} ind={industryFor(d.industry, "en")} banner={<DemoBanner previewFor={d.name} />} lang="en"
      langLinks={{ es: `/preview/${d.slug}`, en: `/preview/${d.slug}/en` }} />
  );
}
