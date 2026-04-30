import styles from './ZoneTag.module.css'

interface ZoneTagProps {
  children: React.ReactNode
  color?: string
  style?: React.CSSProperties
}

export default function ZoneTag({ children, color, style }: ZoneTagProps) {
  return (
    <div
      className={styles.zoneTag}
      style={{ color: color || 'var(--brand-primary)', ...style }}
    >
      {children}
    </div>
  )
}
