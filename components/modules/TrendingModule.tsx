import CategoryUnderline from '@/components/ui/CategoryUnderline'
import CompactListItem from '@/components/cards/CompactListItem'

interface TrendingItem {
  c: string
  h: string
}

interface TrendingModuleProps {
  items: TrendingItem[]
  label?: string
}

export default function TrendingModule({ items, label = 'ट्रेंडिंग' }: TrendingModuleProps) {
  return (
    <section>
      <CategoryUnderline name="Maharashtra" label={label} />
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <CompactListItem key={i} n={i + 1} headline={item.h} category={item.c} />
        ))}
      </ol>
    </section>
  )
}
