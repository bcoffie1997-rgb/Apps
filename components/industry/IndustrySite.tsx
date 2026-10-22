import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Demo } from "@/content/demos";
import { REVIEWS } from "@/content/reviews";
import { fontFamily, FONT_VARS } from "./fonts";
import { Icon } from "./icons";
import { BeforeAfter } from "./BeforeAfter";
import { Motion } from "./Motion";
import type { Industry, SectionKey } from "./types";

type Photo = { src: string; alt: string };

/** Reads /public/photos/<key>/credits.json written by the photo research. */
function loadPhotos(key: string): Record<string, Photo> {
  const dir = path.join(process.cwd(), "public", "photos", key);
  const out: Record<string, Photo> = {};
  try {
    const credits = JSON.parse(fs.readFileSync(path.join(dir, "credits.json"), "utf8")) as { file: string; desc: string }[];
    credits.forEach((c) => {
      if (fs.existsSync(path.join(dir, c.file))) out[c.file.replace(/\.\w+$/, "")] = { src: `/photos/${key}/${c.file}`, alt: c.desc };
    });
  } catch {}
  return out;
}

const fill = (s: string, d: Demo, ratingLine: string) =>
  s.replaceAll("{city}", d.city).replaceAll("{name}", d.name).replaceAll("{ratingLine}", ratingLine).replace(/\s+$/, "");

type Lang = "en" | "es";

const UI = {
  en: {
    review: "review", reviews: "reviews", ratingLine: (r: string, n: string, w: string) => `Customers rate us ${r} stars on Google from ${n} ${w}.`,
    directions: "Get directions", findUs: "Find us", onGoogle: "on Google", serving: "Serving", book: "Book", visit: "Visit",
    menuNote: "Menu items and prices vary — call or stop in for today's specials.", gallery: "Gallery", seeDiff: "See the difference",
    beforeAfter: "Before & after", drag: "Drag the slider. Example shown — your own job photos go here.", how: "How it works",
    howTitle: "Simple from first call to done.", why: "Why choose us", whyTitle: (c: string, n: string) => `Why ${c} picks ${n}`,
    about: "About us", area: "Service area", areaTitle: (c: string) => `Proudly serving ${c} and nearby`, reviewsK: "Reviews",
    starsOn: (r: string) => `${r} stars on Google`, loved: "Loved by locals", from: (n: string, w: string) => `From ${n} real customer ${w}.`,
    read: "Read our reviews", via: "on", saying: "What customers say", faq: "FAQ", faqTitle: "Questions? We've got answers.", menu: "Menu", services: "Services",
    call: "Call", map: "Map", dirShort: "Directions", text: "Text us",
  },
  es: {
    review: "reseña", reviews: "reseñas", ratingLine: (r: string, n: string, w: string) => `Nuestros clientes nos dan ${r} estrellas en Google en ${n} ${w}.`,
    directions: "Cómo llegar", findUs: "Encuéntrenos", onGoogle: "en Google", serving: "En", book: "Reservar", visit: "Visitar",
    menuNote: "Los platos y precios pueden variar — llame o visítenos para ver los especiales del día.", gallery: "Galería", seeDiff: "Vea la diferencia",
    beforeAfter: "Antes y después", drag: "Mueva la barra. Foto de ejemplo — aquí van las fotos de sus trabajos.", how: "Cómo funciona",
    howTitle: "Fácil, de la llamada al resultado.", why: "Por qué elegirnos", whyTitle: (c: string, n: string) => `Por qué ${c} elige a ${n}`,
    about: "Quiénes somos", area: "Dónde trabajamos", areaTitle: (c: string) => `Con orgullo en ${c} y alrededores`, reviewsK: "Reseñas",
    starsOn: (r: string) => `${r} estrellas en Google`, loved: "Querido por la comunidad", from: (n: string, w: string) => `De ${n} ${w} de clientes reales.`,
    read: "Lea nuestras reseñas", via: "en", saying: "Lo que dicen nuestros clientes", faq: "Preguntas", faqTitle: "¿Preguntas? Aquí las respuestas.", menu: "Menú", services: "Servicios",
    call: "Llamar", map: "Mapa", dirShort: "Cómo llegar", text: "Envíenos un texto",
  },
} as const;

