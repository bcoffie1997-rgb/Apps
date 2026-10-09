import type { Metadata } from "next";
import { site } from "@/site.config";
import { Faq, FinalCta, PageHero, PricingCards } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Pricing — Small Business Website Plans",
  description: `Website plans from $${site.pricing.plans[0].price}/mo for South Florida small businesses. $${site.pricing.setupFee} setup, month-to-month, cancel with 30 days notice.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const p = site.pricing;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} subtitle={`${p.subtitle} $${p.setupFee} ${p.setupLabel}.`} />
      <section className="bg-mist py-20 md:py-28">
        <div className="container-x">
          <h2 className="sr-only">Monthly plans</h2>
          <PricingCards />
        </div>
      </section>
      <Faq />
      <FinalCta />
    </>
  );
}
