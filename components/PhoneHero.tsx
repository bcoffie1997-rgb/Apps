"use client";
import { useEffect, useState } from "react";
import type { Copy } from "@/content/en";

const MISSED = [
  { from: "(954) 555-0142", ago: "2m" },
  { from: "(305) 555-0187", ago: "14m" },
  { from: "(754) 555-0119", ago: "31m" },
];

const TIMELINE = [0, 700, 1500, 2300, 4300, 5800]; // ms at which each stage starts
const LOOP = 10000;

export function PhoneHero({ p }: { p: Copy["hero"]["phone"] }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(5);
      return;
    }
    let timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      timers.forEach(clearTimeout);
      timers = TIMELINE.map((t, i) => setTimeout(() => setStage(i), t));
      timers.push(setTimeout(run, LOOP));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const shown = (s: number) => stage >= s;
  const missedCount = Math.min(stage, 3);
  const resolved = stage >= 4;

  return (
    <div className="relative mx-auto w-[300px] sm:w-[330px]" role="img"
      aria-label={p.ariaLabel}>
      {/* glow */}
      <div aria-hidden className={`absolute -inset-10 rounded-full blur-3xl transition-all duration-1000 ${resolved ? "bg-accent/25" : "bg-red-500/10"}`} />

      <div aria-hidden className="float relative rounded-[3.2rem] bg-gradient-to-b from-[#2a2f3c] to-[#11141b] p-[10px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className="relative h-[620px] overflow-hidden rounded-[2.6rem] bg-[radial-gradient(120%_80%_at_50%_0%,#1d2b3a_0%,#0e1219_55%,#07090d_100%)] sm:h-[640px]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-3 h-[30px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
          {/* status bar */}
          <div className="flex justify-between px-8 pt-4 text-[13px] font-semibold text-white">
            <span>{p.time}</span>
            <span className="flex items-center gap-1.5">
              <span className="flex items-end gap-[2px]">{[4, 6, 8, 10].map((h) => <span key={h} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />)}</span>
              <span className="ml-1 h-[11px] w-[22px] rounded-[3px] border border-white/60 p-[1.5px]"><span className="block h-full w-3/4 rounded-[1px] bg-white" /></span>
            </span>
          </div>

          {/* clock */}
          <div className="mt-6 text-center text-white sm:mt-8">
            <p className="text-[15px] font-medium text-white/70">{p.date}</p>
            <p className="text-[64px] font-semibold sm:text-[76px] leading-none tracking-[-0.04em]">{p.time}</p>
          </div>

          {/* notifications */}
          <div className="mt-5 space-y-2 px-3 sm:mt-6">
            <div className={`notif flex items-center justify-between px-2 pb-1 text-white ${shown(1) ? "opacity-100" : "opacity-0"}`}>
              <span className="text-[17px] font-semibold tracking-tight">
                {resolved ? p.handled : `${missedCount} ${missedCount === 1 ? p.missedCall : p.missedCalls}`}
              </span>
              <span className={`h-2 w-2 rounded-full ${resolved ? "bg-accent" : "bg-red-500"}`} />
            </div>

            {MISSED.map((m, i) => (
              <div key={m.from}
                className={`notif flex items-center gap-3 rounded-2xl bg-white/[0.12] px-3 py-2.5 backdrop-blur-md ${
                  shown(i + 1) ? (resolved ? "translate-y-0 scale-[0.97] opacity-40" : "translate-y-0 opacity-100") : "-translate-y-3 scale-95 opacity-0"
                }`}>
                <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#34c759]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between text-[13px] text-white"><b className="truncate font-semibold">{p.missedCall}</b><span className="shrink-0 pl-2 text-white/55">{m.ago}</span></span>
                  <span className="block truncate text-[13px] text-white/75">{m.from}</span>
                </span>
              </div>
            ))}

            <div className={`notif rounded-2xl bg-white/[0.14] px-3 py-2.5 backdrop-blur-md ${shown(4) ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
              <span className="flex justify-between text-[13px] text-white"><b className="font-semibold">{p.textSent}</b><span className="shrink-0 pl-2 text-white/55">{p.now}</span></span>
              <span className="mt-0.5 block text-[13px] leading-snug text-white/80">{p.textBack}</span>
            </div>

            <div className={`notif relative rounded-2xl bg-accent px-3.5 py-3 text-ink shadow-[0_10px_40px_-6px_rgba(34,229,139,0.7)] ${shown(5) ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"}`}>
              <span className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-accent">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold leading-tight tracking-tight sm:text-[16px]">{p.booked}</span>
                  <span className="block text-[13px] font-medium text-ink/70">{p.bookedDetail}</span>
                </span>
              </span>
            </div>
          </div>

          {/* home indicator */}
          <div className="absolute bottom-2 left-1/2 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  );
}
