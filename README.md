# Missed Call Pros — missedcallpros.com

Next.js (App Router) + TypeScript + Tailwind v4. Deploys on Vercel.

## Edit content
All text, prices, phone, email, FAQs, testimonials and work samples live in **`site.config.ts`**.
- Work images: replace files in `public/work/` (or point `image` paths in the config to new files).
- Testimonials are samples — replace with real reviews before launch, or set `testimonials.enabled: false`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Contact form
The form posts to `/api/contact`, which forwards JSON to `FORM_WEBHOOK_URL` (your GoHighLevel inbound webhook).
Copy `.env.example` to `.env.local` and paste the URL. Without it, dev mode logs leads to the console; production returns an error.

## Deploy (Vercel)
1. Import this GitHub repo at vercel.com/new (framework auto-detected).
2. Settings → Environment Variables → add `FORM_WEBHOOK_URL`.
3. Settings → Domains → add `missedcallpros.com` and `www.missedcallpros.com`, then set the DNS records Vercel shows at your registrar.
