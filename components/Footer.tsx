import Link from "next/link";
import { site } from "@/site.config";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-28 pt-16 text-white/60 md:pb-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed">
              Websites for local businesses in {site.counties.join(" & ")}. Built first. Live in 48 hours.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Pages</h2>
            <ul className="mt-3 space-y-1">
              {[{ label: "Home", href: "/" }, ...site.nav].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <ul className="mt-3 space-y-1">
              <li><a href={site.phoneHref} className="inline-flex min-h-10 items-center hover:text-white">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="inline-flex min-h-10 items-center break-all hover:text-white">{site.email}</a></li>
              <li className="pt-2 text-[15px]">{site.city}, {site.region}</li>
              <li className="text-[15px]">{site.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-[13px] sm:flex-row sm:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p>Web design · Fort Lauderdale · Broward · Miami-Dade</p>
        </div>
      </div>
    </footer>
  );
}
