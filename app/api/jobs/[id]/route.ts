import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const job = await prisma.jobPost.findUnique({ where: { id } })

  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (job.userId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.jobPost.update({ where: { id }, data: { status: 'closed' } })
  return NextResponse.json({ ok: true })
}
