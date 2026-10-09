import Link from "next/link";
import { site } from "@/site.config";
import { PhoneIcon } from "./Icons";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 px-3 pt-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="grid grid-cols-2 gap-2.5">
        <a href={site.phoneHref} className="btn-ghost-light !min-h-[52px] !px-3">
          <PhoneIcon className="h-[18px] w-[18px] text-accent" />
          {site.cta.call}
        </a>
        <Link href={site.cta.primaryHref} className="btn-accent !min-h-[52px] !px-3">
          {site.cta.primary}
        </Link>
      </div>
    </div>
  );
}
