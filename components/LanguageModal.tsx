"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANG_KEY, localize, stripLang, type Lang } from "@/lib/i18n";
import { LogoMark } from "./Logo";

/** Asks first-time visitors "English or Español?" and remembers the answer. */
export function LanguageModal({ lang, title, subtitle }: { lang: Lang; title: string; subtitle: string }) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const firstBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch {}
    if (saved === "en" || saved === "es") {
      // Returning visitor: send them to their language if they landed on the other one.
      if (saved !== lang) window.location.replace(localize(saved, stripLang(pathname)));
      return;
    }
    setShow(true);
  }, [lang, pathname]);

  useEffect(() => {
    if (!show) return;
    firstBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && choose(lang);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  function choose(next: Lang) {
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {}
    if (next !== lang) {
      window.location.href = localize(next, stripLang(pathname));
      return;
    }
    setShow(false);
  }

  if (!show) return null;

  const browserEs = typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es");
  const order: Lang[] = browserEs || lang === "es" ? ["es", "en"] : ["en", "es"];
  const label = { en: { name: "English", hint: "Continue in English" }, es: { name: "Español", hint: "Continuar en español" } };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lang-title"
        className="w-full max-w-sm rounded-[1.75rem] bg-white p-7 text-ink shadow-[var(--shadow-lift)]"
      >
        <LogoMark className="h-11 w-11" />
        <h2 id="lang-title" className="mt-5 text-2xl font-bold tracking-tight">{title}</h2>
        <p className="mt-1.5 text-[15px] text-ink/65">{subtitle}</p>
        <div className="mt-6 grid gap-3">
          {order.map((l, i) => (
            <button
              key={l}
              ref={i === 0 ? firstBtn : undefined}
              type="button"
              lang={l}
              onClick={() => choose(l)}
              className={`flex min-h-16 items-center justify-between rounded-2xl px-5 text-left transition ${
                i === 0 ? "bg-ink text-white hover:bg-ink-3" : "border border-ink/12 bg-white hover:border-ink/30"
              }`}
            >
              <span>
                <span className="block text-lg font-bold">{label[l].name}</span>
                <span className={`block text-sm ${i === 0 ? "text-white/65" : "text-ink/60"}`}>{label[l].hint}</span>
              </span>
              <span
                aria-hidden
                className={`grid h-9 w-9 place-items-center rounded-full text-[12px] font-bold ${
                  i === 0 ? "bg-accent text-ink" : "bg-mist text-ink"
                }`}
              >
                {l.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
