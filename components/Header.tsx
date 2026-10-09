"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { LANG_KEY, localize, stripLang, type Lang } from "@/lib/i18n";
import { Logo } from "./Logo";
import { PhoneIcon } from "./Icons";

type Props = {
  lang: Lang;
  nav: { label: string; href: string }[];
  labels: { getWebsite: string; openMenu: string; closeMenu: string; switchTo: string };
};

export function Header({ lang, nav, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const other: Lang = lang === "en" ? "es" : "en";
  const switchHref = localize(other, stripLang(pathname));
  const remember = () => {
    try {
      localStorage.setItem(LANG_KEY, other);
    } catch {}
  };

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const langSwitch = (
    <a
      href={switchHref}
      onClick={remember}
      hrefLang={other}
      lang={other}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-sm font-semibold text-white/85 hover:border-white/30 hover:text-white"
    >
      <span aria-hidden className="text-[11px] font-bold tracking-wider text-accent">{other.toUpperCase()}</span>
      {labels.switchTo}
    </a>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 md:h-[72px]">
        <Link href={localize(lang, "/")} aria-label={`${site.name} home`} className="-ml-1 shrink-0 rounded-lg p-1">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                pathname === item.href ? "text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {langSwitch}
          <a href={site.phoneHref} className="flex items-center gap-2 px-1 text-[15px] font-medium text-white/80 hover:text-white">
            <PhoneIcon className="h-4 w-4 text-accent" />
            {site.phone}
          </a>
          <Link href={localize(lang, "/contact")} className="btn-accent !min-h-11 !px-5 !text-sm">
            {labels.getWebsite}
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={switchHref}
            onClick={remember}
            hrefLang={other}
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-3 text-[13px] font-bold tracking-wider text-white"
          >
            {other.toUpperCase()}
            <span className="sr-only"> {labels.switchTo}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full text-white"
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-white/[0.06] bg-ink lg:hidden">
        <nav aria-label="Mobile" className="container-x flex flex-col py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-14 items-center border-b border-white/[0.06] text-2xl font-semibold tracking-tight text-white"
            >
              {item.label}
            </Link>
          ))}
          <a href={site.phoneHref} className="mt-3 flex min-h-12 items-center gap-2 text-lg text-white/75">
            <PhoneIcon className="h-5 w-5 text-accent" /> {site.phone}
          </a>
          <div className="mt-2 pb-2">{langSwitch}</div>
        </nav>
      </div>
    </header>
  );
}
