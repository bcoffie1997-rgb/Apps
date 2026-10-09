# Missed Call Pros — Live CRM (Google Sheet)

One script turns your Google Sheet into a live CRM and connects the website form to it.

## Set it up (10 minutes, once)
1. Open the sheet → **Extensions → Apps Script**.
2. Delete what's there. Paste all of `Code.gs`. On line 20, put your email in `NOTIFY_EMAIL`. Click **Save**.
3. Toolbar: choose **setup** → **▶ Run** → **Review permissions** → your account → **Advanced → Go to project → Allow**.
4. Back in the sheet you now have: **Dashboard, Leads, Activity Log, Settings**.
5. Connect the website: **Deploy → New deployment** → gear → **Web app** → Execute as **Me**, Who has access **Anyone** → **Deploy** → copy the URL ending in `/exec`.
6. Vercel → Settings → Environment Variables → `SHEET_WEBHOOK_URL` = that URL → Redeploy.
7. Settings tab → column B: type your salespeople's names.

## Daily use
| You do | The sheet does |
|---|---|
| Type or paste a business name in **Leads** | Fills Date Added, sets Status = New |
| Tick **✔ Contacted Today** | Last Contact = today, First Contact (if blank), Touches +1, Next Follow-Up = today + 3 days, adds a line to Activity Log |
| Change **Status** | Counts as a contact, logged in Activity Log |
| Add a line in **Activity Log** (business + type) | Updates that lead's Last Contact and Touches |
| Nothing | Days Since First Contact, Days Since Last Contact, Days in Pipeline and Follow-Up Status update every day |
| Website form is submitted | New row in Leads (Source = Website form, follow-up today) + email to you |

Colors: red = overdue / 7+ days without contact, yellow = due today / 3–6 days, grey = closed.

**Dashboard:** total leads, added this week, due today, overdue, won clients, monthly recurring revenue, open pipeline, win rate, per-salesperson numbers, "call these today" list and "going cold" list.

**8am email:** if NOTIFY_EMAIL is set, you get the day's overdue + due-today follow-ups every morning.

**Change follow-up timing:** Settings → I2 (default 3 days).

## Uploading a list of leads
Paste rows into Leads starting at column B (Business Name, Contact, Phone, Email, Type, City, Address…). Date Added and Status fill in automatically.

## After changing the script
Deploy → Manage deployments → pencil → Version: **New version** → Deploy. The URL stays the same.
