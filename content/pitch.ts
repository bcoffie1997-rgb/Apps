/**
 * Words for the private sales walkthrough at /pitch.
 * Prices come from site.config.ts. Keep it plain: no "AI", no tech words.
 */

export type PitchPlanId = "websiteOnly" | "basic" | "growth" | "busy";

export const pitchPlans: {
  id: PitchPlanId;
  name: string;
  tagline: string;
  solves: string;
  gets: { title: string; body: string }[];
  includesPrev?: string;
  bestFor: string;
}[] = [
  {
    id: "websiteOnly",
    name: "Website Only",
    tagline: "The website, yours to take.",
    solves: "Being found, one time",
    gets: [
      { title: "Your website, built", body: "Services, hours, photos, reviews, map and a tap-to-call button. Looks great on phones." },
      { title: "The files, once paid", body: "You move it somewhere yourself within 30 days." },
    ],
    bestFor: "Owners who have someone to host and update the site for them.",
  },
  {
    id: "basic",
    name: "Basic",
    tagline: "Your website, handled.",
    solves: "Being found",
    gets: [
      { title: "Your website, built", body: "Services, hours, photos, reviews, map and a tap-to-call button. Looks great on phones." },
      { title: "Hosting and your web address", body: "We keep it online, fast and secure, and renew your web address." },
      { title: "Small changes by text", body: "Text us \"new prices\" and it's changed. You never log into anything." },
    ],
    bestFor: "Restaurants, food trucks, tight budgets, or owners who want to start small.",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Get found. Never lose a missed call.",
    solves: "Being found + being reached",
    includesPrev: "Everything in Basic, plus:",
    gets: [
      { title: "Google Business Profile", body: "How you show up on Google Maps when someone nearby searches for what you do. We set it up and keep it active." },
      { title: "Missed-call text-back", body: "Miss a call and the caller gets a text right away: \"Sorry we missed you! How can we help?\" They don't go to the shop down the street." },
      { title: "Automatic review requests", body: "Happy customers get a text asking for a Google review. Unhappy ones come to you privately so you can fix it." },
      { title: "Monthly results report", body: "Every month you see calls, messages and new reviews. You know exactly what you're paying for." },
    ],
    bestFor: "Barbers, salons, auto shops, contractors, cleaners — anyone whose hands are busy when the phone rings.",
  },
  {
    id: "busy",
    name: "Busy",
    tagline: "Your front desk, on autopilot.",
    solves: "Running on autopilot",
    includesPrev: "Everything in Growth, plus:",
    gets: [
      { title: "Online booking", body: "Customers pick a time on your website, even at midnight, and get reminders so they show up." },
      { title: "24/7 website assistant", body: "Answers hours, prices and service questions and books appointments any time. Like having someone answer your website all night." },
      { title: "8 social posts a month", body: "Your Facebook and Instagram stay active without you posting anything." },
    ],
    bestFor: "Appointment-based businesses that are already busy and want more without more work.",
  },
];

export const seoAddOn = {
  name: "Local SEO add-on",
  body: "Ongoing work to move you higher on Google Maps and search in your area. The top few spots get most of the calls. This moves you up so you show up before your competitors.",
};

/** What happens after they say yes. */
export const timeline = [
  { when: "Today", what: "Sign the agreement and put a card on file. We already built your site, so there's nothing to wait on." },
  { when: "48 hours", what: "Your website goes live on your own web address." },
  { when: "Week 1", what: "Growth & Busy: Google profile, missed-call texts and review requests are switched on." },
  { when: "Day 30", what: "Your first monthly report: calls, messages and new reviews." },
  { when: "Every month", what: "We keep it running and make your changes. You just answer the new customers." },
];

