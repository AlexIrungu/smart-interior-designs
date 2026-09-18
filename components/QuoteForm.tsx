"use client";

import { useState } from "react";
import { budgets, type QuotePayload } from "@/lib/quote";
import WhatsAppButton from "./WhatsAppButton";

type Status = "idle" | "submitting" | "success" | "error";

const field = "mt-2 w-full rounded-sm border border-ink/20 bg-white px-4 py-3 outline-none transition-colors focus:border-oak-deep";
const label = "block text-sm font-medium";

export default function QuoteForm({
  serviceOptions,
  defaultService,
}: {
  serviceOptions: { slug: string; title: string }[];
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const data = new FormData(event.currentTarget);
    const payload: QuotePayload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      location: String(data.get("location") ?? ""),
      services: data.getAll("services").map(String),
      budget: String(data.get("budget") ?? ""),
      details: String(data.get("details") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-sm bg-white p-8">
        <h2 className="font-serif text-2xl">Thanks — your request is in.</h2>
        <p className="mt-3 text-muted">We&apos;ll call or WhatsApp you on the number you gave. If you have photos of the room, send them on WhatsApp now — it helps us quote faster.</p>
        <WhatsAppButton className="mt-6" label="Send photos on WhatsApp" message="Hi, I just sent a quote request on your website. Here are photos of the room:" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={label}>
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className={label}>
          Phone / WhatsApp
          <input name="phone" type="tel" required autoComplete="tel" placeholder="07XX XXX XXX" className={field} />
        </label>
        <label className={label}>
          Email <span className="font-normal text-muted">(optional)</span>
          <input name="email" type="email" autoComplete="email" className={field} />
        </label>
        <label className={label}>
          Area / estate
          <input name="location" placeholder="e.g. Kilimani" className={field} />
        </label>
      </div>

      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {serviceOptions.map((s) => (
            <label key={s.slug} className="cursor-pointer">
              <input type="checkbox" name="services" value={s.slug} defaultChecked={s.slug === defaultService} className="peer sr-only" />
              <span className="inline-block rounded-full border border-ink/20 px-4 py-2 text-sm transition-colors peer-checked:border-oak-deep peer-checked:bg-oak-deep peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-oak-deep">
                {s.title}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={label}>
        Budget <span className="font-normal text-muted">(optional)</span>
        <select name="budget" defaultValue="" className={field}>
          <option value="">Choose a range</option>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>

      <label className={label}>
        About the job
        <textarea name="details" required rows={5} placeholder="Room size, the style you like, when you'd want it done…" className={field} />
      </label>

      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" />

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="justify-self-start rounded-full bg-ink px-8 py-3 font-medium text-paper transition-colors hover:bg-oak-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
