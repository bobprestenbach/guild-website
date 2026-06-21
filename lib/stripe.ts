import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

export const PLANS = {
  MEMBER: {
    priceId: process.env.STRIPE_MEMBER_PRICE_ID!,
    tier: 'MEMBER' as const,
  },
  BUSINESS: {
    basePriceId: process.env.STRIPE_BUSINESS_BASE_PRICE_ID!,
    seatPriceId: process.env.STRIPE_BUSINESS_SEAT_PRICE_ID!,
    tier: 'BUSINESS' as const,
  },
} as const
