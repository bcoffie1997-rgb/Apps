import Link from "next/link";
import { site } from "@/site.config";
import { PhoneHero } from "@/components/PhoneHero";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/Icons";
import { Faq, Features, FinalCta, HowItWorks, PricingPreview, StatsStrip, Testimonials } from "@/components/Sections";

export default function Home() {
  const h = site.hero;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-accent/[0.07] blur-3xl" />
        <div className="container-x relative grid items-center gap-14 pb-20 pt-28 md:pt-36 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-28 lg:pt-40">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-white/75">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {h.eyebrow}
            </p>
            <h1 className="h-display mt-6">
              {h.title.split(" ").slice(0, -3).join(" ")}{" "}
              <span className="bg-gradient-to-r from-accent to-[#9bf7c8] bg-clip-text text-transparent">
                {h.title.split(" ").slice(-3).join(" ")}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">{h.subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={site.cta.primaryHref} className="btn-accent">
                {site.cta.primary} <ArrowIcon />
              </Link>
              <a href={site.phoneHref} className="btn-ghost-light">
                <PhoneIcon className="h-[18px] w-[18px] text-accent" /> {site.cta.call}
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/60">
              {h.trust.map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-accent" />{t}</li>
              ))}
            </ul>
          </div>
          <PhoneHero />
        </div>
      </section>
      <StatsStrip />
      <HowItWorks />
      <Features />
      <PricingPreview />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
