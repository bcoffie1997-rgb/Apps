"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/site.config";
import type { Copy } from "@/content/en";
import type { Lang } from "@/lib/i18n";
import { CheckIcon, PhoneIcon } from "./Icons";

const input =
  "mt-2 block min-h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 text-base text-ink shadow-[inset_0_1px_2px_rgb(11_13_18/0.04)] outline-none transition placeholder:text-ink/35 focus:border-accent focus:ring-4 focus:ring-accent/20";

type Props = {
  lang: Lang;
  c: Copy["contact"];
  privacyHref: string;
  /** Short version for the door-to-door page: name, business, phone only. */
  compact?: boolean;
  source?: string;
};

export function ContactForm({ lang, c, privacyHref, compact = false, source }: Props) {
  const f = c.form;
  const [plan, setPlan] = useState<string>(c.planOptions[0].label);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("plan");
    const match = c.planOptions.find((o) => o.id && o.id === id);
    if (match) setPlan(match.label);
  }, [c.planOptions]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(form.entries()),
      smsConsent: form.get("smsConsent") === "on",
      lang,
      page: source ?? window.location.pathname,
    };
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
      <div role="status" className="flex min-h-[360px] flex-col items-center justify-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-ink shadow-[var(--shadow-glow)]">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-3xl font-bold">{c.success.title}</h2>
        <p className="mt-3 max-w-sm text-ink/65">{c.success.body}</p>
        <a href={site.phoneHref} className="btn-dark mt-8"><PhoneIcon className="h-[18px] w-[18px] text-accent" /> {site.phone}</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
      <label className="block text-[15px] font-semibold">
        {f.name}
        <input name="name" required autoComplete="name" className={input} placeholder={f.namePh} />
      </label>
      <label className="block text-[15px] font-semibold">
        {f.business}
        <input name="businessName" required autoComplete="organization" className={input} placeholder={f.businessPh} />
      </label>
      <label className="block text-[15px] font-semibold">
        {f.phone}
        <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={input} placeholder="(954) 555-0100" />
      </label>
      {!compact && (
        <>
          <label className="block text-[15px] font-semibold">
            {f.email}
            <input name="email" type="email" required autoComplete="email" className={input} placeholder={f.emailPh} />
          </label>
          <label className="block text-[15px] font-semibold sm:col-span-2">
            {f.plan}
            <select name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}
              className={`${input} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230B0D12%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-12`}>
              {c.planOptions.map((o) => <option key={o.label}>{o.label}</option>)}
            </select>
          </label>
          <label className="block text-[15px] font-semibold sm:col-span-2">
            {f.message} <span className="font-normal text-ink/60">{f.optional}</span>
            <textarea name="message" rows={4} className={`${input} py-3`} placeholder={f.messagePh} />
          </label>
        </>
      )}

      <label className={`flex gap-3 rounded-2xl bg-mist p-4 text-[13px] leading-relaxed text-ink/70 ${compact ? "" : "sm:col-span-2"}`}>
        <input type="checkbox" name="smsConsent" className="mt-0.5 h-5 w-5 shrink-0 accent-[#0B0D12]" />
        <span>{f.consent}</span>
      </label>

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className={compact ? "" : "sm:col-span-2"}>
        <button type="submit" disabled={status === "sending"} className="btn-accent w-full disabled:opacity-60 sm:w-auto">
          {status === "sending" ? f.sending : f.submit}
        </button>
        <p className="mt-3 text-[13px] text-ink/60">
          {f.privacyNote} <Link href={privacyHref} className="underline underline-offset-2">{f.privacyLink}</Link>
        </p>
        {status === "error" && (
          <p role="alert" className="mt-4 text-[15px] font-medium text-red-700">
            {c.error} <a href={site.phoneHref} className="underline">{site.phone}</a>
          </p>
        )}
      </div>
    </form>
  );
}
