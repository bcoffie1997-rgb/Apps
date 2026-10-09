// Schematic map of the service area. Positions are approximate, for illustration only.
const CITIES: [string, number, number, boolean?][] = [
  ["Coral Springs", 96, 42],
  ["Pompano Beach", 214, 52],
  ["Plantation", 132, 78],
  ["Fort Lauderdale", 214, 96, true],
  ["Davie", 140, 120],
  ["Pembroke Pines", 120, 150],
  ["Hollywood", 204, 146],
  ["Miami Gardens", 168, 182],
  ["Hialeah", 150, 210],
  ["Doral", 110, 232],
  ["Miami", 186, 246, true],
  ["Homestead", 98, 332],
];

export function ServiceMap({ label, openLabel }: { label: string; openLabel: string }) {
  return (
    <div className="relative bg-ink">
      <svg viewBox="0 0 300 360" className="block h-80 w-full" role="img" aria-label={label}>
        <defs>
          <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#ffffff" opacity="0.07" />
          </pattern>
        </defs>
        <rect width="300" height="360" fill="url(#dots)" />
        <path d="M238 0 L300 0 L300 360 L170 360 C176 330 196 300 206 270 C214 248 222 226 226 196 C232 160 236 120 238 60 Z" fill="#22E58B" opacity="0.05" />
        <path d="M20 18 L238 18 C237 60 235 110 231 160 L20 160 Z" fill="#22E58B" fillOpacity="0.16" stroke="#22E58B" strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M20 160 L231 160 C228 196 222 226 212 252 C200 284 182 310 172 344 L20 344 Z" fill="#22E58B" fillOpacity="0.09" stroke="#22E58B" strokeOpacity="0.4" strokeWidth="1.2" />
        <text x="30" y="34" fill="#fff" opacity="0.55" fontSize="9" fontWeight="700" letterSpacing="1.5">BROWARD</text>
        <text x="30" y="176" fill="#fff" opacity="0.55" fontSize="9" fontWeight="700" letterSpacing="1.5">MIAMI-DADE</text>
        <text x="262" y="200" fill="#fff" opacity="0.3" fontSize="8" fontWeight="600" letterSpacing="1.5" transform="rotate(90 262 200)">ATLANTIC OCEAN</text>
        {CITIES.map(([name, x, y, hq]) => (
          <g key={name}>
            {hq && <circle cx={x} cy={y} r="9" fill="#22E58B" opacity="0.2" />}
            <circle cx={x} cy={y} r={hq ? 4.5 : 3} fill={hq ? "#22E58B" : "#fff"} />
            <text x={x - 7} y={y + 3} textAnchor="end" fill="#fff" opacity={hq ? 0.95 : 0.7} fontSize={hq ? 10 : 8.5} fontWeight={hq ? 700 : 500}>{name}</text>
          </g>
        ))}
      </svg>
      <a href="https://www.google.com/maps/place/Broward+County,+FL" target="_blank" rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20">
        {openLabel}
      </a>
    </div>
  );
}
