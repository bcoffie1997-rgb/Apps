import { NextResponse } from "next/server";

/**
 * Lead destinations (set in Vercel → Settings → Environment Variables):
 *   SHEET_WEBHOOK_URL  Google Apps Script web app URL (see google-sheet-crm/README.md).
 *                      Adds a row to your Google Sheet and emails you the lead.
 *   FORM_WEBHOOK_URL   Optional. GoHighLevel (or any other) inbound webhook.
 * A lead counts as received if at least one destination accepts it.
 */
const TEXT_FIELDS = ["name", "businessName", "phone", "email", "plan", "message", "lang", "page"] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const data = Object.fromEntries(
    TEXT_FIELDS.map((k) => [k, typeof body[k] === "string" ? (body[k] as string).trim().slice(0, 2000) : ""]),
  ) as Record<(typeof TEXT_FIELDS)[number], string>;

  const emailOk = !data.email || /^\S+@\S+\.\S+$/.test(data.email);
  if (!data.name || !data.businessName || !data.phone || !emailOk) {
    return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 422 });
  }

  const [firstName, ...rest] = data.name.split(/\s+/);
  const lead = {
    ...data,
    smsConsent: body.smsConsent === true,
    first_name: firstName,
    last_name: rest.join(" "),
    full_name: data.name,
    company_name: data.businessName,
    source: "missedcallpros.com",
    submitted_at: new Date().toISOString(),
  };

  const targets = [process.env.SHEET_WEBHOOK_URL, process.env.FORM_WEBHOOK_URL].filter(Boolean) as string[];

  if (targets.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] No lead destination set — lead not forwarded:", lead);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] No lead destination configured (SHEET_WEBHOOK_URL / FORM_WEBHOOK_URL)");
    return NextResponse.json({ ok: false, error: "Form not configured" }, { status: 500 });
  }

  const results = await Promise.allSettled(
    targets.map(async (url) => {
      // Apps Script answers with a redirect after saving; treat any 2xx/3xx as success.
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        redirect: "manual",
        signal: AbortSignal.timeout(10000),
      });
      if (res.status >= 400) throw new Error(`${new URL(url).host} responded ${res.status}`);
      // A redirect to Google sign-in means the script isn't shared with "Anyone".
      if (/accounts\.google\.com|ServiceLogin/.test(res.headers.get("location") ?? "")) {
        throw new Error(`${new URL(url).host} requires sign-in — set Apps Script access to "Anyone"`);
      }
    }),
  );

  results.forEach((r) => r.status === "rejected" && console.error("[contact] destination failed:", r.reason));
  if (!results.some((r) => r.status === "fulfilled")) {
    console.error("[contact] LEAD NOT DELIVERED:", JSON.stringify(lead));
    return NextResponse.json({ ok: false, error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
