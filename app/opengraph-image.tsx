import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'The Hospitality Guild — Build Better Teams. Elevate the Industry.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4A0F1C 0%, #6B1528 60%, #8C2035 100%)',
          fontFamily: 'Georgia, serif',
          padding: '60px',
        }}
      >
        {/* Gold top border */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#B8942A' }} />

        {/* Crest placeholder */}
        <div
          style={{
            width: '80px',
            height: '80px',
            border: '3px solid #B8942A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            background: 'rgba(184,148,42,0.12)',
          }}
        >
          <span style={{ fontSize: '40px' }}>⚜</span>
        </div>

        {/* Wordmark */}
        <div style={{ fontSize: '22px', color: '#B8942A', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>
          THE HOSPITALITY GUILD
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 700,
            color: '#F2ECD8',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Build Better Teams.<br />Elevate the Industry.
        </div>

        {/* Tagline */}
        <div style={{ fontSize: '22px', color: '#C8B08A', textAlign: 'center', maxWidth: '700px', lineHeight: 1.5 }}>
          Training, community, and resources built exclusively for hospitality professionals.
        </div>

        {/* Gold bottom border */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: '#B8942A' }} />
      </div>
    ),
    size,
  )
}
