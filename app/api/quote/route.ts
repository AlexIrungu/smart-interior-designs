import { NextResponse } from "next/server";
import { Resend } from "resend";
import { budgets, phonePattern, type QuotePayload } from "@/lib/quote";
import { services } from "@/lib/projects";
import { site } from "@/lib/site";

// No domain yet, so Resend can only send from its shared onboarding address, and only to the
// account owner's inbox. Set QUOTE_FROM_EMAIL once a domain is verified, and QUOTE_TO_EMAIL to Samson's inbox.
const FROM = process.env.QUOTE_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;
const TO = process.env.QUOTE_TO_EMAIL;

const FAILED = "We couldn't send your request. Please message us on WhatsApp instead.";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !TO) {
    console.error("Quote form not configured: RESEND_API_KEY and QUOTE_TO_EMAIL are required.");
    return NextResponse.json({ error: FAILED }, { status: 500 });
  }

  let body: QuotePayload;
  try {
    body = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Pretend success so bots don't learn to skip the field.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim() || "";
  const details = body.details?.trim();
  const location = body.location?.trim() || "Not given";
  const budget = budgets.find((b) => b === body.budget) ?? "Not given";
  const serviceTitles = services.filter((s) => body.services?.includes(s.slug)).map((s) => s.title);

  if (!name || !phone || !details) {
    return NextResponse.json({ error: "Please fill in your name, phone number and a few details about the job." }, { status: 400 });
  }
  if (!phonePattern.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address, or leave it blank." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Phone", phone],
    ["Email", email || "Not given"],
    ["Location", location],
    ["Interested in", serviceTitles.join(", ") || "Not given"],
    ["Budget", budget],
  ];

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      ...(email && { replyTo: email }),
      subject: `New quote request — ${name}`,
      html: notificationHtml(escapeHtml(name), rows.map(([k, v]) => [k, escapeHtml(v)]), escapeHtml(details).replace(/\n/g, "<br />")),
    });
    // The SDK resolves with { error } on API failures rather than throwing.
    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: FAILED }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return NextResponse.json({ error: FAILED }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function notificationHtml(name: string, rows: [string, string][], details: string) {
  const line = "border-bottom:1px solid #e9e2d7;padding:12px 0;";
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:32px;background:#f6f2ec;font-family:Helvetica,Arial,sans-serif;color:#1e1b18;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:40px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#7a5230;">New quote request</p>
    <h1 style="margin:0 0 28px;font-size:26px;line-height:1.2;">${name}</h1>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:14px;line-height:1.6;">
      ${rows.map(([k, v]) => `<tr><td style="${line}width:32%;color:#6b635a;">${k}</td><td style="${line}">${v}</td></tr>`).join("")}
    </table>
    <p style="margin:28px 0 8px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#7a5230;">About the job</p>
    <p style="margin:0;font-size:15px;line-height:1.7;">${details}</p>
  </div>
</body>
</html>`;
}
