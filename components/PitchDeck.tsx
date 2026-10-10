"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/site.config";
import { faq, genericRecommend, pitchPlans, recommend, repNotes, seoAddOn, timeline, type PitchPlanId } from "@/content/pitch";

export type PitchProspect = { slug: string; name: string; niche: string; city: string; industry?: string };

const priceOf = (id: PitchPlanId) =>
  id === "websiteOnly" ? site.pricing.websiteOnly : site.pricing.plans.find((p) => p.id === id)!.price;
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const STEPS = [
  { id: "problem", label: "The problem" },
  { id: "site", label: "Your site" },
  { id: "plans", label: "Plans" },
  { id: "compare", label: "Compare" },
  { id: "faq", label: "Questions" },
  { id: "start", label: "Get started" },
] as const;
type StepId = (typeof STEPS)[number]["id"];

function Note({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return (
    <p className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-[15px] leading-relaxed text-amber-950">
      <span className="font-bold">Rep note: </span>
      {children}
    </p>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-700">
      <path fill="currentColor" d="M8.2 13.6 4.6 10l-1.2 1.2 4.8 4.8 9-9-1.2-1.2z" />
    </svg>
  );
}

export function PitchDeck({ prospects }: { prospects: PitchProspect[] }) {
  const [step, setStep] = useState<StepId>("problem");
  const [notes, setNotes] = useState(false);
  const [slug, setSlug] = useState("");
  const [missed, setMissed] = useState(5);
  const [ticket, setTicket] = useState(60);
  const [plan, setPlan] = useState<PitchPlanId | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("for");
    if (q && prospects.some((p) => p.slug === q)) setSlug(q);
  }, [prospects]);

  const prospect = prospects.find((p) => p.slug === slug);
  const rec = (prospect?.industry && recommend[prospect.industry]) || genericRecommend;
  const active: PitchPlanId = plan ?? rec.plan;
  const lostMonth = missed * ticket * 4.3;
  const sorted = useMemo(() => [...prospects].sort((a, b) => a.name.localeCompare(b.name)), [prospects]);

  const idx = STEPS.findIndex((s) => s.id === step);
  const go = (d: number) => {
    const next = STEPS[Math.min(STEPS.length - 1, Math.max(0, idx + d))];
    setStep(next.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const who = prospect?.name ?? "your business";

  return (
    <main className="min-h-screen bg-mist pb-28 text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-ink/[0.07] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
          <p className="min-w-0 flex-1 truncate font-bold tracking-tight">
            Missed Call Pros{prospect && <span className="font-medium text-ink/55"> · for {prospect.name}</span>}
          </p>
          <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm font-semibold text-ink/70">
            <input type="checkbox" checked={notes} onChange={(e) => setNotes(e.target.checked)} className="h-4 w-4 accent-amber-500" />
            Rep notes
          </label>
        </div>
        <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 pb-3" aria-label="Steps">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                s.id === step ? "bg-ink text-white" : "bg-ink/[0.05] text-ink/70 hover:bg-ink/10"
              }`}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-4xl px-4 pt-6">
        {/* Prospect picker */}
        <div className="rounded-2xl border border-ink/[0.07] bg-white p-4">
          <label htmlFor="who" className="text-xs font-bold uppercase tracking-[0.14em] text-accent-700">Who are you talking to?</label>
          <select
            id="who"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setPlan(null); }}
            className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-3 text-base"
          >
            <option value="">Any business (no preview)</option>
            {sorted.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name} — {p.niche}, {p.city}</option>
            ))}
          </select>
        </div>

        {step === "problem" && (
          <section className="mt-6">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Every local business loses customers two ways.</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-soft">
                <p className="text-sm font-bold text-accent-700">01</p>
                <h2 className="mt-2 text-xl font-bold">People can&apos;t find you.</h2>
                <p className="mt-2 leading-relaxed text-ink/65">Someone searches &quot;{prospect?.niche?.toLowerCase() || "your service"} near me.&quot; Businesses with a website and a strong Google listing show up. Without one, you don&apos;t exist to that customer.</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-soft">
                <p className="text-sm font-bold text-accent-700">02</p>
                <h2 className="mt-2 text-xl font-bold">People can&apos;t reach you.</h2>
                <p className="mt-2 leading-relaxed text-ink/65">You&apos;re busy with a customer and miss a call. Most people won&apos;t leave a voicemail — they call the next business on the list.</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-ink p-6 text-white sm:p-8">
              <h2 className="text-xl font-bold">What missed calls cost {who}</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-white/65">Calls missed per week</span>
                  <input type="range" min={1} max={40} value={missed} onChange={(e) => setMissed(+e.target.value)} className="mt-2 w-full accent-[#22e58b]" />
                  <span className="text-2xl font-bold">{missed}</span>
                </label>
                <label className="block">
                  <span className="text-sm text-white/65">Average customer spends</span>
                  <input type="range" min={20} max={1000} step={10} value={ticket} onChange={(e) => setTicket(+e.target.value)} className="mt-2 w-full accent-[#22e58b]" />
                  <span className="text-2xl font-bold">{money(ticket)}</span>
                </label>
              </div>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-white/65">If even half of those callers go somewhere else, that&apos;s about</p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-accent sm:text-5xl">{money(lostMonth / 2)}<span className="text-xl text-white/60"> / month</span></p>
                <p className="mt-2 text-white/65">walking to a competitor — {money((lostMonth / 2) * 12)} a year.</p>
              </div>
            </div>
            <Note show={notes}>{repNotes.problem}</Note>
          </section>
        )}

        {step === "site" && (
          <section className="mt-6">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">We already built it.</h1>
            <p className="mt-3 text-lg leading-relaxed text-ink/65">No imagination needed. This is what customers see when they look you up — instead of nothing.</p>
            {prospect ? (
              <div className="mt-6 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
                <div className="aspect-[9/14] w-full sm:aspect-[16/10]">
                  <iframe src={`/preview/${prospect.slug}`} title={`${prospect.name} preview`} className="h-full w-full" loading="lazy" />
                </div>
                <a href={`/preview/${prospect.slug}`} target="_blank" rel="noopener" className="block bg-ink py-4 text-center font-semibold text-white">Open full screen →</a>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-soft">
                <p className="text-ink/65">Pick the business at the top to show their site here, or open the full list.</p>
                <a href="/preview" className="mt-4 inline-block rounded-full bg-ink px-5 py-3 font-semibold text-white">All previews →</a>
              </div>
            )}
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Your name, services, hours and photos", "Your Google reviews front and center", "One tap to call or text you"].map((t) => (
                <li key={t} className="flex gap-2 rounded-2xl bg-white p-4 font-medium shadow-soft"><Check />{t}</li>
              ))}
            </ul>
            <Note show={notes}>{repNotes.site}</Note>
          </section>
        )}

        {step === "plans" && (
          <section className="mt-6">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Pick what fits {who}.</h1>
            <p className="mt-3 text-lg text-ink/65">One-time setup {money(site.pricing.setupFee)}, then a monthly plan. Month-to-month — cancel with 30 days notice.</p>

            <div className="mt-6 rounded-3xl border-2 border-accent bg-white p-6 shadow-glow">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-700">Our pick for {who}</p>
              <p className="mt-2 text-2xl font-bold">{pitchPlans.find((p) => p.id === rec.plan)!.name} · {money(priceOf(rec.plan))}{rec.plan !== "websiteOnly" && "/mo"}</p>
              <p className="mt-2 leading-relaxed text-ink/70">{rec.why}</p>
              {notes && "alt" in rec && typeof rec.alt === "string" && <p className="mt-2 text-sm font-semibold text-amber-800">Rep: {String(rec.alt)}</p>}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist">
              {pitchPlans.map((p) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={p.id === active}
                  onClick={() => setPlan(p.id)}
                  className={`relative rounded-2xl border p-4 text-left transition ${
                    p.id === active ? "border-ink bg-ink text-white" : "border-ink/10 bg-white hover:border-ink/30"
                  }`}
                >
                  {p.id === rec.plan && <span className="absolute -top-2.5 right-3 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-ink">Best fit</span>}
                  <span className="block font-bold">{p.name}</span>
                  <span className={`block text-sm ${p.id === active ? "text-white/70" : "text-ink/60"}`}>
                    {money(priceOf(p.id))}{p.id === "websiteOnly" ? " once" : "/mo"}
                  </span>
                </button>
              ))}
            </div>

            {pitchPlans.filter((p) => p.id === active).map((p) => (
              <div key={p.id} className="mt-4 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-bold">{p.name}</h2>
                  <p className="text-2xl font-bold">{money(priceOf(p.id))}<span className="text-base font-medium text-ink/55">{p.id === "websiteOnly" ? " one-time" : "/month"}</span></p>
                </div>
                <p className="mt-1 text-lg text-ink/65">{p.tagline}</p>

                <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-accent-700">What you get</h3>
                {p.includesPrev && <p className="mt-2 font-semibold">{p.includesPrev}</p>}
                <ul className="mt-3 space-y-3">
                  {p.gets.map((g) => (
                    <li key={g.title} className="flex gap-3">
                      <Check />
                      <span><span className="font-semibold">{g.title}.</span> <span className="text-ink/65">{g.body}</span></span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-accent-700">Why it makes sense</h3>
                <p className="mt-2 leading-relaxed text-ink/75">
                  {p.id === rec.plan ? rec.why : `Solves: ${p.solves.toLowerCase()}. Best for ${p.bestFor.charAt(0).toLowerCase() + p.bestFor.slice(1)}`}
                </p>

                <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-accent-700">What to expect</h3>
                <ol className="mt-3 space-y-3 border-l-2 border-accent/40 pl-4">
                  {timeline
                    .filter((t) => (p.id === "websiteOnly" ? t.when === "Today" || t.when === "48 hours" : true))
                    .filter((t) => !(t.what.startsWith("Growth") && (p.id === "basic" || p.id === "websiteOnly")))
                    .filter((t) => !(t.when === "Day 30" && (p.id === "basic" || p.id === "websiteOnly")))
                    .map((t) => (
                      <li key={t.when}><span className="font-semibold">{t.when}:</span> <span className="text-ink/65">{t.what.replace(/^Growth & Busy: /, "")}</span></li>
                    ))}
                </ol>
                <p className="mt-6 rounded-2xl bg-mist p-4 text-[15px] text-ink/70">
                  First payment: {money(site.pricing.setupFee)} setup{p.id !== "websiteOnly" && ` + ${money(priceOf(p.id))} first month`}.
                </p>
              </div>
            ))}

            <div className="mt-4 rounded-3xl bg-white p-6 shadow-soft">
              <p className="font-bold">{seoAddOn.name} · {money(site.pricing.seoAddOn)}/mo</p>
              <p className="mt-1 leading-relaxed text-ink/65">{seoAddOn.body}</p>
            </div>
            <Note show={notes}>{repNotes.plans}</Note>
          </section>
        )}

        {step === "compare" && (
          <section className="mt-6">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Side by side.</h1>
            <div className="mt-6 overflow-x-auto rounded-3xl bg-white shadow-soft">
              <table className="w-full min-w-[560px] text-left text-[15px]">
                <thead>
                  <tr className="border-b border-ink/10">
                    <th className="p-4" />
                    {(["basic", "growth", "busy"] as const).map((id) => (
                      <th key={id} className={`p-4 ${id === rec.plan ? "bg-accent/15" : ""}`}>
                        <span className="block font-bold">{pitchPlans.find((p) => p.id === id)!.name}</span>
                        <span className="font-medium text-ink/60">{money(priceOf(id))}/mo</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Website, hosting & web address", 1],
                    ["Small changes by text", 1],
                    ["Google Maps profile", 2],
                    ["Missed-call text-back", 2],
                    ["Automatic review requests", 2],
                    ["Monthly results report", 2],
                    ["Online booking + reminders", 3],
                    ["24/7 website assistant", 3],
                    ["8 social posts a month", 3],
                  ].map(([label, tier]) => (
                    <tr key={label as string} className="border-b border-ink/[0.06] last:border-0">
                      <td className="p-4 font-medium">{label}</td>
                      {[1, 2, 3].map((t, i) => (
                        <td key={t} className={`p-4 ${(["basic", "growth", "busy"] as const)[i] === rec.plan ? "bg-accent/15" : ""}`}>
                          {t >= (tier as number) ? <Check /> : <span className="text-ink/25">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-ink/65">All plans: {money(site.pricing.setupFee)} one-time setup · month-to-month · live in 48 hours. Want just the site? Website Only is {money(site.pricing.websiteOnly)} once.</p>
          </section>
        )}

        {step === "faq" && (
          <section className="mt-6">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Good questions.</h1>
            <ul className="mt-6 divide-y divide-ink/[0.07] overflow-hidden rounded-3xl bg-white shadow-soft">
              {faq.map((f, i) => (
                <li key={f.q}>
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold" aria-expanded={open === i}>
                    {f.q}
                    <span aria-hidden className="text-xl text-ink/40">{open === i ? "−" : "+"}</span>
                  </button>
                  {open === i && <p className="px-5 pb-5 leading-relaxed text-ink/70">{f.a}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {step === "start" && (
          <section className="mt-6">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Live in 48 hours.</h1>
            <div className="mt-6 rounded-3xl bg-ink p-6 text-white sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">{pitchPlans.find((p) => p.id === active)!.name} plan</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-white/65">Setup (one time)</p>
                  <p className="text-3xl font-bold">{money(site.pricing.setupFee)}</p>
                  <p className="mt-1 text-sm text-white/60">or $300 today + $297 at launch</p>
                </div>
                {active !== "websiteOnly" && (
                  <div>
                    <p className="text-white/65">Monthly</p>
                    <p className="text-3xl font-bold">{money(priceOf(active))}<span className="text-lg text-white/60">/mo</span></p>
                    <p className="mt-1 text-sm text-white/60">Month-to-month · 30 days notice to cancel</p>
                  </div>
                )}
              </div>
            </div>
            <ol className="mt-6 space-y-3">
              {timeline.map((t, i) => (
                <li key={t.when} className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-accent-ink">{i + 1}</span>
                  <span><span className="font-semibold">{t.when}.</span> <span className="text-ink/65">{t.what}</span></span>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={site.phoneHref} className="rounded-full bg-ink py-4 text-center font-semibold text-white">Call {site.phone}</a>
              <a href={`${site.smsHref}${prospect ? `?&body=${encodeURIComponent(`Hi, this is about ${prospect.name}'s website.`)}` : ""}`} className="rounded-full border border-ink/15 bg-white py-4 text-center font-semibold">Text us</a>
            </div>
            <Note show={notes}>{repNotes.start}</Note>
          </section>
        )}
      </div>

      {/* Back / next */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/[0.07] bg-white/95 backdrop-blur" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-auto flex max-w-4xl gap-3 px-4 py-3">
          <button onClick={() => go(-1)} disabled={idx === 0} className="flex-1 rounded-full border border-ink/15 py-3.5 font-semibold disabled:opacity-40">← Back</button>
          <button onClick={() => go(1)} disabled={idx === STEPS.length - 1} className="flex-[2] rounded-full bg-accent py-3.5 font-bold text-accent-ink disabled:opacity-40">
            {idx < STEPS.length - 1 ? `Next: ${STEPS[idx + 1].label} →` : "Done"}
          </button>
        </div>
      </div>
    </main>
  );
}
