import type { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier, tierCanAccess, type EffectiveTier } from '@/lib/subscriptions'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Resources' }

interface Resource {
  id: string
  title: string
  description: string
  type: string
  icon: string
  requiredTier: EffectiveTier
  downloadUrl: string
}

const RESOURCES: Resource[] = [
  {
    id: 'onboarding-checklist',
    title: 'New Hire Onboarding Checklist',
    description: 'A 30-day onboarding checklist used by 200+ operations. Covers day 1, week 1, and month 1.',
    type: 'PDF Checklist',
    icon: '✅',
    requiredTier: 'EXPLORER',
    downloadUrl: '#',
  },
  {
    id: 'guest-service-standards',
    title: 'Guest Service Standards Template',
    description: 'A customizable template for defining measurable service standards for your operation.',
    type: 'Word Document',
    icon: '⭐',
    requiredTier: 'EXPLORER',
    downloadUrl: '#',
  },
  {
    id: 'server-training-manual',
    title: 'Server Training Manual',
    description: 'A complete, customizable server training manual covering menu knowledge, service flow, and upselling.',
    type: 'PDF Manual',
    icon: '🍷',
    requiredTier: 'MEMBER',
    downloadUrl: '#',
  },
  {
    id: 'kitchen-sop',
    title: 'Kitchen SOP Template Pack',
    description: '12 ready-to-use SOPs covering mise en place, line checks, food storage, and sanitation.',
    type: 'Word Pack (12 docs)',
    icon: '🍳',
    requiredTier: 'MEMBER',
    downloadUrl: '#',
  },
  {
    id: 'manager-onboarding',
    title: 'Manager Onboarding Guide',
    description: 'A 90-day onboarding plan for new managers, covering systems, team dynamics, and quick wins.',
    type: 'PDF Guide',
    icon: '👔',
    requiredTier: 'MEMBER',
    downloadUrl: '#',
  },
  {
    id: 'interview-questions',
    title: 'Interview Question Bank',
    description: '75 behavioral interview questions organized by role — servers, cooks, shift leads, managers.',
    type: 'PDF',
    icon: '💼',
    requiredTier: 'MEMBER',
    downloadUrl: '#',
  },
  {
    id: 'performance-review',
    title: 'Performance Review Template',
    description: 'A two-page performance review form designed for hospitality operations. Includes rating scales and coaching prompts.',
    type: 'Word Document',
    icon: '📊',
    requiredTier: 'MEMBER',
    downloadUrl: '#',
  },
  {
    id: 'shift-handover',
    title: 'Shift Handover Checklist',
    description: 'Standardize your shift transitions. Covers FOH, BOH, and management handover points.',
    type: 'PDF Checklist',
    icon: '🔄',
    requiredTier: 'MEMBER',
    downloadUrl: '#',
  },
  {
    id: 'training-calendar',
    title: 'Team Training Calendar Template',
    description: 'A 12-month training calendar template designed for multi-manager operations.',
    type: 'Excel/Sheets',
    icon: '📅',
    requiredTier: 'BUSINESS',
    downloadUrl: '#',
  },
  {
    id: 'sop-library',
    title: 'Multi-Manager SOP Library',
    description: 'A full SOP library with 30+ documents covering all departments, ready for enterprise deployment.',
    type: 'ZIP Archive (30 docs)',
    icon: '📚',
    requiredTier: 'BUSINESS',
    downloadUrl: '#',
  },
]

export default async function ResourcesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)

  const freeResources = RESOURCES.filter(r => r.requiredTier === 'EXPLORER')
  const memberResources = RESOURCES.filter(r => r.requiredTier === 'MEMBER')
  const businessResources = RESOURCES.filter(r => r.requiredTier === 'BUSINESS')

  function ResourceItem({ resource }: { resource: Resource }) {
    const canDownload = tierCanAccess(tier, resource.requiredTier)
    return (
      <div className={`resource-item${canDownload ? '' : ' resource-item--locked'}`}>
        <div className="resource-item__icon" aria-hidden="true">{resource.icon}</div>
        <div className="resource-item__content">
          <div className="resource-item__title">{resource.title}</div>
          <div className="resource-item__meta">{resource.type}</div>
          <div style={{ fontSize: '0.83rem', color: 'var(--text-light)', marginTop: '4px' }}>
            {resource.description}
          </div>
        </div>
        <div className="resource-item__action">
          {canDownload ? (
            <a href={resource.downloadUrl} className="btn btn--primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              Download
            </a>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>🔒 {resource.requiredTier === 'BUSINESS' ? 'Business' : 'Member'}</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="dash-page-header">
        <h1>Resource Library</h1>
        <p>Templates, SOPs, checklists, and tools ready to customize and deploy.</p>
      </div>

      {tier === 'EXPLORER' && (
        <div className="upgrade-prompt" style={{ marginBottom: '32px' }}>
          <div className="upgrade-prompt__content">
            <h3>Unlock the Full Resource Library</h3>
            <p>8 additional resources available to Member and Business plan subscribers.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      )}

      <div className="resource-list" style={{ gap: '32px' }}>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
            Free Resources
          </h2>
          <div className="resource-list">
            {freeResources.map(r => <ResourceItem key={r.id} resource={r} />)}
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
            Member Resources
          </h2>
          <div className="resource-list">
            {memberResources.map(r => <ResourceItem key={r.id} resource={r} />)}
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
            Business Resources
          </h2>
          <div className="resource-list">
            {businessResources.map(r => <ResourceItem key={r.id} resource={r} />)}
          </div>
        </section>

      </div>
    </>
  )
}
