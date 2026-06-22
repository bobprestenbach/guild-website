import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { stripe, PLANS } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tier } = await req.json() as { tier: 'MEMBER' | 'BUSINESS' }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  let membership = await prisma.membership.findUnique({
    where: { userId: session.user.id },
  })

  let customerId = membership?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email ?? undefined,
      name: session.user.name ?? undefined,
      metadata: { userId: session.user.id },
    })
    customerId = customer.id

    await prisma.membership.upsert({
      where: { userId: session.user.id },
      update: { stripeCustomerId: customerId },
      create: { userId: session.user.id, stripeCustomerId: customerId },
    })
  }

  const lineItems =
    tier === 'BUSINESS'
      ? [
          { price: PLANS.BUSINESS.basePriceId, quantity: 1 },
          { price: PLANS.BUSINESS.seatPriceId, quantity: 4 },
        ]
      : [{ price: PLANS.MEMBER.priceId, quantity: 1 }]

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: lineItems,
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/join`,
    client_reference_id: session.user.id,
    subscription_data: {
      metadata: { userId: session.user.id, tier },
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
