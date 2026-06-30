---
pdf_options:
  format: A4
  margin: 30mm 25mm
  printBackground: true
stylesheet: setup-guide.css
---

# The Hospitality Guild — Launch Setup Guide

Complete deployment checklist: Neon · Google OAuth · Stripe · Vercel

---

## Step 1 — Neon Database (PostgreSQL)

1. Go to **neon.tech** and create a free account
2. Click **New Project** — name it `hospitality-guild`, select US East region
3. Click **Connection Details** and copy the **Connection String**:

```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

4. Save as `DATABASE_URL` — needed in Step 4

> The free Neon tier gives you 0.5 GB storage and 191 compute hours/month — plenty to start. Upgrade later as needed.

---

## Step 2 — Google OAuth Credentials

1. Go to **console.cloud.google.com** — create a new project named `hospitality-guild`
2. Navigate to **APIs & Services → OAuth consent screen**
   - User type: **External**
   - App name: `The Hospitality Guild`
   - Fill in email fields, click Save and Continue through all steps
3. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: `Guild Website`
   - Under **Authorized redirect URIs**, add:

```
https://thehospitaityguild.com/api/auth/callback/google
```

4. Click **Create** — copy these two values:

| Variable | Where to find it |
|---|---|
| `GOOGLE_CLIENT_ID` | "Your Client ID" field |
| `GOOGLE_CLIENT_SECRET` | "Your Client Secret" field |

> After deploying to Vercel (Step 4), also add your `.vercel.app` preview URL as a second authorized redirect URI.

---

## Step 3 — Stripe Products & Prices

Go to **dashboard.stripe.com → Products → Add product** and create three products:

### Product 1: Guild Member

| Field | Value |
|---|---|
| Name | Guild Member |
| Price | $29.00 / Monthly |

Copy the **Price ID** (starts `price_`) → save as `STRIPE_MEMBER_PRICE_ID`

### Product 2: Guild Business — Base

| Field | Value |
|---|---|
| Name | Guild Business — Base |
| Price | $99.00 / Monthly |

Copy the **Price ID** → save as `STRIPE_BUSINESS_BASE_PRICE_ID`

### Product 3: Guild Business — Seat

| Field | Value |
|---|---|
| Name | Guild Business — Seat |
| Price | $0.00 / Monthly |

Copy the **Price ID** → save as `STRIPE_BUSINESS_SEAT_PRICE_ID`

> **Why a $0 seat?** The full $99 is on the base product. The seat product lets each business subscription carry 4 seat line items in Stripe for programmatic seat tracking.

Finally: go to **Settings → Customer portal** and enable it — required for the "Manage Billing" button.

---

## Step 4 — Deploy to Vercel

1. Go to **vercel.com → Add New Project → Import Git Repository**
2. Select `bobprestenbach/guild-website`, branch `claude/hospitality-guild-site-pubqfs`
3. Framework preset: **Next.js** (auto-detected)
4. Open **Environment Variables** and add all of the following before deploying:

```
DATABASE_URL                    = postgresql://... (from Step 1)
AUTH_SECRET                     = <run: openssl rand -base64 32>
GOOGLE_CLIENT_ID                = ... (from Step 2)
GOOGLE_CLIENT_SECRET            = ... (from Step 2)
STRIPE_SECRET_KEY               = sk_live_... (Stripe → Developers → API keys)
STRIPE_WEBHOOK_SECRET           = whsec_... (add after Step 5)
STRIPE_MEMBER_PRICE_ID          = price_... (from Step 3)
STRIPE_BUSINESS_BASE_PRICE_ID   = price_... (from Step 3)
STRIPE_BUSINESS_SEAT_PRICE_ID   = price_... (from Step 3)
NEXT_PUBLIC_APP_URL             = https://thehospitaityguild.com
```

Generate `AUTH_SECRET` in your terminal:

```bash
openssl rand -base64 32
```

5. Click **Deploy** — Vercel will build and provide a `.vercel.app` preview URL

---

## Step 5 — Stripe Webhook

1. Go to **Stripe → Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://thehospitaityguild.com/api/stripe/webhook`
3. Select these four events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click **Add endpoint** → click **Reveal** under Signing secret → copy the `whsec_...` value
5. Add `STRIPE_WEBHOOK_SECRET` to Vercel env vars, then **Redeploy**

---

## Step 6 — Initialize the Database Schema

After Vercel deploys successfully, run this **once** to create all database tables:

```bash
npx prisma db push
```

If running locally without a `.env.local`, use Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel env pull .env.local
npx prisma db push
```

Expected output:

```
✔  Generated Prisma Client
✔  Your database is now in sync with your schema.
```

---

## Step 7 — GoDaddy DNS

1. Log in to **GoDaddy.com → My Products → DNS** for `thehospitaityguild.com`
2. Add or update these two records:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |

3. In **Vercel → Project → Settings → Domains**, add `thehospitaityguild.com`
4. Vercel will verify DNS and auto-provision SSL — typically takes 5–30 minutes

---

## Final Checklist

- [ ] Neon database created and connection string saved
- [ ] Google OAuth credentials created with correct redirect URIs
- [ ] Three Stripe products/prices created and Price IDs saved
- [ ] Stripe customer portal enabled
- [ ] Vercel deployment live with all 10 environment variables set
- [ ] Stripe webhook configured with 4 events and signing secret added to Vercel
- [ ] Database schema initialized via `prisma db push`
- [ ] GoDaddy DNS: A record + CNAME added
- [ ] Domain added in Vercel and SSL certificate issued
- [ ] Test sign-in with Google — confirm EXPLORER tier shows in dashboard
- [ ] Test Stripe payment in test mode before going live

---

*The Hospitality Guild — Fide et Hospitalitate*
