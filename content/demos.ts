/**
 * SAMPLE DESIGNS + PROSPECT PREVIEWS
 *
 * samples  → fictional businesses shown on the "Sample Designs" page (/samples/<slug>).
 * previews → REAL prospects you're pitching door-to-door (/preview/<slug>).
 *            Copy a sample, change the details, push, and show the owner their site on your phone.
 *            Previews are hidden from Google.
 *
 * "style" picks the look: barber | salon | auto | restaurant | contractor | cleaning
 */

export type DemoStyle = "barber" | "salon" | "auto" | "restaurant" | "contractor" | "cleaning";

export type Demo = {
  slug: string;
  style: DemoStyle;
  niche: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  tagline: string;
  intro: string;
  cta: string; // main button, e.g. "Book Now", "Get a Free Quote"
  rating: string; // e.g. "4.9"
  reviewCount: string; // e.g. "180+"
  services: { name: string; price: string; desc: string }[];
  about: string;
  hours: { days: string; time: string }[];
  reviews: { quote: string; name: string }[];
  badges: string[];
  /** Optional hero photo, e.g. "/photos/fade-factory.jpg" (put the file in /public/photos). */
  photo?: string;
};

export const samples: Demo[] = [
  {
    slug: "fade-factory",
    style: "barber",
    niche: "Barbershop",
    name: "Fade Factory",
    city: "Fort Lauderdale",
    address: "1220 N Federal Hwy, Fort Lauderdale, FL",
    phone: "(954) 555-0142",
    tagline: "Fresh cuts. No waiting.",
    intro: "Book online in 30 seconds. Walk in looking good, walk out looking better.",
    cta: "Book a Cut",
    rating: "4.9",
    reviewCount: "320+",
    services: [
      { name: "Signature Fade", price: "$35", desc: "Skin, low, mid or high. Hot towel finish." },
      { name: "Cut + Beard", price: "$45", desc: "Full cut with beard line-up and shape." },
      { name: "Kids Cut", price: "$25", desc: "12 and under. Patient barbers, no tears." },
      { name: "Beard Trim", price: "$20", desc: "Shape, line-up and hot towel." },
      { name: "Line-Up", price: "$15", desc: "Edge-up between cuts." },
      { name: "The Works", price: "$65", desc: "Cut, beard, facial and black mask." },
    ],
    about:
      "Three chairs, zero attitude. We've been cutting on Federal Hwy since 2014. Every barber on our team has 5+ years behind the chair.",
    hours: [
      { days: "Mon–Fri", time: "9am – 8pm" },
      { days: "Saturday", time: "8am – 6pm" },
      { days: "Sunday", time: "10am – 3pm" },
    ],
    reviews: [
      { quote: "Best fade in Fort Lauderdale. Booked online, was in the chair at my exact time.", name: "Marcus T." },
      { quote: "They're great with my son. He actually asks to come back.", name: "Danielle R." },
      { quote: "Clean shop, good music, sharp lines every time.", name: "Andre P." },
    ],
    badges: ["Online booking", "Walk-ins welcome", "Se habla español"],
  },
  {
    slug: "glow-studio",
    style: "salon",
    niche: "Hair Salon",
    name: "Glow Studio",
    city: "Coral Springs",
    address: "2800 University Dr, Coral Springs, FL",
    phone: "(954) 555-0163",
    tagline: "Hair that turns heads.",
    intro: "Color, cuts and blowouts by stylists who actually listen. Book your chair today.",
    cta: "Book Appointment",
    rating: "5.0",
    reviewCount: "210+",
    services: [
      { name: "Women's Cut & Style", price: "from $65", desc: "Consultation, wash, cut and blowout." },
      { name: "Balayage", price: "from $180", desc: "Hand-painted, sun-kissed color." },
      { name: "Root Touch-Up", price: "from $85", desc: "Cover grays and refresh your color." },
      { name: "Blowout", price: "$45", desc: "Wash and smooth, bouncy finish." },
      { name: "Keratin Treatment", price: "from $250", desc: "Frizz-free for up to 4 months." },
      { name: "Bridal & Events", price: "Quote", desc: "On-site styling for your big day." },
    ],
    about:
      "Glow Studio is a women-owned salon in Coral Springs. We use clean, salon-grade products and take the time to get it right.",
    hours: [
      { days: "Tue–Fri", time: "10am – 7pm" },
      { days: "Saturday", time: "9am – 5pm" },
      { days: "Sun–Mon", time: "Closed" },
    ],
    reviews: [
      { quote: "Finally found my color person. My balayage is perfect.", name: "Jessica M." },
      { quote: "Booking online is so easy, and they text a reminder the day before.", name: "Priya K." },
      { quote: "Beautiful space, sweet staff, amazing blowouts.", name: "Carla V." },
    ],
    badges: ["Online booking", "Clean products", "Bridal parties"],
  },
  {
    slug: "krome-auto-care",
    style: "auto",
    niche: "Auto Repair",
    name: "Krome Auto Care",
    city: "Homestead",
    address: "27000 S Dixie Hwy, Homestead, FL",
    phone: "(305) 555-0187",
    tagline: "Honest repairs. Done fast.",
    intro: "ASE-certified mechanics. Free estimates. We call you before we fix anything.",
    cta: "Get a Free Estimate",
    rating: "4.8",
    reviewCount: "450+",
    services: [
      { name: "Oil Change", price: "from $39", desc: "Conventional or synthetic, with 21-point check." },
      { name: "Brakes", price: "from $149", desc: "Pads, rotors and brake fluid." },
      { name: "A/C Repair", price: "from $89", desc: "Recharge and leak check. Florida-ready." },
      { name: "Check Engine Light", price: "$49", desc: "Full diagnostic scan, explained in plain English." },
      { name: "Tires & Alignment", price: "from $79", desc: "Mount, balance and 4-wheel alignment." },
      { name: "Transmission", price: "Quote", desc: "Service, repair and rebuilds." },
    ],
    about:
      "Family-owned since 2009. We show you the old part, explain the fix and never do work you didn't approve. 12-month / 12,000-mile warranty on repairs.",
    hours: [
      { days: "Mon–Fri", time: "7:30am – 6pm" },
      { days: "Saturday", time: "8am – 2pm" },
      { days: "Sunday", time: "Closed" },
    ],
    reviews: [
      { quote: "Other shop quoted $1,200. Krome fixed it for $380 and showed me why.", name: "Luis G." },
      { quote: "My A/C was blowing hot in July. Fixed same day.", name: "Tanya W." },
      { quote: "Honest people. They text you updates so you're not waiting around.", name: "Robert C." },
    ],
    badges: ["ASE certified", "12-month warranty", "Se habla español"],
  },
  {
    slug: "calle-ocho-kitchen",
    style: "restaurant",
    niche: "Restaurant",
    name: "Calle Ocho Kitchen",
    city: "Miami",
    address: "1540 SW 8th St, Miami, FL",
    phone: "(305) 555-0121",
    tagline: "Cuban classics, made fresh.",
    intro: "Family recipes, Cuban coffee and the best media noche on Calle Ocho. Dine in, take out or order ahead.",
    cta: "Order Online",
    rating: "4.7",
    reviewCount: "1,200+",
    services: [
      { name: "Cubano", price: "$13", desc: "Roast pork, ham, swiss, pickles, mustard." },
      { name: "Ropa Vieja", price: "$18", desc: "Shredded beef, rice, black beans, maduros." },
      { name: "Lechón Asado", price: "$17", desc: "Slow-roasted pork with mojo and yuca." },
      { name: "Croquetas (6)", price: "$7", desc: "Ham croquetas, crispy and creamy." },
      { name: "Café Cubano", price: "$2", desc: "Strong, sweet, perfect." },
      { name: "Tres Leches", price: "$7", desc: "House-made every morning." },
    ],
    about:
      "Abuela's recipes since 1998. Everything is cooked fresh every morning on Calle Ocho. Catering available for parties of 10 to 200.",
    hours: [
      { days: "Mon–Thu", time: "7am – 9pm" },
      { days: "Fri–Sat", time: "7am – 11pm" },
      { days: "Sunday", time: "8am – 8pm" },
    ],
    reviews: [
      { quote: "The Cubano is the real deal. Ordered online and it was ready in 10 minutes.", name: "Miguel A." },
      { quote: "Ropa vieja tastes like my grandmother's. That says everything.", name: "Yolanda F." },
      { quote: "Catered our office party. Everyone is still talking about it.", name: "Kevin S." },
    ],
    badges: ["Order ahead", "Catering", "Se habla español"],
  },
  {
    slug: "coastline-roofing",
    style: "contractor",
    niche: "Roofing Contractor",
    name: "Coastline Roofing",
    city: "Pompano Beach",
    address: "1800 NW 15th Ave, Pompano Beach, FL",
    phone: "(954) 555-0175",
    tagline: "Roofs built for hurricane season.",
    intro: "Licensed and insured. Free inspections. Financing available. We handle the insurance paperwork.",
    cta: "Get a Free Quote",
    rating: "4.9",
    reviewCount: "260+",
    services: [
      { name: "Roof Replacement", price: "Free quote", desc: "Shingle, tile and metal. Miami-Dade code approved." },
      { name: "Roof Repair", price: "from $350", desc: "Leaks, missing tiles and storm damage." },
      { name: "Free Inspection", price: "$0", desc: "Photo report in 24 hours." },
      { name: "Insurance Claims", price: "Free", desc: "We meet the adjuster and handle the paperwork." },
      { name: "Gutters", price: "from $8/ft", desc: "Seamless aluminum gutters and guards." },
      { name: "Wind Mitigation", price: "$125", desc: "Inspection that can lower your insurance." },
    ],
    about:
      "Licensed Florida roofing contractor serving Broward and Palm Beach since 2011. Over 2,000 roofs installed. Every job is backed by a 10-year workmanship warranty.",
    hours: [
      { days: "Mon–Fri", time: "7am – 6pm" },
      { days: "Saturday", time: "8am – 12pm" },
      { days: "Emergencies", time: "24/7" },
    ],
    reviews: [
      { quote: "Handled everything with our insurance after the storm. New roof in two weeks.", name: "Brenda H." },
      { quote: "On time, cleaned up every nail. Highly recommend.", name: "Tom L." },
      { quote: "Their wind mitigation report cut our insurance by $900 a year.", name: "Ana M." },
    ],
    badges: ["Licensed & insured", "Financing", "10-year warranty"],
  },
  {
    slug: "spotless-broward",
    style: "cleaning",
    niche: "Cleaning Service",
    name: "Spotless Broward",
    city: "Plantation",
    address: "Serving all of Broward County",
    phone: "(954) 555-0198",
    tagline: "Spotless homes, every time.",
    intro: "Background-checked cleaners, eco-friendly products and a 100% happiness guarantee. Book online in 60 seconds.",
    cta: "Book a Cleaning",
    rating: "4.9",
    reviewCount: "380+",
    services: [
      { name: "Standard Clean", price: "from $120", desc: "Kitchen, bathrooms, floors and dusting." },
      { name: "Deep Clean", price: "from $220", desc: "Baseboards, inside appliances, every corner." },
      { name: "Move In / Move Out", price: "from $260", desc: "Get your deposit back." },
      { name: "Airbnb Turnover", price: "from $95", desc: "Fresh linens and restock between guests." },
      { name: "Office Cleaning", price: "Quote", desc: "Nightly or weekly, after hours." },
      { name: "Recurring Discount", price: "-15%", desc: "Weekly or every-other-week service." },
    ],
    about:
      "Local, family-run and fully insured. Same trusted cleaner every visit. If something isn't right, we come back and fix it free.",
    hours: [
      { days: "Mon–Sat", time: "8am – 6pm" },
      { days: "Sunday", time: "By request" },
    ],
    reviews: [
      { quote: "Same cleaner every two weeks and she's amazing. House has never looked better.", name: "Rachel D." },
      { quote: "Move-out clean got us our full deposit back.", name: "Chris N." },
      { quote: "Easy online booking and they text when they're on the way.", name: "Monica B." },
    ],
    badges: ["Insured", "Eco-friendly", "Happiness guarantee"],
  },
];

/**
 * REAL PROSPECTS — add one per business you visit.
 * Tip: copy the closest sample above, then change the slug, name, phone, city, services.
 * The link to show them: https://www.missedcallpros.com/preview/<slug>
 */
export const previews: Demo[] = [
  {
    ...samples[0],
    slug: "example-barbershop",
    name: "Example Barbershop",
    phone: "(954) 555-0100",
    address: "Fort Lauderdale, FL",
  },
];

export const findSample = (slug: string) => samples.find((d) => d.slug === slug);
export const findPreview = (slug: string) => previews.find((d) => d.slug === slug);
