import { site } from "@/site.config";
import { en } from "@/content/en";
import { es } from "@/content/es";
import { LogoMark } from "./Logo";

/** Thin bar on top of every sample/preview site so it's always clear who built it. */
export function DemoBanner({ previewFor }: { previewFor?: string }) {
  const b = en.demoBanner;
  const bEs = es.demoBanner;
  return (
    <div className="sticky top-0 z-40 bg-[#0B0D12] text-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="mx-auto flex min-h-12 max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <a href="/" className="flex min-w-0 items-center gap-2.5">
          <LogoMark className="h-7 w-7 shrink-0" />
          <span className="min-w-0 text-[11.5px] leading-tight sm:text-[13px]">
            {previewFor ? (
              <>
                <b className="block font-semibold">{b.preview} {previewFor}</b>
                <span className="hidden text-white/60 sm:block">{b.by} · {bEs.preview} {previewFor}</span>
              </>
            ) : (
              <>
                <b className="block font-semibold">{b.sample}</b>
                <span className="block text-white/60">{bEs.sample}</span>
              </>
            )}
          </span>
        </a>
        <a
          href={previewFor ? site.phoneHref : "/contact"}
          className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-[#22E58B] px-3.5 text-[12.5px] font-bold text-[#0B0D12] sm:px-4 sm:text-[13px]"
        >
          {previewFor ? b.previewCta : b.cta}
        </a>
      </div>
    </div>
  );
}
