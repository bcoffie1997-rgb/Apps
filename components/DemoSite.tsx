import type { CSSProperties, ReactNode } from "react";
import type { Demo, DemoStyle } from "@/content/demos";

type Theme = {
  vars: Record<string, string>;
  display: string; // heading font classes
  heroDark: boolean;
  pattern: string; // CSS background for the art panel
  icon: ReactNode;
};

const ico = (d: ReactNode) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
    {d}
  </svg>
);

const THEMES: Record<DemoStyle, Theme> = {
  tailor: {
    vars: { bg: "#faf6ef", fg: "#1c2440", muted: "#5d6377", card: "#ffffff", line: "#ebe3d4", accent: "#a8742f", accentFg: "#ffffff", hero: "#1c2440" },
    display: "font-[Georgia,'Times_New_Roman',serif] font-normal tracking-[-0.01em]",
    heroDark: true,
    pattern: "repeating-linear-gradient(90deg,#26304f 0 22px,#2c3759 22px 23px,#26304f 23px 46px,#b8874033 46px 47px),#26304f",
    icon: ico(<><circle cx="18" cy="46" r="7" /><circle cx="46" cy="46" r="7" /><path d="M23 41 46 12M41 41 18 12" /><path d="M8 8c10 0 14 6 24 6s14-6 24-6" strokeDasharray="3 4" /></>),
  },
  barber: {
    vars: { bg: "#0f0f10", fg: "#f5f2ea", muted: "#a7a39a", card: "#19191b", line: "#2a2a2d", accent: "#e8b04b", accentFg: "#141414", hero: "#0f0f10" },
    display: "uppercase tracking-[-0.02em] font-black",
    heroDark: true,
    pattern: "repeating-linear-gradient(135deg,#b91c1c 0 18px,#f5f2ea 18px 36px,#1d4ed8 36px 54px,#f5f2ea 54px 72px)",
    icon: ico(<><circle cx="18" cy="46" r="7" /><circle cx="46" cy="46" r="7" /><path d="M23 41 46 12M41 41 18 12" /></>),
  },
  salon: {
    vars: { bg: "#fbf4f1", fg: "#2b1b1f", muted: "#7c6468", card: "#ffffff", line: "#efdfda", accent: "#b83a63", accentFg: "#ffffff", hero: "#fbf4f1" },
    display: "font-[Georgia,'Times_New_Roman',serif] italic font-normal tracking-[-0.01em]",
    heroDark: false,
    pattern: "radial-gradient(circle at 30% 30%,#f4c6d3 0 28%,transparent 29%),radial-gradient(circle at 75% 65%,#e9a3b8 0 24%,transparent 25%),radial-gradient(circle at 60% 20%,#fde3d8 0 18%,transparent 19%),#f9e4e4",
    icon: ico(<><path d="M32 8c6 10 14 14 14 24a14 14 0 0 1-28 0c0-10 8-14 14-24Z" /><path d="M26 36c1 4 4 6 8 6" /></>),
  },
  auto: {
    vars: { bg: "#0b1220", fg: "#f1f5f9", muted: "#94a3b8", card: "#111a2e", line: "#1e293b", accent: "#ef4444", accentFg: "#ffffff", hero: "#0b1220" },
    display: "uppercase font-extrabold tracking-[-0.03em]",
    heroDark: true,
    pattern: "repeating-linear-gradient(60deg,#1e293b 0 10px,#0f172a 10px 20px),#0f172a",
    icon: ico(<><path d="M40 10a10 10 0 0 0-12 13L10 41a5 5 0 0 0 7 7l18-18a10 10 0 0 0 13-12l-6 6-6-2-2-6 6-6Z" /></>),
  },
  restaurant: {
    vars: { bg: "#fff7ec", fg: "#3a1d0e", muted: "#86614a", card: "#ffffff", line: "#f1dfc8", accent: "#d9480f", accentFg: "#ffffff", hero: "#3a1d0e" },
    display: "font-[Georgia,'Times_New_Roman',serif] font-bold tracking-[-0.02em]",
    heroDark: true,
    pattern: "conic-gradient(from 45deg at 50% 50%,#f59f00 0 25%,#d9480f 0 50%,#f59f00 0 75%,#d9480f 0) 0 0/56px 56px",
    icon: ico(<><path d="M20 8v20a6 6 0 0 0 6 6v22M14 8v14M26 8v14M44 56V8c-6 4-8 12-8 22h8" /></>),
  },
  contractor: {
    vars: { bg: "#ffffff", fg: "#0b2545", muted: "#5b6b82", card: "#f4f7fb", line: "#e2e8f0", accent: "#f59e0b", accentFg: "#0b2545", hero: "#0b2545" },
    display: "font-extrabold tracking-[-0.035em]",
    heroDark: true,
    pattern: "radial-gradient(circle at 50% 0,#13315c 0 16px,transparent 17px) 0 0/34px 22px,#0b2545",
    icon: ico(<><path d="M6 32 32 10l26 22" /><path d="M14 26v28h36V26" /><path d="M26 54V38h12v16" /></>),
  },
  cleaning: {
    vars: { bg: "#f2fbf9", fg: "#083344", muted: "#4b7280", card: "#ffffff", line: "#d4efe9", accent: "#0d9488", accentFg: "#ffffff", hero: "#f2fbf9" },
    display: "font-bold tracking-[-0.03em]",
    heroDark: false,
    pattern: "radial-gradient(circle at 25% 35%,#ffffff 0 14%,transparent 15%),radial-gradient(circle at 70% 25%,#ffffffcc 0 9%,transparent 10%),radial-gradient(circle at 60% 70%,#ffffff 0 18%,transparent 19%),radial-gradient(circle at 20% 80%,#ffffffaa 0 7%,transparent 8%),linear-gradient(135deg,#5eead4,#0d9488)",
    icon: ico(<><path d="M32 6l4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z" /><path d="M50 40l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" /></>),
  },
};

