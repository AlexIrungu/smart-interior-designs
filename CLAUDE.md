@AGENTS.md

# Smart Interior Design — Project Context

Marketing site for Samson (TikTok `@sammympole516`), a Nairobi maker of **custom fitted joinery**: kitchens, built-in wardrobes, TV/feature walls, vanities, office storage. Not a decorator — copy and SEO target "kitchen cabinets / wardrobes / TV wall unit Nairobi", not generic "interior design".

Full plan, service→photo mapping, project groupings and photo index: `PLAN.md`.
Vault note: `~/Documents/Second Brain/Projects/Smart Interior Design.md` · open questions: `Projects/Smart Interior Design — Client Questions.md` (has a table of where each answer goes in the code).

**Status (2026-09-18):** v1 built and approved; client preview live on GitHub Pages; waiting on Samson (domain/hosting payment, originals, content). SEO on hold until Alex says go.

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind v4 (tokens via `@theme` in `globals.css`, no `tailwind.config.js`) · App Router, no `src/` · Resend for the quote form. Mirrors `~/Documents/ideas/martin-munga/` — check its `LESSONS.md` before fighting a Next 16 / Tailwind v4 issue.

Hosting: **undecided**. It must run Node for `/api/quote`. **Not Vercel Hobby** (non-commercial terms). Hostinger Business or a VPS are the candidates. Don't add host-specific config until decided.

**Client preview — GitHub Pages** (repo `AlexIrungu/smart-interior-designs`, public): `https://alexirungu.github.io/smart-interior-designs/`. Built by `.github/workflows/deploy-pages.yml` on push to `main`, only so Samson can see the build and pay for hosting and a domain. `GITHUB_PAGES=true` switches `next.config.ts` to `output: "export"` + `basePath: "/smart-interior-designs"` + `trailingSlash` + unoptimized images, and sets `noindex`. Without it, the app is a normal Next server.
- The workflow deletes `app/api` before building (static export can't include a POST route). On the preview the quote form stays visible, but submitting shows a "preview" notice (`isStaticPreview`) — never fake a success.
- Raw asset paths (`<video src>`, `poster`) need `${basePath}` from `lib/site.ts`; `<Link>` and imported images get it automatically.
- Anything that stops a static export breaks the preview: server-side `searchParams`, `cookies()`/`headers()`, dynamic routes without `generateStaticParams` + `dynamicParams = false`. `/quote` reads `?service=` client-side (`useSearchParams` inside `<Suspense>`) for this reason.

## Design — "Warm workshop" (chosen 2026-09-18)
- Tokens in `app/globals.css` `@theme`: `paper` #f6f2ec · `stone` #e9e2d7 · `ink` #1e1b18 · `muted` #6b635a · `oak` #9a6b3f · `oak-deep` #7a5230. White on `oak` passes AA (4.6:1); small text uses `oak-deep`, never plain `oak`.
- Fonts via `next/font/google`: **Young Serif** (`font-serif`, headings/wordmark) + **Hanken Grotesk** (`font-sans`, body). No logo — the name is a text wordmark.
- Light theme only, deliberately.

## Images
- **Static imports** from `assets/` (not `public/` path strings like Martin Munga) — Samson's photos mix portrait/landscape, and static imports give width/height + blur placeholders for free.
- Every photo is declared once in `lib/projects.ts` with `service`, optional `project`, and `finished`. Heroes/covers must use `finished: true` photos.
- `next/image` in Next 16: use `preload`, not the deprecated `priority`.
- Videos in `public/video/`: remuxed to MP4 with audio stripped. `installing-loop.mp4` is a 12s crf-28 cut (878KB). Encode any new background video the same way — the source files are 6–8MB.

## Conversion model
- **WhatsApp is the primary CTA** — every CTA opens `wa.me/<number>?text=<prefilled>`. The quote form is the fallback.
- Projects are shown **grouped by job** (case studies), never as a loose photo dump.
- Project content lives in a typed `lib/projects.ts` — no CMS for v1.
- **Quote form** (`/quote`, `components/QuoteForm.tsx` → `app/api/quote/route.ts`, Resend): phone required, email optional (leads come back by call/WhatsApp); no photo upload — the success state pushes photos to WhatsApp instead. Honeypot field `company`. `/quote?service=<slug>` pre-ticks a service.
- Env (`.env.local`): `RESEND_API_KEY`, `QUOTE_TO_EMAIL` (required — route returns 500 without them), `QUOTE_FROM_EMAIL` (optional; defaults to `onboarding@resend.dev`, which Resend only delivers to the account owner's inbox — set it once a domain is verified).
- `lib/quote.ts` is shared with the client form — never import `lib/projects.ts` into client components (it pulls in every image import); pass data down as props.

## Content rules
- **Source photos:** `~/Downloads/Smart Interior Design/` — WhatsApp re-compressions (~1200×1600, ~150KB). Building on them is approved; **originals replace them before launch**. Keep image references in `lib/projects.ts` so the swap is one place.
- **Never use video V4 (`6260d31a…mov`)** — it is branded "JM Furniture Mart" (`@jmfurnituremart`), not Samson's work, until Samson confirms otherwise.
- Photos 21 and 49 show clients — don't publish until Samson confirms consent.
- Brand name: **Smart Interior Design** (confirmed 2026-09-18). Keep it in one constant (`lib/site.ts`). Old watermarks show other variants — never copy those into the UI.
- **No domain yet** — `metadataBase`/canonical URLs read from one constant; leave it as a placeholder until bought.
- **Phone + WhatsApp: 0718 258 961** (received 2026-09-18, in `lib/site.ts`). Email, location, prices, testimonials: **none received yet** — use obvious placeholders, never invented values.

## Working rules
- Alex runs all build/dev/deploy/install commands — print them, don't run them.
