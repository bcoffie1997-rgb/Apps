/**
 * ============================================================
 *  MISSED CALL PROS — BUSINESS INFO & PRICES
 *  Phone, email, service area and prices live here.
 *  Words on the site live in /content/en.ts (English) and /content/es.ts (Spanish).
 *  Sample designs and prospect previews live in /content/demos.ts.
 * ============================================================
 */

export const site = {
  name: "Missed Call Pros",
  legalName: "Coffie Media LLC d/b/a Missed Call Pros",
  url: "https://www.missedcallpros.com",
  phone: "(754) 281-0014",
  phoneHref: "tel:+17542810014",
  smsHref: "sms:+17542810014",
  email: "hello@missedcallpros.com", // TODO: replace with your real email
  city: "Fort Lauderdale",
  region: "FL",
  serviceAreas: [
    "Fort Lauderdale",
    "Hollywood",
    "Pembroke Pines",
    "Miramar",
    "Coral Springs",
    "Pompano Beach",
    "Plantation",
    "Davie",
    "Sunrise",
    "Miami",
    "Hialeah",
    "Miami Gardens",
    "Homestead",
    "Doral",
  ],
  counties: ["Broward County", "Miami-Dade County"],

  // Prices (shared by English and Spanish pages)
  pricing: {
    setupFee: 597,
    plans: [
      { id: "basic", price: 147, popular: false },
      { id: "growth", price: 497, popular: true },
      { id: "busy", price: 997, popular: false },
    ],
    seoAddOn: 497,
    websiteOnly: 597,
  },
} as const;

export type PlanId = (typeof site.pricing.plans)[number]["id"];
