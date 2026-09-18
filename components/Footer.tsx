import Link from "next/link";
import { site } from "@/lib/site";
import { nav } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-serif text-xl">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <p>{site.location}</p>
          {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-ink">{site.phone}</a>}
          {site.email && <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>}
          <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            TikTok
          </a>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-muted md:px-6">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
