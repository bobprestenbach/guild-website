import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM = 'The Hospitality Guild <no-reply@thehospitalityguild.com>'

async function send(to: string, subject: string, html: string) {
  if (!resend) return
  await resend.emails.send({ from: FROM, to, subject, html })
}

const base = (content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f2ecd8;font-family:Georgia,serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2ecd8;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
        <tr>
          <td style="background:#4a0f1c;padding:28px 40px;text-align:center;border-radius:8px 8px 0 0">
            <p style="margin:0;color:#b8942a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase">The Hospitality Guild</p>
            <p style="margin:6px 0 0;color:rgba(232,223,192,0.6);font-size:9px;letter-spacing:0.1em;text-transform:uppercase">Fide et Hospitalitate</p>
          </td>
        </tr>
        <tr>
          <td style="background:#fff;padding:40px;border-radius:0 0 8px 8px">
            ${content}
            <hr style="border:none;border-top:1px solid #e8dfc0;margin:32px 0 20px">
            <p style="margin:0;font-size:12px;color:#999;text-align:center">The Hospitality Guild · <a href="https://thehospitalityguild.com" style="color:#6b1528">thehospitalityguild.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

export async function sendWelcomeEmail(to: string, name: string) {
  const firstName = name?.split(' ')[0] ?? 'there'
  await send(to, 'Welcome to The Hospitality Guild', base(`
    <h1 style="margin:0 0 8px;font-size:26px;color:#4a0f1c">Welcome, ${firstName}.</h1>
    <p style="margin:0 0 20px;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">You're now a Guild Explorer</p>
    <p style="color:#333;line-height:1.7;margin:0 0 16px">You've just joined a community of hospitality managers who are serious about building better teams and running better operations. We're glad you're here.</p>
    <p style="color:#333;line-height:1.7;margin:0 0 28px">Your Explorer membership gives you access to our free training course, community basics, and a growing library of downloadable resources. When you're ready to go deeper, upgrade to Member for full access.</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="background:#6b1528;border-radius:4px">
      <a href="https://thehospitalityguild.com/dashboard" style="display:inline-block;padding:14px 28px;color:#fff;text-decoration:none;font-size:14px;font-weight:600">Go to Your Dashboard →</a>
    </td></tr></table>
  `))
}

export async function sendPaymentConfirmationEmail(to: string, name: string, tier: string, amount: string) {
  const firstName = name?.split(' ')[0] ?? 'there'
  const tierLabel = tier === 'BUSINESS' ? 'Business' : 'Member'
  await send(to, `Your Guild ${tierLabel} membership is active`, base(`
    <h1 style="margin:0 0 8px;font-size:26px;color:#4a0f1c">You're in, ${firstName}.</h1>
    <p style="margin:0 0 24px;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">Guild ${tierLabel} — ${amount}/month</p>
    <p style="color:#333;line-height:1.7;margin:0 0 16px">Your membership is now active and you have full access to everything the Guild has to offer. Here's what's waiting for you:</p>
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 28px">
      ${tier === 'BUSINESS' ? `
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e8d0;color:#333;font-size:14px">🏆 &nbsp;Full training library + all future courses</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e8d0;color:#333;font-size:14px">👥 &nbsp;Up to 5 team seat accounts</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e8d0;color:#333;font-size:14px">📊 &nbsp;Manager dashboard & team progress tracking</td></tr>
        <tr><td style="padding:10px 0;color:#333;font-size:14px">📞 &nbsp;1-on-1 onboarding call with our team</td></tr>
      ` : `
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e8d0;color:#333;font-size:14px">🎓 &nbsp;Full access to all training tracks & courses</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e8d0;color:#333;font-size:14px">📁 &nbsp;Complete template & SOP library</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f0e8d0;color:#333;font-size:14px">📅 &nbsp;Live monthly webinars & workshops</td></tr>
        <tr><td style="padding:10px 0;color:#333;font-size:14px">💼 &nbsp;Job board access & Guild certifications</td></tr>
      `}
    </table>
    <table cellpadding="0" cellspacing="0"><tr><td style="background:#6b1528;border-radius:4px">
      <a href="https://thehospitalityguild.com/dashboard" style="display:inline-block;padding:14px 28px;color:#fff;text-decoration:none;font-size:14px;font-weight:600">Start Exploring →</a>
    </td></tr></table>
    <p style="margin:24px 0 0;font-size:13px;color:#999">Questions? Reply to this email and we'll get back to you within one business day.</p>
  `))
}

export async function sendTeamInviteEmail(to: string, ownerName: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://thehospitalityguild.com'
  await send(to, `${ownerName} has invited you to join The Hospitality Guild`, base(`
    <h1 style="margin:0 0 8px;font-size:26px;color:#4a0f1c">You're invited.</h1>
    <p style="margin:0 0 24px;color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.06em">Guild Business Team Seat</p>
    <p style="color:#333;line-height:1.7;margin:0 0 16px"><strong>${ownerName}</strong> has invited you to join their team on The Hospitality Guild. As a team member, you'll get full access to all Member training courses, resources, and the community — at no cost to you.</p>
    <p style="color:#333;line-height:1.7;margin:0 0 28px">Click below to accept your invitation. You'll sign in with Google and be added to the team instantly.</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="background:#6b1528;border-radius:4px">
      <a href="${appUrl}/join-team?token=${token}" style="display:inline-block;padding:14px 28px;color:#fff;text-decoration:none;font-size:14px;font-weight:600">Accept Invitation →</a>
    </td></tr></table>
    <p style="margin:24px 0 0;font-size:12px;color:#bbb">This invitation expires in 7 days. If you weren't expecting this invitation, you can safely ignore this email.</p>
  `))
}
