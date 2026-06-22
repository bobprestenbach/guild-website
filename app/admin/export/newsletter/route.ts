import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function GET() {
  const session = await auth()
  const adminEmail = process.env.ADMIN_EMAIL

  if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
    redirect('/')
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
    select: { email: true, name: true, subscribedAt: true },
  })

  const header = 'Email,Name,Subscribed At\n'
  const rows = subscribers.map(s =>
    `"${s.email}","${(s.name ?? '').replace(/"/g, '""')}","${s.subscribedAt.toISOString()}"`
  ).join('\n')

  return new Response(header + rows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
