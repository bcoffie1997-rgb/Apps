# Google Sheet CRM — setup (10 minutes)

Every form on missedcallpros.com adds a row to your Google Sheet and emails you the lead.

## 1. Add the script to your sheet
1. Open your leads Google Sheet.
2. Menu: **Extensions → Apps Script**.
3. Delete everything in the editor. Paste all of `Code.gs` (this folder).
4. On line 8, change `you@example.com` to the email that should get new-lead alerts.
5. Click **Save** (disk icon).

## 2. Approve it once
1. In the toolbar, pick the function **setup**, click **▶ Run**.
2. Click **Review permissions** → pick your Google account → **Advanced** → **Go to project (unsafe)** → **Allow**.
   (It says "unsafe" only because you wrote the script yourself.)
3. Go back to your sheet — a **Leads** tab with headers now exists.

## 3. Publish it as a web app
1. Click **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Execute as: **Me**. Who has access: **Anyone**. (Required — the website isn't signed in to Google.)
4. Click **Deploy** and copy the **Web app URL** (ends in `/exec`).

## 4. Connect it to the website
1. Vercel → your project → **Settings → Environment Variables**.
2. Add `SHEET_WEBHOOK_URL` = the Web app URL. Environments: all.
3. **Deployments → ⋯ → Redeploy**.

## 5. Test
Submit the form on missedcallpros.com/contact. Within seconds you should see a new row and get an email.

## Using it as your CRM
- **Status** column has a dropdown: New → Contacted → Preview sent → Meeting set → Won / Lost.
- **Follow-up date** and **Notes** are yours to fill in.
- Tip: Data → Create a filter, then filter Status = New each morning.

## If you change the script later
Deploy → **Manage deployments** → pencil icon → Version: **New version** → Deploy. The URL stays the same.
