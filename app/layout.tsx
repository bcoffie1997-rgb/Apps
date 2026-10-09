import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { site } from "@/site.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.seo.defaultTitle,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image", title: site.seo.defaultTitle, description: site.seo.description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/icon.svg`,
  description: site.seo.description,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "US",
  },
  areaServed: [
    ...site.counties.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, FL` })),
    ...site.serviceAreas.map((name) => ({ "@type": "City", name: `${name}, FL` })),
  ],
  openingHours: "Mo-Sa 08:00-19:00",
  makesOffer: site.pricing.plans.map((p) => ({
    "@type": "Offer",
    name: `${p.name} plan`,
    price: p.price,
    priceCurrency: "USD",
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-ink">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <RevealObserver />
      </body>
    </html>
  );
}
