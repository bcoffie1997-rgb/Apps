import { NextResponse } from "next/server";

const FIELDS = ["name", "businessName", "phone", "email", "plan", "message"] as const;

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
    FIELDS.map((k) => [k, typeof body[k] === "string" ? (body[k] as string).trim().slice(0, 2000) : ""]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!data.name || !data.businessName || !data.phone || !/^\S+@\S+\.\S+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 422 });
  }

  const webhook = process.env.FORM_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] FORM_WEBHOOK_URL not set — lead not forwarded:", data);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] FORM_WEBHOOK_URL is not configured");
    return NextResponse.json({ ok: false, error: "Form not configured" }, { status: 500 });
  }

  const [firstName, ...rest] = data.name.split(/\s+/);
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        first_name: firstName,
        last_name: rest.join(" "),
        full_name: data.name,
        company_name: data.businessName,
        source: "missedcallpros.com contact form",
        submitted_at: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] webhook failed", err);
    return NextResponse.json({ ok: false, error: "Could not send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
