import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { FinalCta, PageHero } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Our Work — Websites for Local Businesses",
  description: "Websites we've built for barbers, salons, auto shops, restaurants, contractors and cleaners across Fort Lauderdale, Broward and Miami-Dade.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const w = site.work;
  return (
    <>
      <PageHero eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} />
      <section className="bg-white py-20 md:py-28">
        <ul className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {w.items.map((it, i) => (
            <li key={it.name} data-reveal style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties} className="group">
              <div className="overflow-hidden rounded-3xl border border-ink/[0.07] bg-mist shadow-[var(--shadow-soft)] transition-shadow duration-300 group-hover:shadow-[var(--shadow-lift)]">
                <div className="flex items-center gap-1.5 border-b border-ink/[0.06] bg-white px-4 py-3" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-ink/10" /><span className="h-2.5 w-2.5 rounded-full bg-ink/10" /><span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
                </div>
                <Image src={it.image} alt={`${it.name} website — ${it.niche} in ${it.city}`} width={800} height={600}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">{it.name}</h2>
                  <p className="text-[15px] text-ink/65">{it.city}</p>
                </div>
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-accent">{it.niche}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
