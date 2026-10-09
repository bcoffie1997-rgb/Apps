import Link from "next/link";
import { site } from "@/site.config";
import { MessageIcon, PhoneIcon } from "./Icons";

type Props = { getWebsiteHref: string; labels: { call: string; text: string; getWebsite: string } };

export function MobileBar({ getWebsiteHref, labels }: Props) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 px-3 pt-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-[1fr_1fr_1.35fr] gap-2">
        <a href={site.phoneHref} className="btn-ghost-light !min-h-[52px] !gap-1.5 !px-2 !text-[14px]">
          <PhoneIcon className="h-[18px] w-[18px] shrink-0 text-accent" />
          {labels.call}
        </a>
        <a href={site.smsHref} className="btn-ghost-light !min-h-[52px] !gap-1.5 !px-2 !text-[14px]">
          <MessageIcon className="h-[18px] w-[18px] shrink-0 text-accent" />
          {labels.text}
        </a>
        <Link href={getWebsiteHref} className="btn-accent !min-h-[52px] !px-2 !text-[14px]">
          {labels.getWebsite}
        </Link>
      </div>
    </div>
  );
}
