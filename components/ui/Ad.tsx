import { cache } from 'react'
import prisma from '@/lib/prisma'
import styles from './Ad.module.css'

// One DB call per request, shared across all <Ad> renders on the same page
const fetchBanner = cache(async () => {
  return prisma.mainAdvertisementBanner.findFirst({ orderBy: { id: 'desc' } })
})

interface AdProps {
  id?: string
  slot?: string
  name?: string
  size?: string
  width?: number
  height?: number
  sticky?: boolean
  fluid?: boolean
  style?: React.CSSProperties
  className?: string
}

export default async function Ad({ id, slot, name, size, width, height, sticky, fluid, style, className }: AdProps) {
  const banner = await fetchBanner()
  if (!banner) return null

  const adId = id ?? slot ?? 'ad'
  const adSize = size ?? '300×250'
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
      <div className={styles.adId}>{adId}</div>
      <div className={styles.adSize}>{adSize}</div>
      {name && <div className={styles.adName}>{name}</div>}
    </div>
  )
}
