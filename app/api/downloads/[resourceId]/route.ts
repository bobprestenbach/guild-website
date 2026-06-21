import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'
import type { EffectiveTier } from '@/lib/subscriptions'

interface ResourceMeta {
  requiredTier: EffectiveTier
  fileUrl: string | null
  name: string
}

const RESOURCE_META: Record<string, ResourceMeta> = {
  'onboarding-checklist':   { requiredTier: 'EXPLORER', fileUrl: null, name: 'New Hire Onboarding Checklist' },
  'guest-service-standards':{ requiredTier: 'EXPLORER', fileUrl: null, name: 'Guest Service Standards Template' },
  'server-training-manual': { requiredTier: 'MEMBER',   fileUrl: null, name: 'Server Training Manual' },
  'kitchen-sop':            { requiredTier: 'MEMBER',   fileUrl: null, name: 'Kitchen SOP Template Pack' },
  'manager-onboarding':     { requiredTier: 'MEMBER',   fileUrl: null, name: 'Manager Onboarding Guide' },
  'interview-questions':    { requiredTier: 'MEMBER',   fileUrl: null, name: 'Interview Question Bank' },
  'performance-review':     { requiredTier: 'MEMBER',   fileUrl: null, name: 'Performance Review Template' },
  'shift-handover':         { requiredTier: 'MEMBER',   fileUrl: null, name: 'Shift Handover Checklist' },
  'training-calendar':      { requiredTier: 'BUSINESS', fileUrl: null, name: 'Team Training Calendar Template' },
  'sop-library':            { requiredTier: 'BUSINESS', fileUrl: null, name: 'Multi-Manager SOP Library' },
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  const { resourceId } = await params
  const meta = RESOURCE_META[resourceId]

  if (!meta) {
    return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
  }

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL('/signin', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'))
  }

  const tier = await getEffectiveTier(session.user.id)
  if (!tierCanAccess(tier, meta.requiredTier)) {
    return NextResponse.json({ error: 'Your plan does not include this resource' }, { status: 403 })
  }

  if (!meta.fileUrl) {
    return NextResponse.json({
      error: 'File not yet available',
      message: `${meta.name} is coming soon. You'll be notified when it's ready to download.`,
    }, { status: 404 })
  }

  return NextResponse.redirect(meta.fileUrl)
}
