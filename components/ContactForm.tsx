"use client";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/site.config";
import { CheckIcon, PhoneIcon } from "./Icons";

const planFromId: Record<string, string> = {
  basic: site.contact.planOptions[1],
  growth: site.contact.planOptions[2],
  busy: site.contact.planOptions[3],
  "website-only": site.contact.planOptions[4],
};

const input =
  "mt-2 block min-h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 text-base text-ink shadow-[inset_0_1px_2px_rgb(11_13_18/0.04)] outline-none transition placeholder:text-ink/35 focus:border-accent focus:ring-4 focus:ring-accent/20";

export function ContactForm() {
  const [plan, setPlan] = useState<string>(site.contact.planOptions[0]);
  useEffect(() => {
    const fromUrl = planFromId[new URLSearchParams(window.location.search).get("plan") ?? ""];
    if (fromUrl) setPlan(fromUrl);
  }, []);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-ink shadow-[var(--shadow-glow)]">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-3xl font-bold">{site.contact.success.title}</h2>
        <p className="mt-3 max-w-sm text-ink/60">{site.contact.success.body}</p>
        <a href={site.phoneHref} className="btn-dark mt-8"><PhoneIcon className="h-[18px] w-[18px] text-accent" /> {site.phone}</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <label className="block text-[15px] font-semibold">
        Your name
        <input name="name" required autoComplete="name" className={input} placeholder="Jane Smith" />
      </label>
      <label className="block text-[15px] font-semibold">
        Business name
        <input name="businessName" required autoComplete="organization" className={input} placeholder="Jane's Barbershop" />
      </label>
      <label className="block text-[15px] font-semibold">
        Phone
        <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={input} placeholder="(954) 555-0100" />
      </label>
      <label className="block text-[15px] font-semibold">
        Email
        <input name="email" type="email" required autoComplete="email" className={input} placeholder="you@business.com" />
      </label>
      <label className="block text-[15px] font-semibold sm:col-span-2">
        Plan you&apos;re interested in
        <select name="plan" value={plan} onChange={(e) => setPlan(e.target.value)} className={`${input} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230B0D12%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12`}>
          {site.contact.planOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block text-[15px] font-semibold sm:col-span-2">
        Message <span className="font-normal text-ink/65">(optional)</span>
        <textarea name="message" rows={4} className={`${input} py-3`} placeholder="Tell us about your business…" />
      </label>
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-accent w-full disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Sending…" : "Send — Get My Website"}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-4 text-[15px] font-medium text-red-600">
            {site.contact.error} <a href={site.phoneHref} className="underline">{site.phone}</a>
          </p>
        )}
      </div>
    </form>
  );
}
