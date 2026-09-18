import type { Metadata } from "next";
import { Hanken_Grotesk, Young_Serif } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import "./globals.css";

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  weight: "400",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Custom kitchens, wardrobes & TV walls`,
    template: `%s — ${site.name}`,
  },
  description: `${site.tagline} ${site.location}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${hanken.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
