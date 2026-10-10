import type { Metadata } from "next";
import { previews } from "@/content/demos";
import { PitchDeck } from "@/components/PitchDeck";

export const metadata: Metadata = { title: "Sales Walkthrough — Missed Call Pros", robots: { index: false, follow: false } };

/** Private page for the sales team: walk an owner through the plans on a phone or tablet. */
export default function PitchPage() {
  const prospects = previews.map((p) => ({ slug: p.slug, name: p.name, niche: p.niche, city: p.city, industry: p.industry }));
  return <PitchDeck prospects={prospects} />;
}
