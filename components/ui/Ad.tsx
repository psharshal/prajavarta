import styles from './Ad.module.css'

interface AdProps {
  id: string
  name?: string
  size: string
  width?: number
  height?: number
  sticky?: boolean
  fluid?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function Ad({ id, name, size, width, height, sticky, fluid, style, className }: AdProps) {
  return (
    <div
      className={`adPlaceholder ${styles.ad} ${className || ''}`}
      style={{
        width: fluid ? '100%' : width ? width : '100%',
        height: height || 'auto',
        minHeight: height || 60,
        ...style,
      }}
    >
      {sticky && <span className={styles.stickyBadge}>STICKY</span>}
      <div className={styles.label}>जाहिरात · Advertisement</div>
      <div className={styles.adId}>{id}</div>
      <div className={styles.adSize}>{size}</div>
      {name && <div className={styles.adName}>{name}</div>}
    </div>
  )
}
