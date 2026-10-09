import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { alternates, getCopy, localize, type Lang } from "@/lib/i18n";
import { PhoneHero } from "./PhoneHero";
import { ContactForm } from "./ContactForm";
import { ServiceMap } from "./ServiceMap";
import { ArrowIcon, CheckIcon, MailIcon, MessageIcon, PhoneIcon, PinIcon } from "./Icons";
import {
  Faq, Features, FinalCta, Guarantee, HowItWorks, PageHero, PricingCards, PricingPreview, SampleGrid, SamplesStrip, StatsStrip,
} from "./Sections";

type PageKey = "home" | "pricing" | "work" | "about" | "contact" | "privacy" | "terms" | "hi";
const PATHS: Record<PageKey, string> = {
  home: "/", pricing: "/pricing", work: "/work", about: "/about", contact: "/contact", privacy: "/privacy", terms: "/terms", hi: "/hi",
};

export function pageMetadata(lang: Lang, page: PageKey): Metadata {
  const t = getCopy(lang).seo;
  const m = t[page];
  return {
    title: page === "home" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: alternates(lang, PATHS[page]),
    openGraph: { title: m.title, description: m.description, locale: lang === "es" ? "es_US" : "en_US", url: localize(lang, PATHS[page]) },
    ...(page === "hi" ? { robots: { index: false, follow: true } } : {}),
  };
}

const d = (i: number) => ({ "--d": `${i * 90}ms` }) as CSSProperties;

