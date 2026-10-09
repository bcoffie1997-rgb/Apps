import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { FinalCta, PageHero } from "@/components/Sections";
import { PinIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About — Local Web Design in Fort Lauderdale",
  description: "A local Fort Lauderdale web studio. We meet face-to-face, build your website first, and show it to you before you pay.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const a = site.about;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} subtitle={a.intro} />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-3">
            {a.values.map((v, i) => (
              <li key={v.title} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties} className="card p-8">
                <span className="text-sm font-bold text-accent-700">0{i + 1}</span>
                <h2 className="mt-4 text-2xl font-bold">{v.title}</h2>
                <p className="mt-3 leading-relaxed text-ink/60">{v.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div data-reveal className="relative overflow-hidden rounded-3xl bg-ink p-10 text-white">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <PinIcon className="relative h-8 w-8 text-accent" />
              <p className="relative mt-6 text-3xl font-bold leading-tight tracking-tight">Proudly serving {site.counties.join(" & ")}.</p>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {site.serviceAreas.map((c) => (
                  <li key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/75">{c}</li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="eyebrow text-accent-700">Our story</p>
              <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink/85 sm:text-[1.7rem]">{a.story}</p>
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
