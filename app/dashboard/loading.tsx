export default function DashboardLoading() {
  return (
    <div className="dash-skeleton">
      <div className="dash-skeleton__header">
        <div className="dash-skeleton__line dash-skeleton__line--sm" />
        <div className="dash-skeleton__line dash-skeleton__line--lg" />
      </div>
      <div className="dash-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dash-skeleton__card">
            <div className="dash-skeleton__icon" />
            <div className="dash-skeleton__line dash-skeleton__line--md" style={{ marginBottom: '8px' }} />
            <div className="dash-skeleton__line dash-skeleton__line--full" />
            <div className="dash-skeleton__line dash-skeleton__line--full" />
            <div className="dash-skeleton__line dash-skeleton__line--sm" style={{ marginTop: '8px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
