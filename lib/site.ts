// Every TODO(samson) is waiting on Samson's answers (PLAN.md §3). Never replace one with a guessed value.

// Set by next.config.ts — "/smart-interior-designs" on the GitHub Pages preview, "" everywhere else.
// Next adds it to <Link> and imported images automatically; raw paths (e.g. <video src>) need it by hand.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// True only on the GitHub Pages preview, which has no server for /api/quote.
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";

export const site = {
  name: "Smart Interior Design",
  owner: "Samson",
  tagline: "Custom kitchens, wardrobes and TV walls — designed, built and installed.",
  // TODO(samson): confirm workshop location and areas served
  location: "Nairobi, Kenya",
  // TODO: no domain bought yet — drives metadataBase, canonicals and the sitemap
  url: "http://localhost:3000",
  // Samson's phone and WhatsApp (0718 258 961), given by Alex 2026-09-18. wa.me needs international format without "+".
  whatsapp: "254718258961" as string | null,
  phone: "+254 718 258 961" as string | null,
  // TODO(samson)
  email: null as string | null,
  social: {
    // TODO(samson): confirm this is Samson's account; add Instagram / Facebook if any
    tiktok: "https://www.tiktok.com/@sammympole516",
  },
};

export function whatsappLink(message = `Hi ${site.owner}, I'd like a quote from ${site.name}.`) {
  const text = encodeURIComponent(message);
  // Without a number wa.me opens the share picker instead of a chat — acceptable until Samson sends a number.
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}
