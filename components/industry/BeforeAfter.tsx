"use client";
import Image from "next/image";
import { useState } from "react";

/** Drag to compare. The "before" side is the same photo, dulled — an illustration for previews. */
export function BeforeAfter({ src, alt }: { src: string; alt: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[var(--r)] shadow-2xl">
      <Image src={src} alt={`${alt} — after`} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={src} alt={`${alt} — before`} fill sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover [filter:sepia(.55)_saturate(.45)_brightness(.62)_contrast(.9)]" />
      </div>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
        <div className="absolute top-1/2 -ml-6 -mt-6 grid h-12 w-12 place-items-center rounded-full bg-white text-[#111] shadow-xl">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="m9 6-6 6 6 6M15 6l6 6-6 6" /></svg>
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Before</span>
      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#111]">After</span>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}