const Star = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
    <path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
  </svg>
);

/** A complete one-page small-business website, themed by niche. */
export function DemoSite({ demo, banner }: { demo: Demo; banner: ReactNode }) {
  const th = THEMES[demo.style];
  const style = Object.fromEntries(Object.entries(th.vars).map(([k, v]) => [`--${k}`, v])) as CSSProperties;
  const heroFg = th.heroDark ? "text-white" : "text-[var(--fg)]";
  const heroMuted = th.heroDark ? "text-white/70" : "text-[var(--muted)]";
  const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition active:scale-[0.98]";
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${demo.name} ${demo.address}`)}`;
  const tel = demo.phone ? `tel:${demo.phone.replace(/[^\d]/g, "")}` : maps;
  const callLabel = demo.phone ? `Call ${demo.phone}` : "Get directions";

  return (
    <div style={style} className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {banner}

      {/* nav */}
      <header className={`${th.heroDark ? "bg-[var(--hero)] text-white" : "bg-[var(--bg)]"} border-b ${th.heroDark ? "border-white/10" : "border-[var(--line)]"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--accent)] p-1.5 text-[var(--accentFg)]">{th.icon}</span>
            <span className={`truncate text-lg ${th.display}`}>{demo.name}</span>
          </span>
          <nav className="hidden items-center gap-6 text-sm font-medium opacity-80 md:flex" aria-label="Sample site">
            <a href="#services">Services</a><a href="#about">About</a><a href="#reviews">Reviews</a><a href="#visit">Visit</a>
          </nav>
          <a href={tel} className={`${btn} !min-h-10 shrink-0 !px-4 !text-sm bg-[var(--accent)] text-[var(--accentFg)]`}>
            {demo.phone ? <>Call<span className="hidden sm:inline"> {demo.phone}</span></> : "Directions"}
          </a>
        </div>
      </header>

      {/* hero */}
      <section className={th.heroDark ? "bg-[var(--hero)]" : "bg-[var(--bg)]"}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
          <div className={heroFg}>
            <p className="inline-flex items-center gap-2 text-sm font-semibold">
              <span className="flex text-[var(--accent)]"><Star /><Star /><Star /><Star /><Star /></span>
              <span className={heroMuted}>{demo.rating} · {demo.reviewCount} Google reviews</span>
            </p>
            <h1 className={`mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl ${th.display}`}>{demo.tagline}</h1>
            <p className={`mt-5 max-w-lg text-lg leading-relaxed ${heroMuted}`}>{demo.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={demo.phone ? "#visit" : tel} target={demo.phone ? undefined : "_blank"} rel="noopener noreferrer" className={`${btn} bg-[var(--accent)] text-[var(--accentFg)] shadow-lg`}>{demo.cta}</a>
              <a href={demo.phone ? tel : "#services"} className={`${btn} border ${th.heroDark ? "border-white/20 text-white" : "border-[var(--line)] bg-white"}`}>{demo.phone ? callLabel : "See our services"}</a>
            </div>
            <ul className={`mt-8 flex flex-wrap gap-2 text-[13px] font-medium ${heroMuted}`}>
              {demo.badges.map((b) => (
                <li key={b} className={`rounded-full border px-3 py-1.5 ${th.heroDark ? "border-white/15" : "border-[var(--line)] bg-white"}`}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] shadow-2xl" style={{ background: th.pattern }}>
              {demo.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={demo.photo} alt={`${demo.name} in ${demo.city}`} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute left-1/2 top-[42%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] bg-[var(--bg)]/90 p-6 text-[var(--accent)] shadow-xl backdrop-blur">
                  {th.icon}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <p className="absolute right-5 top-5 text-right text-sm font-medium text-white/90 drop-shadow">{demo.city} · {demo.niche}</p>
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white px-4 py-3 text-[#111] shadow-xl sm:-left-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#666]">{demo.chip?.label ?? "Next available"}</p>
              <p className="text-[15px] font-bold">{demo.chip?.value ?? "Today · 3:30 PM"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">{demo.services.some((x) => x.price) ? "Services & prices" : "Services"}</p>
        <h2 className={`mt-3 text-3xl sm:text-4xl ${th.display}`}>What we do best</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demo.services.map((s) => (
            <li key={s.name} className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold">{s.name}</h3>
                {s.price && <span className="shrink-0 font-bold text-[var(--accent)]">{s.price}</span>}
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* about + hours */}
      <section id="about" className="border-y border-[var(--line)] bg-[var(--card)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">About us</p>
            <h2 className={`mt-3 text-3xl sm:text-4xl ${th.display}`}>{demo.aboutTitle ?? "Local. Trusted. On time."}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{demo.about}</p>
          </div>
          <div id="visit" className="rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-7">
            <h3 className="text-lg font-bold">{demo.hours.length ? "Hours" : "Visit us"}</h3>
            {demo.hours.length === 0 && <p className="mt-3 text-[15px] text-[var(--muted)]">Stop by the shop or get directions below.</p>}
            <dl className="mt-4 space-y-2.5">
              {demo.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 text-[15px]">
                  <dt className="text-[var(--muted)]">{h.days}</dt><dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-[var(--line)] pt-5 text-[15px]">{demo.address}</p>
            <a href={tel} className={`${btn} mt-5 w-full bg-[var(--accent)] text-[var(--accentFg)]`}>{demo.phone ? demo.cta : "Get directions"}</a>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Reviews</p>
        <h2 className={`mt-3 text-3xl sm:text-4xl ${th.display}`}>{demo.rating} stars from {demo.reviewCount} neighbors</h2>
        {demo.reviews.length === 0 && (
          <a href={maps} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-6 font-semibold">
            <span className="flex text-[var(--accent)]"><Star /><Star /><Star /><Star /><Star /></span> Read our reviews on Google
          </a>
        )}
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {demo.reviews.map((r) => (
            <li key={r.name} className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
              <span className="flex text-[var(--accent)]"><Star /><Star /><Star /><Star /><Star /></span>
              <p className="mt-4 leading-relaxed">“{r.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-[var(--muted)]">{r.name}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* footer */}
      <footer className={`${th.heroDark ? "bg-[var(--hero)] text-white/70" : "border-t border-[var(--line)] text-[var(--muted)]"} pb-24`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm sm:flex-row sm:justify-between">
          <p>© {demo.name} · {demo.city}, FL</p>
          <p>{demo.phone || demo.address}</p>
        </div>
      </footer>

      {/* 24/7 assistant bubble (shows the feature) */}
      <div aria-hidden className="fixed bottom-5 right-5 z-30 hidden max-w-[240px] items-end gap-2 sm:flex">
        <div className="rounded-2xl rounded-br-md bg-white px-4 py-3 text-[13px] text-[#111] shadow-xl">Hi! 👋 Questions about prices or hours? I reply 24/7.</div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--accent)] p-3 text-[var(--accentFg)] shadow-xl">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="M4 5h16v11H9l-5 4V5Z" /></svg>
        </span>
      </div>
    </div>
  );
}
