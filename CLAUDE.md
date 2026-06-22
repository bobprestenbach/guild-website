# The Hospitality Guild — Project Guide

Membership portal for hospitality managers. Skool-style platform built on Next.js 15 App Router.

## Tech Stack

- **Framework**: Next.js 15 App Router, TypeScript, React 19
- **Auth**: NextAuth v5 beta (`next-auth@^5.0.0-beta.31`) with Google OAuth and `@auth/prisma-adapter`
- **DB**: Prisma 6 + Neon (PostgreSQL serverless). Always run `npm run db:generate` after schema changes.
- **Payments**: Stripe 14 — checkout sessions + billing portal + webhooks
- **Email**: Resend (`lib/email.ts`) — graceful no-op when `RESEND_API_KEY` is not set
- **Fonts**: Playfair Display (`--font-display`) + Inter (`--font-body`) via `next/font/google`

## Key Conventions

- **Server Components by default.** Add `'use client'` only when you need hooks/events.
- **No comments** except for non-obvious WHY (hidden constraints, workarounds).
- CSS lives in `app/globals.css` (public pages) and `app/dashboard/dashboard.css` (dashboard). Never use Tailwind — all styles use CSS custom properties from `:root`.
- CSS variables: `--primary #6B1528`, `--gold #B8942A`, `--parchment #E8DFC0`, `--cream #F2ECD8`, `--primary-dark #4A0F1C`.

## Membership Tiers

```
EXPLORER (free) → MEMBER ($29/mo) → BUSINESS ($99/mo, 5 seats)
```

- `lib/subscriptions.ts`: `getEffectiveTier(userId)` — checks BusinessSeat first, then own Membership
- `tierCanAccess(userTier, required)` — rank comparison for gating content

## Important Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | DB schema — run `npm run db:push` after changes |
| `lib/courses.ts` | Static course catalog (5 courses, add `videoId` when ready) |
| `lib/blog.ts` | 6 static blog posts with full content |
| `lib/email.ts` | All transactional emails via Resend |
| `lib/subscriptions.ts` | Tier logic |
| `auth.ts` | NextAuth config with Google provider |
| `middleware.ts` | Protects `/dashboard/*`, redirects to `/signin?callbackUrl=...` |
| `app/api/stripe/webhook/route.ts` | Handles checkout, invoice, subscription events |
| `app/admin/page.tsx` | Admin panel — gated by `ADMIN_EMAIL` env var |

## Database Models

`User`, `Account`, `Session`, `VerificationToken` (NextAuth), `Membership` (tier + Stripe IDs), `BusinessSeat` (owner→member link), `CourseProgress` (userId+courseId+lessonId unique), `JobPost`, `TeamInvite`, `NewsletterSubscriber`

## Environment Variables

See `.env.example`. Required for full functionality:
- `DATABASE_URL` — Neon connection string
- `AUTH_SECRET` — run `npx auth secret`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_MEMBER_PRICE_ID`, `STRIPE_BUSINESS_BASE_PRICE_ID`, `STRIPE_BUSINESS_SEAT_PRICE_ID`
- `RESEND_API_KEY` — emails are silently skipped without this
- `NEXT_PUBLIC_APP_URL` — used in sitemap, OG metadata, email links
- `ADMIN_EMAIL` — your email; unlocks `/admin` and receives contact/partner inquiry emails

## Development Commands

```bash
npm run dev          # start dev server
npm run build        # production build
npm run db:push      # push schema changes to DB (run after schema edits)
npm run db:generate  # regenerate Prisma client (run after schema edits)
npm run db:studio    # open Prisma Studio GUI
```

## Route Structure

```
/                    Homepage
/about, /training, /community, /partners, /blog, /jobs, /contact
/blog/[slug]         Individual blog posts (statically generated)
/join                Pricing / signup page
/signin              Google OAuth sign-in
/join-team           Team invite acceptance (token in query param)
/dashboard/*         Protected — requires auth
/dashboard/training/[courseId]           Lesson player
/dashboard/training/[courseId]/certificate  Printable certificate
/admin               Admin panel (ADMIN_EMAIL guard)
/admin/export/newsletter  CSV download of newsletter subscribers
/api/stripe/*        Checkout, portal, webhook
/api/jobs, /api/jobs/[id]  Job board CRUD
/api/team/invite, /api/team/remove
/api/progress        Course progress tracking
/api/downloads/[resourceId]  Gated file downloads
/api/newsletter/subscribe
/api/partner-inquiry
/api/contact
/api/profile/update-name
```

## Known Placeholders

- `lib/courses.ts` lesson `videoId` fields are empty — add YouTube video IDs when content is ready
- `RESOURCE_META` in `app/api/downloads/[resourceId]/route.ts` has `fileUrl: null` — add real file URLs (e.g. S3/R2 presigned URLs)
- Social links in Footer are `#` — add real URLs when accounts are set up
- Community links point to `https://www.skool.com/hospitality-guild` — update when Skool group is live
