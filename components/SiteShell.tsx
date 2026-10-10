import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/site.config";
import { getCopy, localize, type Lang } from "@/lib/i18n";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBar } from "./MobileBar";
import { RevealObserver } from "./RevealObserver";
import { LanguageModal } from "./LanguageModal";

export const shellViewport: Viewport = {
  themeColor: "#0B0D12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function shellMetadata(lang: Lang): Metadata {
  const t = getCopy(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.seo.home.title, template: `%s | ${site.name}` },
    description: t.seo.home.description,
    keywords: t.seo.keywords,
    applicationName: site.name,
    openGraph: { type: "website", siteName: site.name, locale: lang === "es" ? "es_US" : "en_US" },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

function businessLd(lang: Lang) {
  return {
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
    description: getCopy(lang).seo.home.description,
    priceRange: "$$",
    knowsLanguage: ["en", "es"],
    address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "US" },
    areaServed: [
      { "@type": "Country", name: "United States" },
    ],
    openingHours: "Mo-Sa 08:00-19:00",
    makesOffer: site.pricing.plans.map((p) => ({
      "@type": "Offer",
      name: `${getCopy(lang).pricing.plans[p.id].name}`,
      price: p.price,
      priceCurrency: "USD",
    })),
  };
}

export function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = getCopy(lang);
  const nav = t.nav.map((n) => ({ label: n.label, href: localize(lang, n.href) }));
  return (
    <html lang={lang} className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd(lang)) }} />
      </head>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-ink">
          {t.ui.skip}
        </a>
        <Header
          lang={lang}
          nav={nav}
          labels={{ getWebsite: t.ui.getWebsite, openMenu: t.ui.openMenu, closeMenu: t.ui.closeMenu, switchTo: t.switchTo }}
        />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <MobileBar getWebsiteHref={localize(lang, "/contact")} labels={{ call: t.ui.call, text: t.ui.text, getWebsite: t.ui.getWebsite }} />
        <RevealObserver />
        <LanguageModal lang={lang} title={t.langModal.title} subtitle={t.langModal.subtitle} />
        <Analytics />
      </body>
    </html>
  );
}
