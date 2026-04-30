import { catColor } from '@/lib/catColors'

interface CategoryUnderlineProps {
  name: string
  label?: string
}

export default function CategoryUnderline({ name, label }: CategoryUnderlineProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `3px solid ${catColor(name)}`,
        paddingBottom: 8,
        marginBottom: 16,
      }}
    >
      <h3
        className="mr"
        style={{
          margin: 0,
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--text-primary)',
        }}
      >
        {label || name}
      </h3>
      <a
        className="mr"
        style={{
          fontSize: 12,
          color: catColor(name),
          fontWeight: 600,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        सर्व पहा →
      </a>
    </div>
  )
}
