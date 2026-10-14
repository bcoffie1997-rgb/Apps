import type { IconName } from "./types";

const P: Record<IconName, React.ReactNode> = {
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  phone: <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  wrench: <path d="M15 4a5 5 0 0 0-6 6.3L3.5 15.8a2 2 0 0 0 2.8 2.8L11.7 13A5 5 0 0 0 18 7l-2.6 2.6-2.4-.6-.6-2.4L15 4Z" />,
  snow: <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5l-14.2 11M9 4l3 2 3-2M9 20l3-2 3 2" />,
  car: <><path d="M5 16V11l2-5h10l2 5v5" /><path d="M3 16h18v3H3zM7 19v1M17 19v1" /><circle cx="7.5" cy="13" r="1" /><circle cx="16.5" cy="13" r="1" /></>,
  leaf: <><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19 14 10" /></>,
  drop: <path d="M12 3c4 5 6 8.5 6 11a6 6 0 0 1-12 0c0-2.5 2-6 6-11Z" />,
  scissors: <><circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" /><path d="M8 16 19 4M16 16 5 4" /></>,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />,
  paw: <><circle cx="7" cy="9" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="17" cy="9" r="2" /><path d="M12 12c-3.5 0-6 4-6 6.5 0 2 2 3 4 2s2-1 4 0 4 0 4-2c0-2.5-2.5-6.5-6-6.5Z" /></>,
  home: <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  chat: <path d="M4 5h16v11H9l-5 4V5Z" />,
  fork: <path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M17 21V3c-2.5 1.5-3.5 5-3.5 9H17" />,
  cup: <><path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V8Z" /><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v2M12 3v2" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8" r="1.5" /></>,
  truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />,
  gem: <><path d="M6 4h12l3 5-9 11L3 9l3-5Z" /><path d="M3 9h18M9 4l3 16 3-16" /></>,
  box: <><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" /><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" /></>,
  cake: <><path d="M4 21h16v-8H4v8ZM4 16c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1 4 0" /><path d="M12 13V9M12 6.5c-.8-.8-.8-2 0-3 .8 1 .8 2.2 0 3Z" /></>,
  candle: <><path d="M8 21h8V10H8v11Z" /><path d="M12 10V7M12 4.5c-1 1-1 2 0 2.5 1-.5 1-1.5 0-2.5Z" /></>,
  basket: <><path d="M3 10h18l-2 10H5L3 10Z" /><path d="m8 10 3-6M16 10l-3-6M9 14v3M15 14v3" /></>,
};

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {P[name]}
    </svg>
  );
}