/** Recommendation by industry key (see content/industries.ts). */
export const recommend: Record<string, { plan: PitchPlanId; why: string; alt?: string }> = {
  barber: { plan: "growth", why: "Your hands are busy all day, so calls get missed — and every missed call is a cut that went to someone else.", alt: "Go Busy if most clients book appointments." },
  salon: { plan: "growth", why: "You can't pick up mid-service. Missed-call texts keep those clients, and reviews fill your chair.", alt: "Go Busy if you run on appointments." },
  braids: { plan: "busy", why: "Long appointments mean long stretches you can't answer. Online booking and deposits fill your calendar while you work.", alt: "Growth if they're not ready for booking." },
  nails: { plan: "growth", why: "Clients call while you're mid-set. A text back keeps them from booking down the street.", alt: "Go Busy if most clients book ahead." },
  tailor: { plan: "growth", why: "People search \"alterations near me\" right before an event. Show up on Maps and catch every call." },
  auto: { plan: "growth", why: "Car trouble means people call the first shop they find. High-ticket jobs — one saved call pays for the month. Reviews build trust." },
  tires: { plan: "growth", why: "Flat tire = urgent call to whoever shows up first on Maps. Miss it and it's gone." },
  detail: { plan: "growth", why: "You're out working on cars all day. Text-back and reviews turn missed calls into booked details.", alt: "Go Busy for online booking." },
  ac: { plan: "growth", why: "When the AC dies, people call until someone answers. You're on a roof — the text-back answers for you." },
  handy: { plan: "growth", why: "On job sites all day, every missed call is a lost job." },
  lawn: { plan: "growth", why: "Out on mowers all day. Missed-call texts and Google reviews win the next yard." },
  pressure: { plan: "growth", why: "Loud equipment, missed calls. The text-back saves the job; reviews and before/after photos close it." },
  carib: { plan: "basic", why: "Customers mostly want your menu, hours and location. Basic plus a strong Google profile covers it.", alt: "Growth if they want reviews coming in." },
  cafe: { plan: "basic", why: "People want your menu, hours and where to park. Basic gets that in front of them.", alt: "Growth if they want reviews coming in." },
  pet: { plan: "growth", why: "Pet owners only trust businesses with reviews. You can't answer with a dog on the table — the text-back can.", alt: "Go Busy if grooming is by appointment." },
};

export const genericRecommend = { plan: "growth" as PitchPlanId, why: "Most local businesses lose customers two ways: people can't find them, and people can't reach them. Growth fixes both." };

export const faq: { q: string; a: string }[] = [
  { q: "Can I cancel?", a: "Yes. It's month-to-month. Just give us 30 days notice before your next billing date." },
  { q: "Can I get a refund?", a: "You see exactly what you're getting before you pay — the site is already built — so all payments are final." },
  { q: "Do I own the website?", a: "Your name, photos and content are always yours. On a monthly plan we host and manage it for you. Website Only clients get the files once it's paid in full." },
  { q: "Do I own my domain?", a: "After 6 months on a plan, we'll transfer it to you if you ever leave." },
  { q: "Can you guarantee more customers?", a: "No one honest can guarantee that. What we show you is how many calls and bookings come in every month." },
  { q: "How fast is it live?", a: "48 hours after you sign." },
  { q: "Do I have to do anything?", a: "No. We set it all up. You just answer the new customers." },
  { q: "Can I change plans?", a: "Anytime. It switches on your next billing date." },
];

/** Shown only when the rep turns on "Rep notes". */
export const repNotes = {
  problem: "Ask: \"How many calls do you think you miss in a week while you're with a customer?\" Let them put the number in. Then ask what an average customer spends.",
  site: "Hand them the phone. Let them look for 5 seconds before you talk. Point at their name, their reviews, the call button.",
  plans: "Pitch Growth first. Drop to Basic only if price is the objection. Go up to Busy if they're slammed. Never promise results.",
  start: "The only approved split is $300 today and $297 at launch. Agreement signed and card on file before it goes live. Log the visit today; text the link to anyone who didn't buy.",
};
