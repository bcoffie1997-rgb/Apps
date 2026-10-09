import Link from "next/link";
import { site } from "@/site.config";
import { getCopy, localize, type Lang } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer({ lang }: { lang: Lang }) {
  const t = getCopy(lang);
  const year = new Date().getFullYear();
  const link = "inline-flex min-h-10 items-center hover:text-white";
  return (
    <footer className="bg-ink pb-28 pt-16 text-white/60 md:pb-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed">{t.footer.blurb}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{t.footer.pages}</h2>
            <ul className="mt-3 space-y-1">
              {[{ label: t.ui.home, href: "/" }, ...t.nav].map((l) => (
                <li key={l.href}>
                  <Link href={localize(lang, l.href)} className={link}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{t.footer.contact}</h2>
            <ul className="mt-3 space-y-1">
              <li><a href={site.phoneHref} className={link}>{site.phone}</a></li>
              <li><a href={site.smsHref} className={link}>{t.ui.text}</a></li>
              <li><a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a></li>
              <li className="pt-2 text-[15px]">{site.city}, {site.region}</li>
              <li className="text-[15px]">{t.contact.hours}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{t.footer.legal}</h2>
            <ul className="mt-3 space-y-1">
              <li><Link href={localize(lang, "/privacy")} className={link}>{t.privacy.title}</Link></li>
              <li><Link href={localize(lang, "/terms")} className={link}>{t.terms.title}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-[13px] sm:flex-row sm:justify-between">
          <p>© {year} {site.legalName}. {t.footer.rights}</p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
