import type { Metadata } from "next";
import { site } from "@/site.config";
import { PageHero } from "@/components/Sections";
import { ContactForm } from "@/components/ContactForm";
import { ServiceMap } from "@/components/ServiceMap";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact — Get Your Website Built",
  description: `Call ${site.phone} or send your business name. We'll build your website first and launch it in 48 hours. Serving Fort Lauderdale, Broward and Miami-Dade.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <section className="bg-mist pb-20 md:pb-28">
        <div className="container-x -mt-8 grid gap-6 md:-mt-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="card relative p-6 sm:p-10">
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-4">
            <a href={site.phoneHref} className="group relative overflow-hidden rounded-3xl bg-ink p-7 text-white">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
              <PhoneIcon className="relative h-7 w-7 text-accent" />
              <p className="relative mt-5 text-sm text-white/55">Tap to call</p>
              <p className="relative text-3xl font-bold tracking-tight">{site.phone}</p>
              <p className="relative mt-1 text-sm text-white/55">{site.hours}</p>
            </a>
            <a href={`mailto:${site.email}`} className="card flex min-h-16 items-center gap-4 p-6 hover:border-ink/20">
              <MailIcon className="h-6 w-6 shrink-0 text-accent-700" />
              <span className="break-all font-semibold">{site.email}</span>
            </a>
            <div className="card overflow-hidden">
              <ServiceMap />
              <div className="p-6">
                <p className="flex items-center gap-2 font-semibold"><PinIcon className="h-5 w-5 text-accent-700" /> Service area</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/60">
                  {site.counties.join(" & ")} — including {site.serviceAreas.slice(0, 8).join(", ")} and more.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
