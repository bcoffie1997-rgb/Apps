type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  viewBox: "0 0 24 24",
};

export const PhoneIcon = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
export const ArrowIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const CheckIcon = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} strokeWidth={2.4} className={className}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const MessageIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 10h8M8 13h5" /></svg>
);
export const StarIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>
);
export const ChatIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth={2.6} /></svg>
);
export const CalendarIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}><rect x="3.5" y="5" width="17" height="15" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4" /></svg>
);
export const ChartIcon = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}><path d="M4 20V4M4 20h16" /><path d="m7 15 4-4 3 3 5-6" /></svg>
);
export const PinIcon = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
);
export const MailIcon = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
);
export const PlusIcon = ({ className = "h-5 w-5" }: P) => (
  <svg {...base} className={className}><path d="M12 5v14M5 12h14" /></svg>
);

export const featureIcons = {
  message: MessageIcon,
  star: StarIcon,
  chat: ChatIcon,
  calendar: CalendarIcon,
  chart: ChartIcon,
} as const;
