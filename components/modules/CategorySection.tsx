import CategoryUnderline from '@/components/ui/CategoryUnderline'
import FeaturedCard from '@/components/cards/FeaturedCard'
import StandardCard from '@/components/cards/StandardCard'
import styles from './CategorySection.module.css'

interface HeroItem {
  title: string
  slug: string
  featuredImage?: string
}

interface StoryItem {
  title: string
  slug: string
}

interface CategorySectionProps {
  cat: string
  hero: HeroItem | string
  stories: StoryItem[] | string[]
}

export default function CategorySection({ cat, hero, stories }: CategorySectionProps) {
  const heroTitle = typeof hero === 'string' ? hero : hero.title
  const heroHref = typeof hero === 'string' ? undefined : '/news/' + hero.slug
  const heroImg = typeof hero === 'string' ? undefined : hero.featuredImage ?? undefined

  return (
    <section style={{ padding: '8px 0 24px' }}>
      <CategoryUnderline name={cat} />

      {/* Mobile layout: featured + stacked list */}
      <div className={styles.mobileLayout}>
        <FeaturedCard category={cat} headline={heroTitle} href={heroHref} imageSrc={heroImg} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
          {stories.map((s, i) => {
            const storyTitle = typeof s === 'string' ? s : s.title
            const storyHref = typeof s === 'string' ? undefined : '/news/' + s.slug
            return <StandardCard key={i} category={cat} headline={storyTitle} href={storyHref} />
          })}
        </div>
      </div>

      {/* Desktop layout: 1.4fr + 1fr grid */}
      <div className={styles.desktopLayout}>
        <FeaturedCard category={cat} headline={heroTitle} href={heroHref} imageSrc={heroImg} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {stories.map((s, i) => {
            const storyTitle = typeof s === 'string' ? s : s.title
            const storyHref = typeof s === 'string' ? undefined : '/news/' + s.slug
            return <StandardCard key={i} category={cat} headline={storyTitle} layout="row" href={storyHref} />
          })}
        </div>
      </div>
    </section>
  )
}
