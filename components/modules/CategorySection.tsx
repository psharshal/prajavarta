import CategoryUnderline from '@/components/ui/CategoryUnderline'
import FeaturedCard from '@/components/cards/FeaturedCard'
import StandardCard from '@/components/cards/StandardCard'
import styles from './CategorySection.module.css'

interface CategorySectionProps {
  cat: string
  hero: string
  stories: string[]
}

export default function CategorySection({ cat, hero, stories }: CategorySectionProps) {
  return (
    <section style={{ padding: '8px 0 24px' }}>
      <CategoryUnderline name={cat} />

      {/* Mobile layout: featured + stacked list */}
      <div className={styles.mobileLayout}>
        <FeaturedCard category={cat} headline={hero} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
          {stories.map((s, i) => (
            <StandardCard key={i} category={cat} headline={s} />
          ))}
        </div>
      </div>

      {/* Desktop layout: 1.4fr + 1fr grid */}
      <div className={styles.desktopLayout}>
        <FeaturedCard category={cat} headline={hero} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {stories.map((s, i) => (
            <StandardCard key={i} category={cat} headline={s} layout="row" />
          ))}
        </div>
      </div>
    </section>
  )
}
