/**
 * ============================================================
 *  MISSED CALL PROS — SITE CONFIG
 *  Edit text, prices, phone and email here. No component edits needed.
 * ============================================================
 */

export const site = {
  // ---------- Business ----------
  name: "Missed Call Pros",
  legalName: "Coffie Media LLC d/b/a Missed Call Pros",
  url: "https://missedcallpros.com",
  phone: "(754) 281-0014",
  phoneHref: "tel:+17542810014",
  email: "hello@missedcallpros.com", // TODO: replace with your real email
  city: "Fort Lauderdale",
  region: "FL",
  regionName: "South Florida",
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
  hours: "Mon–Sat, 8am–7pm",

  // ---------- SEO ----------
  seo: {
    defaultTitle: "Missed Call Pros | Small Business Websites in Fort Lauderdale & South Florida",
    titleTemplate: "%s | Missed Call Pros",
    description:
      "We build your small business website before you ask and launch it in 48 hours. Web design for barbers, salons, auto shops, restaurants and contractors in Fort Lauderdale, Broward and Miami-Dade.",
    keywords: [
      "web design Fort Lauderdale",
      "small business website Broward",
      "website design Miami-Dade",
      "South Florida web design",
      "website for barbershop",
      "website for auto shop",
      "website for contractors",
      "missed call text back",
      "local web agency Fort Lauderdale",
    ],
  },

  // ---------- Navigation ----------
  nav: [
    { label: "Pricing", href: "/pricing" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta: {
    primary: "Get My Website",
    primaryHref: "/contact",
    call: "Call Now",
  },

  // ---------- Home ----------
  hero: {
    eyebrow: "Fort Lauderdale · Broward · Miami-Dade",
    title: "Every missed call is a customer going down the street.",
    subtitle: "We build your website before you ask — live in 48 hours.",
    trust: ["See it before you pay", "Live in 48 hours", "Month-to-month"],
    phone: {
      time: "9:41",
      date: "Tuesday, March 12",
      missed: [
        { from: "(954) 555-0142", ago: "2m ago" },
        { from: "(305) 555-0187", ago: "14m ago" },
        { from: "(754) 555-0119", ago: "31m ago" },
      ],
      textBack: "Sorry we missed you! Want to book? Tap here →",
      booked: "New customer booked ✓",
      bookedDetail: "Haircut + beard · Thu 10:30 AM",
    },
  },

  stats: {
    title: "The problem nobody tells you about",
    items: [
      { value: "62%", label: "of calls to small businesses go unanswered" },
      { value: "85%", label: "of people who can't reach you won't call back" },
      { value: "97%", label: "of customers search Google before they buy local" },
      { value: "0", label: "customers find you if you have no website" },
    ],
    footnote: "Industry estimates. Your numbers may vary.",
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "No meetings. No tech talk. Just a website that works.",
    steps: [
      {
        title: "We build it",
        body: "We find your business, gather your photos, reviews and services, and build your website first. You don't lift a finger.",
      },
      {
        title: "You see it",
        body: "We show it to you in person or on your phone. Love it? Great. Want changes? We make them. No pressure.",
      },
      {
        title: "It's live in 48 hours",
        body: "Say yes and your site is on Google within 48 hours, on your own domain, ready for customers.",
      },
    ],
  },

  features: {
    eyebrow: "Runs automatically",
    title: "Your website works while you work.",
    subtitle: "You're busy with customers. We set it up once, and it handles the rest.",
    items: [
      {
        icon: "message",
        title: "Missed-call text-back",
        body: "Can't pick up? We text them back instantly so they book with you — not the shop down the street.",
      },
      {
        icon: "star",
        title: "Review requests",
        body: "After every job, happy customers get a friendly text asking for a Google review. More stars, more calls.",
      },
      {
        icon: "chat",
        title: "24/7 website assistant",
        body: "Answers questions about your hours, prices and services day and night — and grabs their number for you.",
      },
      {
        icon: "calendar",
        title: "Online booking",
        body: "Customers pick a time that works and it lands on your calendar. No back-and-forth.",
      },
      {
        icon: "chart",
        title: "Monthly results report",
        body: "One simple report each month: calls, texts, bookings and reviews. Plain numbers, no jargon.",
      },
    ],
  },

  testimonials: {
    // TODO: Replace with REAL customer reviews before launch. Set enabled: false to hide.
    enabled: true,
    eyebrow: "Local owners",
    title: "Small business owners, not tech people.",
    items: [
      {
        quote:
          "They showed me my website before I paid a dime. It was live two days later and I'm getting calls from people who found me on Google.",
        name: "Owner Name",
        business: "Barbershop · Fort Lauderdale",
      },
      {
        quote:
          "I used to miss calls all day under a car. Now every missed call gets a text back and half of them book. That's real money.",
        name: "Owner Name",
        business: "Auto Repair · Hollywood",
      },
      {
        quote:
          "Our reviews went from 11 to over 60. I don't do anything — it just happens after every job.",
        name: "Owner Name",
        business: "Cleaning Service · Miami",
      },
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Straight answers.",
    items: [
      {
        q: "Do I really see the website before I pay?",
        a: "Yes. We build it first and show it to you. If you don't love it, you don't pay. Simple.",
      },
      {
        q: "How fast can it be live?",
        a: "48 hours after you say yes. We handle the domain, hosting and getting it on Google.",
      },
      {
        q: "I'm not a tech person. Do I have to do anything?",
        a: "No. We handle everything. If you want a change, just call or text us and we do it.",
      },
      {
        q: "Is there a contract?",
        a: "No long contract. Plans are month-to-month. Cancel any time with 30 days notice.",
      },
      {
        q: "What is missed-call text-back?",
        a: "When you can't answer, the caller instantly gets a text from your business number so they don't call someone else. It's automatic.",
      },
      {
        q: "Do you work with my type of business?",
        a: "We work with barbers, salons, auto shops, restaurants, contractors, cleaners and most local service businesses in South Florida.",
      },
      {
        q: "Will you meet with me in person?",
        a: "Yes. We're local to Fort Lauderdale and happy to meet face-to-face anywhere in Broward or Miami-Dade.",
      },
    ],
  },

  finalCta: {
    title: "Your website might already be built.",
    subtitle: "Call or send us your business name. We'll show you what we made — no cost, no pressure.",
  },

  // ---------- Pricing ----------
  pricing: {
    eyebrow: "Pricing",
    title: "Simple pricing. No surprises.",
    subtitle: "Pick a plan. Change or cancel any time.",
    setupFee: 597,
    setupLabel: "one-time setup on all plans",
    note: "All plans are month-to-month. Cancel with 30 days notice.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: 147,
        tagline: "Get found online.",
        popular: false,
        features: ["Custom website", "Hosting included", "Domain included", "Small edits anytime"],
      },
      {
        id: "growth",
        name: "Growth",
        price: 497,
        tagline: "Stop losing customers.",
        popular: true,
        includesFrom: "Everything in Basic, plus:",
        features: [
          "Google Business Profile setup",
          "Missed-call text-back",
          "Automatic review requests",
          "Monthly results report",
        ],
      },
      {
        id: "busy",
        name: "Busy",
        price: 997,
        tagline: "We run it all.",
        popular: false,
        includesFrom: "Everything in Growth, plus:",
        features: ["Online booking", "24/7 website assistant", "8 social posts per month"],
      },
    ],
    addOns: [
      {
        id: "seo",
        name: "Local SEO",
        price: 497,
        period: "/mo",
        body: "Rank higher on Google Maps and local search in your neighborhood. Add to any plan.",
      },
    ],
    websiteOnly: {
      id: "website-only",
      name: "Website Only",
      price: 597,
      body: "Just the website, one-time. No monthly plan. You handle hosting and updates.",
    },
  },

  // ---------- Work ----------
  work: {
    eyebrow: "Our work",
    title: "Built for the businesses that keep South Florida running.",
    subtitle: "A sample of sites by industry. Swap these images in /public/work.",
    items: [
      { niche: "Barbershop", name: "Fade Factory", city: "Fort Lauderdale", image: "/work/barber.svg" },
      { niche: "Hair Salon", name: "Glow Studio", city: "Coral Springs", image: "/work/salon.svg" },
      { niche: "Auto Repair", name: "Krome Auto Care", city: "Homestead", image: "/work/auto.svg" },
      { niche: "Restaurant", name: "Calle Ocho Kitchen", city: "Miami", image: "/work/restaurant.svg" },
      { niche: "Contractor", name: "Coastline Roofing", city: "Pompano Beach", image: "/work/contractor.svg" },
      { niche: "Cleaning", name: "Spotless Broward", city: "Plantation", image: "/work/cleaning.svg" },
    ],
  },

  // ---------- About ----------
  about: {
    eyebrow: "About",
    title: "Local. Face-to-face. We show you first.",
    intro:
      "Missed Call Pros is a Fort Lauderdale web studio built for the owners who are too busy working to think about a website. We don't send you a proposal. We send you your website.",
    values: [
      {
        title: "We're local",
        body: "Based in Fort Lauderdale. We serve Broward and Miami-Dade, and we'll come to your shop.",
      },
      {
        title: "Face-to-face",
        body: "Real people, real handshakes. You'll always know who to call — and we pick up.",
      },
      {
        title: "You see it before you pay",
        body: "We build your site first. If it's not right, you don't pay. That's the deal.",
      },
    ],
    story:
      "We kept seeing the same thing: great local businesses with five-star work and no website. Customers searched, found nothing, and called someone else. So we started building the sites first and showing owners what they were missing. Then we made sure they'd never lose another customer to a missed call.",
  },

  // ---------- Contact ----------
  contact: {
    eyebrow: "Contact",
    title: "Let's build your website.",
    subtitle: "Tell us about your business. We'll reach out within one business day — usually the same day.",
    planOptions: ["Not sure yet", "Basic — $147/mo", "Growth — $497/mo", "Busy — $997/mo", "Website Only — $597", "Local SEO add-on"],
    success: {
      title: "Got it. We'll be in touch.",
      body: "We'll reach out within one business day. Need us sooner? Give us a call.",
    },
    error: "Something went wrong. Please call us or try again.",
  },
} as const;

export type Site = typeof site;