export function HomePage({ lang }: { lang: Lang }) {
  const t = getCopy(lang);
  const h = t.hero;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
              {h.titleStart}{" "}
              <span className="bg-gradient-to-r from-accent to-[#9bf7c8] bg-clip-text text-transparent">{h.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">{h.subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={localize(lang, "/contact")} className="btn-accent">{t.ui.getWebsite} <ArrowIcon /></Link>
              <a href={site.phoneHref} className="btn-ghost-light"><PhoneIcon className="h-[18px] w-[18px] text-accent" /> {t.ui.call}</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/60">
              {h.trust.map((x) => (
                <li key={x} className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-accent" />{x}</li>
              ))}
            </ul>
          </div>
          <PhoneHero p={h.phone} />
        </div>
      </section>
      <StatsStrip lang={lang} />
      <HowItWorks lang={lang} />
      <Features lang={lang} />
      <SamplesStrip lang={lang} />
      <Guarantee lang={lang} />
      <PricingPreview lang={lang} />
      <Faq lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}

export function PricingPage({ lang }: { lang: Lang }) {
  const t = getCopy(lang).pricing;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={`${t.subtitle} $${site.pricing.setupFee} ${t.setupLabel}.`} />
      <section className="bg-mist py-20 md:py-28">
        <div className="container-x">
          <h2 className="sr-only">{t.plansHeading}</h2>
          <PricingCards lang={lang} />
        </div>
      </section>
      <Guarantee lang={lang} />
      <Faq lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}

export function WorkPage({ lang }: { lang: Lang }) {
  const w = getCopy(lang).work;
  return (
    <>
      <PageHero eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <h2 className="sr-only">{w.eyebrow}</h2>
          <SampleGrid lang={lang} />
        </div>
      </section>
      <FinalCta lang={lang} />
    </>
  );
}

export function AboutPage({ lang }: { lang: Lang }) {
  const a = getCopy(lang).about;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} subtitle={a.intro} />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-3">
            {a.values.map((v, i) => (
              <li key={v.title} data-reveal style={d(i)} className="card p-8">
                <span className="text-sm font-bold text-accent-700">0{i + 1}</span>
                <h2 className="mt-4 text-2xl font-bold">{v.title}</h2>
                <p className="mt-3 leading-relaxed text-ink/65">{v.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div data-reveal className="relative overflow-hidden rounded-3xl bg-ink p-10 text-white">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
              <PinIcon className="relative h-8 w-8 text-accent" />
              <p className="relative mt-6 text-3xl font-bold leading-tight tracking-tight">{a.areaTitle}</p>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {site.serviceAreas.map((c) => (
                  <li key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/75">{c}</li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <p className="eyebrow text-accent-700">{a.storyLabel}</p>
              <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink/85 sm:text-[1.7rem]">{a.story}</p>
            </div>
          </div>
        </div>
      </section>
      <Guarantee lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const t = getCopy(lang);
  const c = t.contact;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <section className="bg-mist pb-20 md:pb-28">
        <div className="container-x -mt-8 grid gap-6 md:-mt-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="card relative p-6 sm:p-10">
            <ContactForm lang={lang} c={c} privacyHref={localize(lang, "/privacy")} />
          </div>
          <aside className="flex flex-col gap-4">
            <a href={site.phoneHref} className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
              <PhoneIcon className="relative h-7 w-7 text-accent" />
              <p className="relative mt-5 text-sm text-white/60">{c.tapToCall}</p>
              <p className="relative text-3xl font-bold tracking-tight">{site.phone}</p>
              <p className="relative mt-1 text-sm text-white/60">{c.hours}</p>
            </a>
            <div className="grid grid-cols-2 gap-4">
              <a href={site.smsHref} className="card flex min-h-16 items-center gap-3 p-5 font-semibold hover:border-ink/20">
                <MessageIcon className="h-6 w-6 shrink-0 text-accent-700" /> {t.ui.text}
              </a>
              <a href={`mailto:${site.email}`} className="card flex min-h-16 items-center gap-3 p-5 font-semibold hover:border-ink/20">
                <MailIcon className="h-6 w-6 shrink-0 text-accent-700" /> Email
              </a>
            </div>
            <div className="card overflow-hidden">
              <ServiceMap label={c.mapLabel} openLabel={c.openMap} />
              <div className="p-6">
                <p className="flex items-center gap-2 font-semibold"><PinIcon className="h-5 w-5 text-accent-700" /> {c.serviceArea}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                  {c.serviceAreaBody} {site.serviceAreas.slice(0, 8).join(", ")} {c.andMore}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export function LegalPage({ lang, kind }: { lang: Lang; kind: "privacy" | "terms" }) {
  const doc = getCopy(lang)[kind];
  return (
    <>
      <PageHero eyebrow={doc.updated} title={doc.title} />
      <section className="bg-white py-16 md:py-24">
        <div className="container-x max-w-3xl">
          {doc.sections.map((s) => (
            <div key={s.h} className="border-b border-ink/[0.07] py-8 first:pt-0 last:border-0">
              <h2 className="text-xl font-bold tracking-tight">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/** Door-to-door landing page (QR code target). */
export function HiPage({ lang }: { lang: Lang }) {
  const t = getCopy(lang);
  const h = t.hi;
  return (
    <>
      <PageHero eyebrow={h.eyebrow} title={h.title} subtitle={h.subtitle} />
      <section className="bg-mist pb-20 md:pb-28">
        <div className="container-x -mt-8 grid gap-6 md:-mt-12 lg:grid-cols-[1fr_1.1fr]">
          <ol className="card space-y-6 p-7 sm:p-10">
            {h.steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink text-lg font-bold text-accent">{i + 1}</span>
                <p className="pt-2 text-lg font-semibold leading-snug">{s}</p>
              </li>
            ))}
            <li className="flex flex-wrap gap-3 border-t border-ink/[0.07] pt-6">
              <a href={site.phoneHref} className="btn-dark"><PhoneIcon className="h-[18px] w-[18px] text-accent" /> {site.phone}</a>
              <a href={site.smsHref} className="btn-ghost-dark"><MessageIcon className="h-[18px] w-[18px]" /> {t.ui.text}</a>
            </li>
          </ol>
          <div className="card p-7 sm:p-10">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">{h.formTitle}</h2>
            <ContactForm lang={lang} c={t.contact} privacyHref={localize(lang, "/privacy")} compact source={localize(lang, "/hi")} />
          </div>
        </div>
      </section>
      <SamplesStrip lang={lang} />
    </>
  );
}

export function NotFoundBody({ lang }: { lang: Lang }) {
  const n = getCopy(lang).notFound;
  return (
    <PageHero eyebrow="404" title={n.title} subtitle={n.subtitle}>
      <Link href={localize(lang, "/")} className="btn-accent mt-10">{n.cta}</Link>
    </PageHero>
  );
}
