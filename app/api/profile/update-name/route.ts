import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name } = await req.json()
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.trim().slice(0, 80) },
  })

  return NextResponse.json({ ok: true })
}
