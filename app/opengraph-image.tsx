import { ImageResponse } from "next/og";
import { site } from "@/site.config";

export const alt = `${site.name} — websites for small businesses nationwide, live in 48 hours`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B0D12", padding: 72, color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#1b1f2a" />
            <path d="M14.2 10.5c.6 0 1.1.4 1.3.9l1.4 3.6c.2.5.1 1-.3 1.4l-1.7 1.5a13 13 0 0 0 6.2 6.2l1.5-1.7c.4-.4.9-.5 1.4-.3l3.6 1.4c.5.2.9.7.9 1.3v3.4c0 .9-.7 1.5-1.6 1.5C17.2 29.7 10.3 22.8 9.9 12.1c0-.9.6-1.6 1.5-1.6h2.8Z" fill="#fff" />
            <circle cx="28.5" cy="11.5" r="6" fill="#22E58B" />
            <path d="m25.8 11.6 1.8 1.8 3.3-3.4" fill="none" stroke="#0B0D12" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
            Every missed call is a customer going down the street.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#22E58B", fontWeight: 600 }}>
            Your website, built first. Live in 48 hours.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.55)" }}>
          <div>Based in Fort Lauderdale · Serving businesses nationwide</div>
          <div>{site.phone}</div>
        </div>
      </div>
    ),
    size,
  );
}
