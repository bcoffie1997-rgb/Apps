"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { Logo } from "./Logo";
import { PhoneIcon } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" aria-label={`${site.name} home`} className="-ml-1 rounded-lg p-1">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                pathname === item.href ? "text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={site.phoneHref} className="flex items-center gap-2 px-2 text-[15px] font-medium text-white/80 hover:text-white">
            <PhoneIcon className="h-4 w-4 text-accent" />
            {site.phone}
          </a>
          <Link href={site.cta.primaryHref} className="btn-accent !min-h-11 !px-5 !text-sm">
            {site.cta.primary}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full text-white md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/[0.06] bg-ink md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-3">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-14 items-center border-b border-white/[0.06] text-2xl font-semibold tracking-tight text-white last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <a href={site.phoneHref} className="mt-3 flex min-h-12 items-center gap-2 text-lg text-white/75">
            <PhoneIcon className="h-5 w-5 text-accent" /> {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
