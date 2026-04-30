import CategoryChip from '@/components/ui/CategoryChip'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Meta from '@/components/ui/Meta'
import styles from './HeroCard.module.css'

interface HeroCardProps {
  category: string
  headline: string
  subtitle?: string
}

export default function HeroCard({ category, headline, subtitle }: HeroCardProps) {
  return (
    <article>
      <ImagePlaceholder ratio="16/9" label="hero image · 1200×675" />
      <div className={styles.body}>
        <CategoryChip name={category} />
        <h2 className={`mr ${styles.headline}`}>{headline}</h2>
        {subtitle && (
          <p className={`mr ${styles.subtitle}`}>{subtitle}</p>
        )}
        <Meta author="संपादकीय टीम" minutes={4} />
      </div>
    </article>
  )
}
