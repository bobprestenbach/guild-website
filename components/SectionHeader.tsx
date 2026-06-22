interface Props {
  title: string
  subtitle?: string
  id?: string
}

export default function SectionHeader({ title, subtitle, id }: Props) {
  return (
    <div className="section-header">
      <h2 id={id}>{title}</h2>
      <div className="section-divider" aria-hidden="true">◆</div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
