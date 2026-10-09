import type { Metadata } from "next";
import { previews } from "@/content/demos";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = { title: "Prospect Previews — Missed Call Pros", robots: { index: false, follow: false } };

/** Private list for the sales team: every prospect preview, grouped by city. */
export default function PreviewIndex() {
  const byCity = new Map<string, typeof previews>();
  [...previews].sort((a, b) => a.name.localeCompare(b.name)).forEach((p) => {
    byCity.set(p.city, [...(byCity.get(p.city) ?? []), p]);
  });
  const cities = [...byCity.keys()].sort();
  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 pb-16 pt-8 text-[#0b0d12]">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prospect previews</h1>
            <p className="text-[15px] text-[#0b0d12]/60">{previews.length} sites · tap one to open it on your phone</p>
          </div>
        </div>
        {cities.map((city) => (
          <section key={city} className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#067a45]">{city} · {byCity.get(city)!.length}</h2>
            <ul className="mt-3 divide-y divide-[#0b0d12]/[0.07] overflow-hidden rounded-2xl border border-[#0b0d12]/[0.07] bg-white">
              {byCity.get(city)!.map((p) => (
                <li key={p.slug}>
                  <a href={`/preview/${p.slug}`} className="flex min-h-14 items-center justify-between gap-3 px-4 py-3 hover:bg-[#f5f6f8]">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{p.name}</span>
                      <span className="block truncate text-sm text-[#0b0d12]/60">{p.niche}{p.phone ? ` · ${p.phone}` : " · no phone listed"}</span>
                    </span>
                    <span aria-hidden className="shrink-0 text-[#0b0d12]/40">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