export function IndustrySite({ demo: raw, ind, banner, lang = "en", langLinks }: {
  demo: Demo; ind: Industry; banner: ReactNode; lang?: Lang; langLinks?: { en: string; es: string };
}) {
  const t = UI[lang];
  const es = lang === "es";
  ind = {
    ...ind,
    eyebrow: (es ? raw.eyebrowEs : raw.eyebrow) ?? ind.eyebrow,
    menu: (es ? raw.menuEs : raw.menu) ?? ind.menu,
    ...(es ? {} : raw.overrides),
  };
  const p = ind.palette;
  const demo = { ...raw, rating: raw.rating && /^\d$/.test(raw.rating) ? `${raw.rating}.0` : raw.rating };
  const reviewsWord = demo.reviewCount === "1" ? t.review : t.reviews;
  const quotes = (REVIEWS[raw.slug] ?? []).slice(0, 3);
  const photos = loadPhotos(ind.key);
  const videoSrc = fs.existsSync(path.join(process.cwd(), "public", "video", `${ind.key}.mp4`)) ? `/video/${ind.key}.mp4` : null;
  const HeroVideo = ({ poster }: { poster?: string }) =>
    videoSrc ? (
      <video className="hero-video absolute inset-0 h-full w-full object-cover" src={videoSrc} poster={poster}
        autoPlay muted loop playsInline preload="auto" aria-hidden />
    ) : null;
  const ph = (k: string) => photos[k];
  const gallery = ["g1", "g2", "g3", "g4", "g5"].map(ph).filter(Boolean) as Photo[];
  const ratingLine = demo.rating ? t.ratingLine(demo.rating, demo.reviewCount, reviewsWord) : "";
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${demo.name} ${demo.address}`)}`;
  const tel = demo.phone ? `tel:${demo.phone.replace(/[^\d]/g, "")}` : maps;
  const primaryLabel = demo.phone ? ind.cta : t.directions;
  const own = es && raw.servicesEs?.length ? raw.servicesEs : demo.services;
  const services = own.length ? own.map((s) => ({ ...s, icon: undefined })) : ind.services;
  const vars = {
    "--bg": p.bg, "--fg": p.fg, "--muted": p.muted, "--card": p.card, "--line": p.line,
    "--accent": p.accent, "--accentFg": p.accentFg, "--dark": p.dark, "--darkFg": p.darkFg,
    "--r": ind.radius, "--display": fontFamily(ind.font),
  } as CSSProperties;

  const H = ({ kicker, title, dark = false, center = false }: { kicker: string; title: string; dark?: boolean; center?: boolean }) => (
    <div data-reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{kicker}</p>
      <h2 className={`display mt-3 text-[2.1rem] leading-[1.05] sm:text-5xl ${dark ? "text-[var(--darkFg)]" : ""}`}>{title}</h2>
    </div>
  );
  const rail = "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-3 no-scrollbar md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0";
  const railItem = "w-[84%] shrink-0 snap-start md:w-auto";
  const btn = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[min(var(--r),999px)] px-7 text-[15px] font-bold transition active:scale-[0.98]";
  const btnMain = `${btn} bg-[var(--accent)] text-[var(--accentFg)] shadow-lg hover:brightness-110`;
  const Stars = () => (
    <span className="flex text-[#f5b301]">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" className="h-4 w-4 fill-current" />)}</span>
  );

  // ---------------- hero ----------------
  const heroText = (dark: boolean) => (
    <>
      {demo.rating ? (
        <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${dark ? "bg-white/10 text-white backdrop-blur" : "bg-[var(--card)] shadow-sm"}`}>
          <Stars /> <span data-count={demo.rating}>{demo.rating}</span> · <span data-count={demo.reviewCount.replace(/\D/g, "") || undefined}>{demo.reviewCount}</span> {reviewsWord} {t.onGoogle}
        </p>
      ) : (
        <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{ind.eyebrow}</p>
      )}
      <h1 className={`display mt-5 text-[2.9rem] leading-[0.98] sm:text-7xl ${dark ? "text-white" : ""}`}>{fill(ind.headline, demo, ratingLine)}</h1>
      <p className={`mt-5 max-w-xl text-lg leading-relaxed ${dark ? "text-white/80" : "text-[var(--muted)]"}`}>{fill(ind.sub, demo, ratingLine)}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={tel} className={btnMain}><Icon name={demo.phone ? "phone" : "pin"} className="h-[18px] w-[18px]" /> {primaryLabel}</a>
        <a href="#services" className={`${btn} border ${dark ? "border-white/30 text-white backdrop-blur hover:bg-white/10" : "border-[var(--line)] bg-[var(--card)]"}`}>{ind.cta2}</a>
      </div>
    </>
  );
  const hero = () => {
    const h = ph("hero");
    if (ind.hero === "overlay" || !h) {
      return (
        <section className="relative isolate flex min-h-[max(600px,92svh)] items-end overflow-hidden bg-[var(--dark)] sm:min-h-[720px]">
          {h && <Image src={h.src} alt={h.alt} fill priority sizes="100vw" className="kenburns -z-10 object-cover" />}
          {videoSrc && <div className="absolute inset-0 -z-10"><HeroVideo poster={h?.src} /></div>}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="hero-in mx-auto w-full max-w-6xl px-5 pb-14 pt-32 sm:pb-20">{heroText(true)}</div>
        </section>
      );
    }
    if (ind.hero === "split") {
      return (
        <section className="bg-[var(--bg)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.05fr_1fr] md:py-20">
            <div className="hero-in">{heroText(false)}</div>
            <div className="relative">
              <div className="relative aspect-[4/4.6] overflow-hidden rounded-[var(--r)] shadow-2xl">
                <Image src={h.src} alt={h.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="kenburns object-cover" />
                <HeroVideo poster={h.src} />
              </div>
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-[min(var(--r),20px)] bg-[var(--card)] px-4 py-3 shadow-xl">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] text-[var(--accentFg)]"><Icon name="pin" /></span>
                <span><span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">{t.findUs}</span><span className="block font-bold">{demo.city}</span></span>
              </div>
            </div>
          </div>
        </section>
      );
    }
    const c1 = ph("g1"), c2 = ph("g2");
    return (
      <section className="bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 md:pt-20">
          <div className="hero-in max-w-3xl">{heroText(false)}</div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-[2fr_1fr] md:grid-rows-2">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[var(--r)] md:col-span-1 md:row-span-2 md:aspect-auto">
              <Image src={h.src} alt={h.alt} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="kenburns object-cover" />
              <HeroVideo poster={h.src} />
            </div>
            {[c1, c2].filter(Boolean).map((c) => (
              <div key={c!.src} className="relative aspect-square overflow-hidden rounded-[var(--r)] md:aspect-[4/3]">
                <Image src={c!.src} alt={c!.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ---------------- sections ----------------
  const S: Record<SectionKey, () => ReactNode> = {
    trustBar: () => (
      <section className="border-y border-[var(--line)] bg-[var(--card)]">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-5 px-5 py-7 md:grid-cols-4">
          {[
            ...(demo.rating ? [{ icon: "star" as const, text: `${demo.rating}★ ${t.onGoogle}` }] : []),
            { icon: "pin" as const, text: `${t.serving} ${demo.city}` },
            ...ind.trust,
          ].slice(0, 4).map((t) => (
            <li key={t.text} className="flex items-center gap-3 text-[15px] font-semibold">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]"><Icon name={t.icon} /></span>
              {t.text}
            </li>
          ))}
        </ul>
      </section>
    ),
    services: () => (
      <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <H kicker={ind.servicesKicker} title={ind.servicesTitle} />
        {ind.servicesStyle === "list" ? (
          <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.name} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as CSSProperties} className="border-b border-[var(--line)] py-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="display text-2xl">{s.name}</h3>
                  <span className="flex-1 border-b border-dotted border-[var(--muted)]/40" />
                  <a href={tel} className="text-sm font-bold text-[var(--accent)]">{demo.phone ? t.book : t.visit}</a>
                </div>
                <p className="mt-1.5 text-[15px] text-[var(--muted)]">{s.desc}</p>
              </li>
            ))}
          </ul>
        ) : ind.servicesStyle === "photoCards" && gallery.length >= 3 ? (
          <ul className={`mt-10 ${rail} md:grid-cols-2 md:gap-5 lg:grid-cols-3`}>
            {services.map((s, i) => (
              <li key={s.name} data-reveal style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties} className={`${railItem} lift overflow-hidden rounded-[var(--r)] border border-[var(--line)] bg-[var(--card)]`}>
                <div className="relative aspect-[4/3] md:aspect-[16/10]">
                  <Image src={gallery[i % gallery.length].src} alt={gallery[i % gallery.length].alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="display text-2xl">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={`mt-10 ${rail} md:grid-cols-2 lg:grid-cols-3`}>
            {services.map((s, i) => (
              <li key={s.name} data-reveal style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties} className={`${railItem} !w-[72%] md:!w-auto lift rounded-[var(--r)] border border-[var(--line)] bg-[var(--card)] p-6`}>
                <span className="grid h-12 w-12 place-items-center rounded-[min(var(--r),14px)] bg-[var(--accent)] text-[var(--accentFg)]"><Icon name={s.icon ?? "check"} className="h-6 w-6" /></span>
                <h3 className="display mt-5 text-2xl">{s.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    ),
    menu: () =>
      ind.menu ? (
        <section id="services" className="bg-[var(--dark)] text-[var(--darkFg)]">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <H kicker={ind.servicesKicker} title={ind.servicesTitle} dark center />
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {ind.menu.map((m, i) => (
                <div key={m.section} data-reveal style={{ "--d": `${i * 120}ms` } as CSSProperties}>
                  <h3 className="display border-b border-[var(--darkFg)]/20 pb-3 text-2xl text-[var(--accent)]">{m.section}</h3>
                  <ul className="mt-4 space-y-4">
                    {m.items.map((it) => (
                      <li key={it.name}>
                        <p className="text-lg font-bold">{it.name}</p>
                        <p className="text-[15px] text-[var(--darkFg)]/65">{it.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-[var(--darkFg)]/55">{t.menuNote}</p>
          </div>
        </section>
      ) : null,
    gallery: () =>
      gallery.length ? (
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <H kicker={t.gallery} title={ind.galleryTitle} />
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 md:hidden">
            {gallery.slice(0, 5).map((g) => (
              <div key={g.src} className="relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-[var(--r)]">
                <Image src={g.src} alt={g.alt} fill sizes="80vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-10 hidden grid-cols-3 gap-3 md:grid">
            {gallery.slice(0, 5).map((g, i) => (
              <div key={g.src} data-reveal style={{ "--d": `${(i % 3) * 80}ms` } as CSSProperties} className={`relative overflow-hidden rounded-[var(--r)] ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    beforeAfter: () =>
      ph("g1") ? (
        <section className="bg-[var(--card)]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <H kicker={t.seeDiff} title={ind.beforeAfterTitle ?? t.beforeAfter} center />
            <div className="mt-10"><BeforeAfter src={ph("g1")!.src} alt={ph("g1")!.alt} /></div>
            <p className="mt-4 text-center text-sm text-[var(--muted)]">{t.drag}</p>
          </div>
        </section>
      ) : null,
    process: () =>
      ind.process ? (
        <section className="bg-[var(--dark)] text-[var(--darkFg)]">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <H kicker={t.how} title={t.howTitle} dark />
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {ind.process.map((s, i) => (
                <li key={s.t} data-reveal style={{ "--d": `${i * 120}ms` } as CSSProperties}>
                  <span className="display block text-6xl text-[var(--accent)]">0{i + 1}</span>
                  <h3 className="display mt-3 text-2xl">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--darkFg)]/70">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null,
    whyUs: () =>
      ind.whyUs ? (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          {ph("g3") && (
            <div className="relative aspect-[4/3.6] overflow-hidden rounded-[var(--r)]">
              <Image src={ph("g3")!.src} alt={ph("g3")!.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          )}
          <div>
            <H kicker={t.why} title={t.whyTitle(demo.city, demo.name)} />
            <ul className="mt-8 space-y-6">
              {ind.whyUs.map((w, i) => (
                <li key={w.t} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--accentFg)]"><Icon name={w.icon ?? "check"} /></span>
                  <span><b className="block text-lg">{w.t}</b><span className="text-[15px] text-[var(--muted)]">{w.d}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null,
    about: () => (
      <section id="about" className="bg-[var(--card)]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
          <div data-reveal className="order-2 md:order-1">
            <H kicker={t.about} title={fill(ind.aboutTitle, demo, ratingLine)} />
            <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{demo.aboutOverride ?? fill(ind.about, demo, ratingLine)}</p>
            <div className="mt-8 rounded-[min(var(--r),20px)] border border-[var(--line)] bg-[var(--bg)] p-6">
              <p className="flex items-start gap-3 font-semibold"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" /> {demo.address}</p>
              {demo.phone && <p className="mt-3 flex items-center gap-3 font-semibold"><Icon name="phone" className="h-5 w-5 text-[var(--accent)]" /> {demo.phone}</p>}
              {demo.hours.length > 0 && (
                <dl className="mt-4 space-y-1.5 border-t border-[var(--line)] pt-4 text-[15px]">
                  {demo.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4"><dt className="text-[var(--muted)]">{h.days}</dt><dd className="font-semibold">{h.time}</dd></div>
                  ))}
                </dl>
              )}
              <a href={maps} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-bold text-[var(--accent)]">{t.directions} →</a>
            </div>
          </div>
          {ph("about") && (
            <div data-reveal className="relative order-1 aspect-[4/4.4] overflow-hidden rounded-[var(--r)] md:order-2">
              <Image src={ph("about")!.src} alt={ph("about")!.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>
    ),
    serviceArea: () => (
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <H kicker={t.area} title={t.areaTitle(demo.city)} />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {[demo.city, ...NEARBY.filter((c) => c !== demo.city)].slice(0, 10).map((c) => (
            <li key={c} className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-[15px] font-semibold">{c}</li>
          ))}
        </ul>
      </section>
    ),
    reviews: () => (
      <section id="reviews" className="bg-[var(--accent)] text-[var(--accentFg)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] opacity-80">{t.reviewsK}</p>
            <p className="display mt-2 text-4xl sm:text-5xl">{demo.rating ? (() => { const [a, b] = t.starsOn("§").split("§"); return <>{a}<span data-count={demo.rating}>{demo.rating}</span>{b}</>; })() : t.loved}</p>
            {demo.rating && <p className="mt-2 text-lg opacity-85">{t.from(demo.reviewCount, reviewsWord)}</p>}
          </div>
          <a href={maps} target="_blank" rel="noopener noreferrer"
            className={`${btn} bg-[var(--accentFg)] text-[var(--accent)]`}><Stars /> {t.read}</a>
        </div>
        {quotes.length > 0 && (
          <div className="bg-[var(--bg)] text-[var(--fg)]">
            <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{t.saying}</p>
              <ul className={`mt-8 ${quotes.length > 1 ? rail : "grid"} md:gap-5 ${quotes.length > 1 ? "md:grid-cols-2" : ""} ${quotes.length > 2 ? "lg:grid-cols-3" : ""}`}>
                {quotes.map((q, i) => (
                  <li key={q.quote} data-reveal style={{ "--d": `${i * 110}ms` } as CSSProperties} className={`${quotes.length > 1 ? railItem : ""} lift flex flex-col rounded-[min(var(--r),24px)] border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm`}>
                    <Stars />
                    <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed">&ldquo;{q.quote}&rdquo;</blockquote>
                    <p className="mt-5 text-sm text-[var(--muted)]">
                      {q.name && <b className="font-bold text-[var(--fg)]">{q.name}</b>}{q.name && " · "}
                      {q.url ? <a href={q.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">{t.via} {q.source}</a> : `${t.via} ${q.source}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    ),
    faq: () => (
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <H kicker={t.faq} title={t.faqTitle} center />
        <div data-reveal className="mt-10 divide-y divide-[var(--line)] rounded-[min(var(--r),24px)] border border-[var(--line)] bg-[var(--card)] px-6">
          {ind.faq.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                {f.q}<span className="text-2xl text-[var(--accent)] transition group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    ),
    cta: () => {
      const bg = ph("g4") ?? ph("hero");
      return (
        <section className="relative isolate overflow-hidden bg-[var(--dark)]">
          {bg && <Image src={bg.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />}
          <div data-reveal className="mx-auto max-w-4xl px-5 py-20 text-center text-white md:py-28">
            <h2 className="display text-[2.3rem] leading-[1.02] sm:text-6xl">{ind.finalTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{fill(ind.finalSub, demo, ratingLine)}</p>
            <a href={tel} className={`${btnMain} mt-8`}><Icon name={demo.phone ? "phone" : "pin"} className="h-[18px] w-[18px]" /> {demo.phone ? `${ind.cta} · ${demo.phone}` : t.directions}</a>
          </div>
        </section>
      );
    },
  };

  return (
    <div style={vars} className={`${FONT_VARS} min-h-screen bg-[var(--bg)] pb-20 text-[var(--fg)] md:pb-0 [&_.display]:[font-family:var(--display)] ${ind.upper ? "[&_.display]:uppercase [&_.display]:tracking-[-0.01em]" : "[&_.display]:tracking-[-0.02em]"} [&_.display]:font-bold`}>
      <Motion />
      {banner}
      {ind.urgency && (
        <div className="bg-[var(--accent)] px-4 py-2 text-center text-[13px] font-bold text-[var(--accentFg)]">
          {ind.urgency} {demo.phone && <a href={tel} className="underline underline-offset-2">{demo.phone}</a>}
        </div>
      )}
      <header className={`${ind.hero === "overlay" ? "absolute inset-x-0 z-20 text-white" : "border-b border-[var(--line)] bg-[var(--bg)]"}`}>
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5">
          <span className="display min-w-0 truncate text-xl sm:text-2xl">{demo.name}</span>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="Site">
            <a href="#services" className="opacity-80 hover:opacity-100">{ind.menu ? t.menu : t.services}</a>
            <a href="#about" className="opacity-80 hover:opacity-100">{t.about}</a>
            <a href="#reviews" className="opacity-80 hover:opacity-100">{t.reviewsK}</a>
          </nav>
          {langLinks && (
            <a href={lang === "es" ? langLinks.en : langLinks.es} lang={lang === "es" ? "en" : "es"}
              className="ml-auto shrink-0 rounded-full border border-current/30 px-3 py-1.5 text-xs font-bold opacity-90 hover:opacity-100 md:ml-0">
              {lang === "es" ? "English" : "Español"}
            </a>
          )}
          <a href={tel} className={`${btnMain} !min-h-11 shrink-0 !px-4 !text-sm`}>
            <Icon name={demo.phone ? "phone" : "pin"} className="h-4 w-4" />
            <span className="hidden sm:inline">{demo.phone || t.dirShort}</span><span className="sm:hidden">{demo.phone ? t.call : t.map}</span>
          </a>
        </div>
      </header>
      <div data-hero className={ind.hero === "overlay" ? "relative" : ""}>{hero()}</div>
      {ind.sections.map((k) => <div key={k}>{S[k]()}</div>)}
      <footer className="bg-[var(--dark)] text-[var(--darkFg)]/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm sm:flex-row sm:justify-between">
          <p className="display text-lg text-[var(--darkFg)]">{demo.name}</p>
          <p>{demo.address}{demo.phone ? ` · ${demo.phone}` : ""}</p>
        </div>
      </footer>
      {/* app-style dock on phones — slides up once you scroll past the hero */}
      <div className="dock fixed inset-x-3 z-30 md:hidden" style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }}>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[var(--dark)]/85 p-1.5 shadow-[0_18px_50px_-12px_rgb(0_0_0/0.55)] backdrop-blur-xl">
          <a href={tel} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 text-[15px] font-bold text-[var(--accentFg)] transition active:scale-[0.97]">
            <Icon name={demo.phone ? "phone" : "pin"} className="h-[18px] w-[18px]" /> {primaryLabel}
          </a>
          {demo.phone && (
            <a href={`sms:${demo.phone.replace(/[^\d]/g, "")}`} aria-label={t.text} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-[var(--darkFg)] transition active:scale-95">
              <Icon name="chat" className="h-5 w-5" />
            </a>
          )}
          <a href={maps} target="_blank" rel="noopener noreferrer" aria-label={t.directions} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-[var(--darkFg)] transition active:scale-95">
            <Icon name="pin" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

const NEARBY = [
  "Fort Lauderdale", "Oakland Park", "Wilton Manors", "Lauderhill", "Lauderdale Lakes", "Tamarac", "North Lauderdale",
  "Sunrise", "Plantation", "Margate", "Coconut Creek", "Coral Springs", "Pompano Beach", "Davie",
];
