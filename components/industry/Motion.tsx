"use client";
import { useEffect } from "react";

/** Scroll-in reveals and count-up numbers for preview sites. Content stays visible without JS. */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    const counts = document.querySelectorAll<HTMLElement>("[data-count]");
    if (!("IntersectionObserver" in window) || reduce) {
      reveal.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const countUp = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const dec = (el.dataset.count || "").includes(".") ? 1 : 0;
      const start = performance.now();
      const dur = 1400;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = dec ? v.toFixed(1) : Math.round(v).toLocaleString("en-US");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.dataset.count !== undefined) countUp(el);
          else el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveal.forEach((el) => io.observe(el));
    counts.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
