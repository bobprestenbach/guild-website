import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import { getCourse } from '@/lib/courses'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { courseId, lessonId } = await req.json() as { courseId: string; lessonId: string }

  const course = getCourse(courseId)
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

  const tier = await getEffectiveTier(session.user.id)
  if (!tierCanAccess(tier, course.requiredTier)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.courseProgress.upsert({
    where: { userId_courseId_lessonId: { userId: session.user.id, courseId, lessonId } },
    update: { completedAt: new Date() },
    create: { userId: session.user.id, courseId, lessonId, completedAt: new Date() },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { courseId, lessonId } = await req.json() as { courseId: string; lessonId: string }

  await prisma.courseProgress.deleteMany({
    where: { userId: session.user.id, courseId, lessonId },
  })

  return NextResponse.json({ ok: true })
}
