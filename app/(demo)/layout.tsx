import "../globals.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/site.config";

export const metadata: Metadata = { metadataBase: new URL(site.url) };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
