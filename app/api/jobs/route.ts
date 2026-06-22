import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'

export async function GET() {
  const jobs = await prisma.jobPost.findMany({
    where: { status: 'active', expiresAt: { gt: new Date() } },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, title: true, company: true, location: true,
      type: true, role: true, salary: true, applyEmail: true,
      createdAt: true, description: true,
    },
  })
  return NextResponse.json(jobs)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tier = await getEffectiveTier(session.user.id)
  if (!tierCanAccess(tier, 'MEMBER')) {
    return NextResponse.json({ error: 'Member plan required to post jobs' }, { status: 403 })
  }

  const body = await req.json()
  const { title, company, location, type, role, description, salary, applyEmail } = body

  if (!title || !company || !location || !type || !role || !description || !applyEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  const job = await prisma.jobPost.create({
    data: {
      userId: session.user.id,
      title, company, location, type, role,
      description, salary: salary || null, applyEmail,
      expiresAt,
    },
  })

  return NextResponse.json(job, { status: 201 })
}
