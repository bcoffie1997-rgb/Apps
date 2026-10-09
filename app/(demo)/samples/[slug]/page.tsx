import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findSample, samples } from "@/content/demos";
import { DemoSite } from "@/components/DemoSite";
import { DemoBanner } from "@/components/DemoBanner";

export const dynamicParams = false;
export const generateStaticParams = () => samples.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = findSample((await params).slug);
  if (!d) return {};
  return {
    title: `${d.name} — Sample ${d.niche} Website | Missed Call Pros`,
    description: `A sample ${d.niche.toLowerCase()} website designed by Missed Call Pros. See what we can build for your business.`,
    alternates: { canonical: `/samples/${d.slug}` },
  };
}

export default async function SamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const d = findSample((await params).slug);
  if (!d) notFound();
  return <DemoSite demo={d} banner={<DemoBanner />} />;
}
