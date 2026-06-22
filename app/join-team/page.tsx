import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function JoinTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  if (!token) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>Invalid Invitation</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>This invitation link is missing or invalid.</p>
          <Link href="/" className="btn btn--outline-navy">Go Home</Link>
        </div>
      </main>
    )
  }

  const invite = await prisma.teamInvite.findUnique({
    where: { token },
    include: { owner: { select: { name: true } } },
  })

  if (!invite || invite.accepted || invite.expiresAt < new Date()) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>Invitation Expired</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>This invitation has already been used or has expired. Ask your manager to send a new one.</p>
          <Link href="/" className="btn btn--outline-navy">Go Home</Link>
        </div>
      </main>
    )
  }

  const session = await auth()

  if (!session?.user?.id) {
    redirect(`/signin?callbackUrl=/join-team?token=${token}`)
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { seatOf: true },
  })

  if (user?.email !== invite.email) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="signin-card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '1.6rem' }}>Wrong Account</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '8px' }}>
            This invitation was sent to <strong>{invite.email}</strong>.
          </p>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
            You&apos;re signed in as <strong>{user?.email}</strong>. Please sign in with the correct Google account.
          </p>
          <Link href={`/api/auth/signout?callbackUrl=/join-team?token=${token}`} className="btn btn--outline-navy">
            Sign in with a different account
          </Link>
        </div>
      </main>
    )
  }

  if (user?.seatOf) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>Already on a Team</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>You&apos;re already a member of a Guild team.</p>
          <Link href="/dashboard" className="btn btn--primary">Go to Dashboard</Link>
        </div>
      </main>
    )
  }

  const existingSeats = await prisma.businessSeat.count({ where: { ownerId: invite.ownerId } })
  if (existingSeats >= 4) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>Team Full</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>This team has reached its maximum seat count. Contact your manager.</p>
          <Link href="/" className="btn btn--outline-navy">Go Home</Link>
        </div>
      </main>
    )
  }

  await prisma.$transaction([
    prisma.businessSeat.create({
      data: { ownerId: invite.ownerId, memberId: session.user.id },
    }),
    prisma.teamInvite.update({
      where: { token },
      data: { accepted: true },
    }),
  ])

  redirect('/dashboard?joined=team')
}
