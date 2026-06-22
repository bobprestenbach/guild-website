'use client'

export default function PrintButton({ label = 'Print Certificate' }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="btn btn--outline-navy"
      style={{ fontSize: '0.875rem' }}
    >
      🖨️ {label}
    </button>
  )
}
