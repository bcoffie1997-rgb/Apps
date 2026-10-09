import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPreview, previews } from "@/content/demos";
import { DemoSite } from "@/components/DemoSite";
import { DemoBanner } from "@/components/DemoBanner";
import { IndustrySite } from "@/components/industry/IndustrySite";
import { INDUSTRIES } from "@/content/industries";

export const dynamicParams = false;
export const generateStaticParams = () => previews.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = findPreview((await params).slug);
  if (!d) return {};
  return { title: `${d.name} — Website Preview`, robots: { index: false, follow: false } };
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = findPreview((await params).slug);
  if (!d) notFound();
  const banner = <DemoBanner previewFor={d.name} />;
  if (d.industry) return <IndustrySite demo={d} ind={INDUSTRIES[d.industry]} banner={banner} />;
  return <DemoSite demo={d} banner={banner} />;
}
