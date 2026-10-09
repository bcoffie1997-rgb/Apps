import { site } from "@/site.config";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#0B0D12" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" fill="none" stroke="#fff" strokeOpacity="0.12" />
      <path
        d="M14.2 10.5c.6 0 1.1.4 1.3.9l1.4 3.6c.2.5.1 1-.3 1.4l-1.7 1.5a13 13 0 0 0 6.2 6.2l1.5-1.7c.4-.4.9-.5 1.4-.3l3.6 1.4c.5.2.9.7.9 1.3v3.4c0 .9-.7 1.5-1.6 1.5C17.2 29.7 10.3 22.8 9.9 12.1c0-.9.6-1.6 1.5-1.6h2.8Z"
        fill="#fff"
      />
      <circle cx="28.5" cy="11.5" r="6" fill="#22E58B" />
      <path d="m25.8 11.6 1.8 1.8 3.3-3.4" fill="none" stroke="#0B0D12" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={`text-[17px] font-bold tracking-[-0.03em] ${dark ? "text-ink" : "text-white"}`}>
        {site.name}
      </span>
    </span>
  );
}
