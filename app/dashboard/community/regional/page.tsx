import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEffectiveTier, tierCanAccess } from '@/lib/subscriptions'

export const metadata: Metadata = { title: 'Regional Groups' }

const REGIONS = [
  {
    id: 'northeast',
    flag: '🗽',
    name: 'Northeast',
    states: 'NY, MA, CT, RI, VT, NH, ME, NJ, PA',
    desc: 'One of the densest hospitality markets in the country. Big-city fine dining, boutique hotels, and year-round tourist traffic.',
    topics: ['NYC labor laws', 'Seasonal peak strategy', 'Hotel F&B alignment'],
    members: 84,
  },
  {
    id: 'southeast',
    flag: '🌴',
    name: 'Southeast',
    states: 'FL, GA, SC, NC, TN, AL, MS, LA',
    desc: 'Strong tourism economies, year-round hospitality demand, and a rich culinary culture across coastal and inland markets.',
    topics: ['Tip pooling rules by state', 'Resort staffing models', 'Southern hospitality standards'],
    members: 97,
  },
  {
    id: 'midwest',
    flag: '🌽',
    name: 'Midwest',
    states: 'IL, OH, MI, IN, WI, MN, IA, MO, KS, NE, SD, ND',
    desc: 'A mix of urban restaurant groups, independent operators, and strong convention hotel markets centered around Chicago and beyond.',
    topics: ['Independent vs. chain operations', 'Convention hotel staffing', 'Seasonal slowdowns'],
    members: 71,
  },
  {
    id: 'southwest',
    flag: '🌵',
    name: 'Southwest',
    states: 'TX, AZ, NM, OK',
    desc: 'High-growth markets in Texas and Arizona are driving rapid hospitality expansion, with unique staffing and cultural considerations.',
    topics: ['Texas A-licensing questions', 'High-growth market hiring', 'Heat-season staffing'],
    members: 62,
  },
  {
    id: 'mountain-west',
    flag: '🏔️',
    name: 'Mountain West',
    states: 'CO, UT, WY, MT, ID, NV',
    desc: 'Ski resort towns, Las Vegas, and mountain destination properties with extreme seasonal swings and unique staffing challenges.',
    topics: ['Resort season ramp-up', 'Off-season retention', 'Remote property operations'],
    members: 45,
  },
  {
    id: 'pacific',
    flag: '🌊',
    name: 'Pacific',
    states: 'CA, OR, WA, AK, HI',
    desc: 'California\'s complex labor laws, Pacific Northwest food culture, and Hawaiian resort hospitality make this one of the most diverse regions in the Guild.',
    topics: ['CA wage & hour compliance', 'Farm-to-table sourcing', 'Aloha service culture'],
    members: 108,
  },
  {
    id: 'canada',
    flag: '🍁',
    name: 'Canada',
    states: 'All provinces',
    desc: 'Canadian Guild members share a hospitality culture close to their American counterparts but with distinct regulatory and seasonal environments.',
    topics: ['Provincial labor law differences', 'Winter hospitality strategies', 'French-English bilingual service'],
    members: 29,
  },
  {
    id: 'international',
    flag: '🌍',
    name: 'International',
    states: 'Rest of World',
    desc: 'Guild members from outside North America connecting around universal hospitality principles with locally adapted practices.',
    topics: ['Cross-cultural service standards', 'International F&B trends', 'Global staffing models'],
    members: 22,
  },
]

export default async function RegionalPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/signin')

  const tier = await getEffectiveTier(session.user.id)
  const isMember = tierCanAccess(tier, 'MEMBER')

  return (
    <>
      <div className="dash-page-header">
        <div style={{ marginBottom: '8px' }}>
          <Link href="/dashboard/community" style={{ fontSize: '0.85rem', color: 'var(--text-light)', textDecoration: 'none' }}>
            ← Community
          </Link>
        </div>
        <h1>Regional Groups</h1>
        <p>Connect with Guild members in your market for locally relevant conversations and referrals.</p>
      </div>

      {!isMember && (
        <div className="upgrade-prompt" style={{ marginBottom: '32px' }}>
          <div className="upgrade-prompt__content">
            <h3>Regional Groups are a Member Feature</h3>
            <p>Upgrade to connect with managers in your market and join region-specific conversations.</p>
          </div>
          <Link href="/join" className="btn btn--upgrade">Upgrade — $29/mo</Link>
        </div>
      )}

      <div className="region-grid">
        {REGIONS.map(region => (
          <div key={region.id} className={`region-card${!isMember ? ' region-card--locked' : ''}`}>
            <div className="region-card__header">
              <span className="region-card__flag">{region.flag}</span>
              <div>
                <div className="region-card__name">{region.name}</div>
                <div className="region-card__states">{region.states}</div>
              </div>
              <div className="region-card__members">{region.members} members</div>
            </div>
            <p className="region-card__desc">{region.desc}</p>
            <div className="region-card__topics">
              <div className="region-card__topics-label">Hot topics:</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {region.topics.map(topic => (
                  <span key={topic} className="region-card__topic-tag">{topic}</span>
                ))}
              </div>
            </div>
            {isMember ? (
              <Link
                href="/dashboard/community/discussions"
                className="btn btn--outline-navy"
                style={{ fontSize: '0.82rem', padding: '8px 16px', marginTop: '16px', display: 'inline-block' }}
              >
                Join Conversation →
              </Link>
            ) : (
              <div style={{ marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-light)' }}>
                🔒 Member access required
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
