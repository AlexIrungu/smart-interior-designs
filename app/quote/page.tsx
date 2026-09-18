import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "@/components/QuoteForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { services } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a quote",
  description: `Request a quote for a custom kitchen, wardrobe or TV wall from ${site.name}.`,
};

export default function QuotePage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-12 md:px-6 md:py-16">
      <div className="md:col-span-5">
        <h1 className="font-serif text-4xl md:text-5xl">Get a quote</h1>
        <p className="mt-6 text-lg text-muted">
          The fastest way is WhatsApp — send a photo of the room and rough measurements, and {site.owner} will get back to you.
        </p>
        <WhatsAppButton className="mt-6" />
        {site.phone && (
          <p className="mt-6 text-muted">
            Or call{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-medium text-ink underline">
              {site.phone}
            </a>
          </p>
        )}
      </div>
      <div className="rounded-sm bg-stone p-6 md:col-span-7 md:p-10">
        <p className="mb-6 text-sm text-muted">Prefer a form? Fill this in and we&apos;ll call you back.</p>
        <Suspense>
          <QuoteForm serviceOptions={services.map(({ slug, title }) => ({ slug, title }))} />
        </Suspense>
      </div>
    </section>
  );
}
