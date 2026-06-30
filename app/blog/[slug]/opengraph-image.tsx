import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostOgImage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  const title = post?.title ?? 'The Hospitality Guild Blog'
  const badge = post?.badge ?? 'Article'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(160deg, #4A0F1C 0%, #6B1528 55%, #3a0c16 100%)',
          fontFamily: 'Georgia, serif',
          padding: '0',
        }}
      >
        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: '#B8942A' }} />

        {/* Wordmark */}
        <div style={{ position: 'absolute', top: '40px', left: '56px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '28px' }}>⚜</span>
          <span style={{ fontSize: '16px', color: '#B8942A', letterSpacing: '3px', textTransform: 'uppercase' }}>THE HOSPITALITY GUILD</span>
        </div>

        {/* Content */}
        <div style={{ padding: '56px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Category badge */}
          <div style={{
            display: 'flex',
            alignSelf: 'flex-start',
            background: 'rgba(184,148,42,0.2)',
            border: '1px solid #B8942A',
            borderRadius: '4px',
            padding: '6px 14px',
            fontSize: '13px',
            color: '#B8942A',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}>
            {badge}
          </div>

          {/* Title */}
          <div style={{
            fontSize: title.length > 60 ? '40px' : '50px',
            fontWeight: 700,
            color: '#F2ECD8',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}>
            {title}
          </div>

          {/* Divider */}
          <div style={{ width: '60px', height: '3px', background: '#B8942A' }} />

          {/* Byline */}
          <div style={{ fontSize: '17px', color: 'rgba(232,223,192,0.65)' }}>
            thehospitalityguild.com/blog
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', background: '#B8942A' }} />
      </div>
    ),
    size,
  )
}
