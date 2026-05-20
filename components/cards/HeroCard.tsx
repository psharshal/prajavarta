import CategoryChip from '@/components/ui/CategoryChip'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Meta from '@/components/ui/Meta'
import styles from './HeroCard.module.css'

interface HeroCardProps {
  category: string
  headline: string
  subtitle?: string
  href?: string
  imageSrc?: string
}

export default function HeroCard({ category, headline, subtitle, href, imageSrc }: HeroCardProps) {
  const inner = (
    <article>
      <ImagePlaceholder ratio="16/9" label="hero image · 1200×675" src={imageSrc} />
      <div className={styles.body}>
        <CategoryChip name={category} />
        <h2 className={`mr ${styles.headline}`}>{headline}</h2>
        {subtitle && (
          <p className={`mr ${styles.subtitle}`}>{subtitle}</p>
        )}
        <Meta author="संपादकीय टीம" minutes={4} />
      </div>
    </article>
  )
  return href ? <a href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a> : inner
}
