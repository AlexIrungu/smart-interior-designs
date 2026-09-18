# Smart Interior Design

Marketing and lead-gen website for **Smart Interior Design**. Samson and the team design, build and install custom fitted joinery: kitchens, built-in wardrobes, TV and feature walls, vanities and office storage.

**Client preview:** https://alexirungu.github.io/smart-interior-designs/ (GitHub Pages, `noindex`)

> The preview exists so Samson can see the build before paying for hosting and a domain. It is not the production site. Hosting is still undecided.

## Status (2026-09-18)

| Area | State |
|---|---|
| Homepage, `/projects`, `/projects/[slug]`, `/services/[slug]`, `/quote` | ✅ Built, approved |
| WhatsApp CTAs (0718 258 961) | ✅ Live on every page |
| Quote form (Resend) | ✅ Built · ⏳ not tested end to end · shows a preview notice on GitHub Pages |
| GitHub Pages preview | ✅ Live, auto-deploys on push to `main` |
| Photos | ⚠️ WhatsApp-compressed copies, to be replaced with originals before launch |
| Domain, hosting, email | ⏳ Waiting on Samson |
| SEO (schema, sitemap) | ⏸️ On hold |

Open questions for Samson live in the vault note *Smart Interior Design — Client Questions*.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Resend

## Getting started

```bash
npm install
npm run dev
```

To send quote-form emails locally, create `.env.local`:

```
RESEND_API_KEY=re_...
QUOTE_TO_EMAIL=you@example.com      # until a domain is verified, this must be the Resend account owner's email
# QUOTE_FROM_EMAIL=Smart Interior Design <quotes@your-domain>   # once a domain is verified
```

## Project layout

```
app/
  page.tsx                 homepage
  projects/                /projects and /projects/[slug]
  services/[slug]/         one page per service
  quote/                   quote page (WhatsApp + form)
  api/quote/route.ts       form → Resend (server only, removed from the Pages build)
components/                Header, Footer, WhatsAppButton, QuoteForm, icons
lib/
  site.ts                  brand, contacts, socials, whatsappLink(), basePath
  projects.ts              services, photos (tagged by service/project/finished), projects
  quote.ts                 shared form types + budget bands
assets/work, assets/about  photos (static imports; filename prefix = PLAN.md photo index)
public/video/              background video loop + poster
```

## Editing content

- **Contacts, name, socials:** `lib/site.ts`. Anything marked `TODO(samson)` is waiting on his answers and should never be filled with a guess.
- **Photos:** add the file to `assets/work/`, import it in `lib/projects.ts`, and add one entry to `photos` with its `service`, optional `project` and `finished`. Only `finished: true` photos are used as hero or cover images.
- **Swapping in originals:** replace the files in `assets/` under the same names.
- **Projects and services:** the `projects` and `services` arrays in `lib/projects.ts`. Pages are generated from them.

## Deploying the preview

Pushing to `main` runs `.github/workflows/deploy-pages.yml`. It removes `app/api`, builds with `GITHUB_PAGES=true` (static export, `basePath: /smart-interior-designs`, unoptimized images, `noindex`) and publishes `out/` to GitHub Pages. Without that variable the app builds as a normal Next.js server.

The quote form needs a Node server, so production has to be a host that runs Next.js. Vercel Hobby is off the table because its terms are non-commercial.

## More

- `PLAN.md`: material audit, positioning, sitemap, photo index
- `CLAUDE.md`: working rules and conventions for Claude Code sessions
