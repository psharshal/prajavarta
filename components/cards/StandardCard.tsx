import CategoryChip from '@/components/ui/CategoryChip'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Badge from '@/components/ui/Badge'
import Meta from '@/components/ui/Meta'

interface StandardCardProps {
  category: string
  headline: string
  layout?: 'row' | 'col'
  badge?: string
}

export default function StandardCard({ category, headline, layout = 'row', badge }: StandardCardProps) {
  if (layout === 'row') {
    return (
      <article style={{ display: 'grid', gridTemplateColumns: '112px 1fr', gap: 12, alignItems: 'start' }}>
        <div style={{ position: 'relative' }}>
          <ImagePlaceholder ratio="1/1" label="240×240" />
          {badge && <Badge type={badge} small />}
        </div>
        <div>
          <CategoryChip name={category} size="sm" />
          <h4
            className="mr"
            style={{
              margin: '6px 0 4px',
              fontSize: 15,
              lineHeight: 1.4,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            {headline}
          </h4>
          <Meta minutes={2} compact />
        </div>
      </article>
    )
  }

  return (
    <article>
      <div style={{ position: 'relative' }}>
        <ImagePlaceholder ratio="16/9" label="600×338" />
        {badge && <Badge type={badge} />}
      </div>
      <div style={{ paddingTop: 8 }}>
        <CategoryChip name={category} size="sm" />
        <h4
          className="mr"
          style={{
            margin: '6px 0 4px',
            fontSize: 16,
            lineHeight: 1.4,
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {headline}
        </h4>
        <Meta minutes={3} compact />
      </div>
    </article>
  )
}
