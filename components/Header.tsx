import Link from "next/link";
import { site } from "@/lib/site";
import WhatsAppButton from "./WhatsAppButton";

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/quote", label: "Get a quote" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 md:px-6">
        <Link href="/" className="font-serif text-xl">
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton label="WhatsApp" className="px-4 py-2 text-sm" />
      </div>
    </header>
  );
}
