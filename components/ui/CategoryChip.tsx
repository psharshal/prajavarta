import { catColor } from '@/lib/catColors'

interface CategoryChipProps {
  name?: string
  label?: string
  size?: 'sm' | 'md'
}

export default function CategoryChip({ name, label, size = 'md' }: CategoryChipProps) {
  const display = name ?? label ?? ''
  const padding = size === 'sm' ? '3px 8px' : '5px 10px'
  const fontSize = size === 'sm' ? 10 : 11

  return (
    <span
      className="mr"
      style={{
        display: 'inline-block',
        padding,
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: '#fff',
        background: catColor(display),
        borderRadius: 2,
        textTransform: 'uppercase',
      }}
    >
      {display}
    </span>
  )
}
