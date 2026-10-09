import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/site.config";
import { ArrowIcon, CheckIcon, PhoneIcon, PlusIcon, featureIcons } from "./Icons";

const delay = (i: number) => ({ "--d": `${i * 90}ms` }) as CSSProperties;

export function SectionHeading({
  eyebrow, title, subtitle, dark = false, center = false,
}: { eyebrow: string; title: string; subtitle?: string; dark?: boolean; center?: boolean }) {
  return (
    <div data-reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-accent" : "text-accent-700"}`}>{eyebrow}</p>
      <h2 className={`h-section mt-4 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink/60"}`}>{subtitle}</p>}
    </div>
  );
}

/** Dark hero band for inner pages. */
export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white md:pb-24 md:pt-44">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="h-display mt-5 max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function StatsStrip() {
  const s = site.stats;
  return (
    <section aria-labelledby="stats-title" className="border-y border-white/[0.06] bg-ink-2 py-14 md:py-20">
      <div className="container-x">
        <h2 id="stats-title" data-reveal className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-white/50">{s.title}</h2>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {s.items.map((it, i) => (
            <div key={it.label} data-reveal style={delay(i)} className="text-center md:border-l md:border-white/[0.08] md:first:border-0">
              <dt className="sr-only">{it.label}</dt>
              <dd>
                <span className={`block text-5xl font-bold tracking-[-0.05em] sm:text-6xl ${i === 3 ? "text-red-400" : "text-white"}`}>{it.value}</span>
                <span className="mx-auto mt-3 block max-w-[15rem] text-[15px] leading-snug text-white/60">{it.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-center text-xs text-white/55">{s.footnote}</p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const h = site.howItWorks;
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={h.eyebrow} title={h.title} />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {h.steps.map((step, i) => (
            <li key={step.title} data-reveal style={delay(i)} className="card group relative overflow-hidden p-7 md:p-8">
              <span className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-lg font-bold text-accent">{i + 1}</span>
                {i < h.steps.length - 1 && <ArrowIcon className="hidden h-5 w-5 text-ink/25 md:block" />}
                {i === h.steps.length - 1 && <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-700">48 hrs</span>}
              </span>
              <h3 className="mt-8 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Features() {
  const f = site.features;
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-32">
      <div aria-hidden className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading dark eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.items.map((it, i) => {
            const Icon = featureIcons[it.icon];
            return (
              <li key={it.title} data-reveal style={delay(i)}
                className={`card-dark p-7 transition-colors hover:border-accent/30 ${i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:flex lg:flex-col" : ""}`}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Icon />
                </span>
                <h3 className="mt-6 text-xl font-bold">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{it.body}</p>
                {i === 0 && (
                  <div aria-hidden className="mt-8 hidden space-y-2 lg:mt-auto lg:block lg:pt-8">
                    <div className="w-fit rounded-2xl rounded-bl-md bg-white/[0.08] px-4 py-2.5 text-sm text-white/70">Missed call · 2:14 PM</div>
                    <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm font-medium text-ink">
                      Hi! Sorry we missed you. Want to book a time? Reply here 👋
                    </div>
                    <div className="w-fit rounded-2xl rounded-bl-md bg-white/[0.08] px-4 py-2.5 text-sm text-white/80">Yes! Tomorrow at 10?</div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function PricingCards({ compact = false }: { compact?: boolean }) {
  const p = site.pricing;
  return (
    <div>
      <ul className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {p.plans.map((plan, i) => (
          <li key={plan.id} data-reveal style={delay(i)}
            className={`relative flex flex-col rounded-3xl p-7 md:p-8 ${
              plan.popular
                ? "bg-ink text-white shadow-[var(--shadow-lift)] ring-2 ring-accent lg:-my-4 lg:py-12"
                : "card"
            }`}>
            {plan.popular && (
              <span className="absolute -top-3.5 left-7 rounded-full bg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                Most popular
              </span>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className={`mt-1 ${plan.popular ? "text-white/60" : "text-ink/65"}`}>{plan.tagline}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-[-0.05em]">{money(plan.price)}</span>
              <span className={plan.popular ? "text-white/55" : "text-ink/65"}>/mo</span>
            </p>
            <p className={`mt-1 text-sm ${plan.popular ? "text-white/50" : "text-ink/65"}`}>+ {money(p.setupFee)} {p.setupLabel}</p>
            <div className={`my-6 h-px ${plan.popular ? "bg-white/10" : "bg-ink/[0.07]"}`} />
            {"includesFrom" in plan && (
              <p className={`mb-3 text-sm font-semibold ${plan.popular ? "text-white/80" : "text-ink/70"}`}>{plan.includesFrom}</p>
            )}
            <ul className="space-y-3">
              {plan.features.map((feat) => (
                <li key={feat} className="flex gap-3 text-[15px]">
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${plan.popular ? "bg-accent text-ink" : "bg-ink text-accent"}`}>
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className={plan.popular ? "text-white/85" : "text-ink/80"}>{feat}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link href={`/contact?plan=${plan.id}`} className={`${plan.popular ? "btn-accent" : "btn-dark"} w-full`}>
                Choose {plan.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {!compact && (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {p.addOns.map((a) => (
            <div key={a.id} data-reveal className="card flex flex-col gap-4 p-7 sm:flex-row sm:items-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent-700"><PlusIcon /></span>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/65">Add-on</p>
                <h3 className="text-lg font-bold">{a.name} <span className="font-semibold text-ink/65">· {money(a.price)}{a.period}</span></h3>
                <p className="mt-1 text-[15px] text-ink/60">{a.body}</p>
              </div>
            </div>
          ))}
          <div data-reveal style={delay(1)} className="card flex flex-col gap-4 p-7 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/65">No monthly plan</p>
              <h3 className="text-lg font-bold">{p.websiteOnly.name} <span className="font-semibold text-ink/65">· {money(p.websiteOnly.price)} one-time</span></h3>
              <p className="mt-1 text-[15px] text-ink/60">{p.websiteOnly.body}</p>
            </div>
            <Link href={`/contact?plan=${p.websiteOnly.id}`} className="btn-ghost-dark shrink-0">Get started</Link>
          </div>
        </div>
      )}

      <p data-reveal className="mt-10 text-center text-[15px] font-medium text-ink/60">
        <CheckIcon className="mr-1.5 inline h-4 w-4 text-accent-700" />
        {p.note}
      </p>
    </div>
  );
}

export function PricingPreview() {
  const p = site.pricing;
  return (
    <section className="bg-mist py-20 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />
          <Link data-reveal href="/pricing" className="inline-flex min-h-12 items-center gap-2 font-semibold text-ink hover:text-accent-700">
            See full pricing <ArrowIcon />
          </Link>
        </div>
        <div className="mt-14 lg:mt-20"><PricingCards compact /></div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const t = site.testimonials;
  if (!t.enabled) return null;
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {t.items.map((it, i) => (
            <li key={i} data-reveal style={delay(i)} className="card flex flex-col p-7">
              <span role="img" className="flex gap-0.5 text-accent-700" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <svg key={k} viewBox="0 0 20 20" className="h-[18px] w-[18px] fill-current" aria-hidden><path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" /></svg>
                ))}
              </span>
              <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed text-ink/85">“{it.quote}”</blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-ink/[0.06] pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-bold text-accent" aria-hidden>
                  {it.business.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold">{it.name}</span>
                  <span className="block text-sm text-ink/65">{it.business}</span>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  const f = site.faq;
  return (
    <section className="bg-mist py-20 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow={f.eyebrow} title={f.title} />
        <div data-reveal className="divide-y divide-ink/[0.08] rounded-3xl border border-ink/[0.07] bg-white px-6 shadow-[var(--shadow-soft)] md:px-8">
          {f.items.map((it) => (
            <details key={it.q} className="group py-1">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 text-[17px] font-semibold">
                {it.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist transition-transform duration-300 group-open:rotate-45">
                  <PlusIcon className="h-4 w-4" />
                </span>
              </summary>
              <p className="pb-5 pr-10 leading-relaxed text-ink/65">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const c = site.finalCta;
  return (
    <section className="bg-white px-3 py-3 sm:px-5 sm:py-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-center text-white md:rounded-[2.5rem] md:py-28">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <h2 data-reveal className="h-section">{c.title}</h2>
          <p data-reveal style={delay(1)} className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">{c.subtitle}</p>
          <div data-reveal style={delay(2)} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={site.cta.primaryHref} className="btn-accent">{site.cta.primary} <ArrowIcon /></Link>
            <a href={site.phoneHref} className="btn-ghost-light"><PhoneIcon className="h-[18px] w-[18px] text-accent" /> {site.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
