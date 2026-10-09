# Missed Call Pros — missedcallpros.com

Next.js + Tailwind. Hosted on Vercel. English at `/`, Spanish at `/es`.

## Where to edit things
| What | File |
|---|---|
| Phone, email, prices, service area | `site.config.ts` |
| Every word on the English site | `content/en.ts` |
| Every word on the Spanish site | `content/es.ts` |
| Sample designs + prospect previews | `content/demos.ts` |

## Pages
- `/` and `/es` — home (first visit asks English or Español, then remembers)
- `/pricing`, `/work` (sample designs), `/about`, `/contact`, `/privacy`, `/terms`
- `/hi` and `/es/hi` — door-to-door landing page (QR codes in `public/qr/`)
- `/samples/<slug>` — live sample websites
- `/preview/<slug>` — private previews for real prospects (hidden from Google)

## Door-to-door previews
1. In `content/demos.ts`, add an entry to `previews` (copy the closest sample, change name/phone/city/services).
2. Push. In about a minute it's live at `missedcallpros.com/preview/<slug>`.
3. Show the owner on your phone.

## Leads
The form sends each lead to:
- `SHEET_WEBHOOK_URL` — your live Google Sheet CRM + email alert. Setup: `google-sheet-crm/README.md`.
- `FORM_WEBHOOK_URL` — optional, GoHighLevel or any other webhook.

## Sample thumbnails
After changing a sample, re-take its screenshot for `/work` (`public/work/<slug>.jpg`).

## QR codes
`node scripts/make-qr.mjs` → `public/qr/hi-en.png` and `public/qr/hi-es.png`.

## Run locally
```bash
npm install
npm run dev
```
