import prisma from '@/lib/prisma'

export default async function BreakingStrip() {
  const breakingNews = await prisma.news.findMany({
    where: { status: 'PUBLISHED', isActive: true, isBreakingNews: true },
    orderBy: { publishedDate: 'desc' },
    take: 5,
    select: { title: true, slug: true },
  })

  const ticker = breakingNews.length > 0
    ? breakingNews.map((n) => n.title).join(' · ') + ' ·'
    : 'ताज्या बातम्यांसाठी प्रजावार्ताशी जुळलेले रहा ·'

  return (
    <div
      style={{
        height: 40,
        background: 'var(--color-breaking)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        overflow: 'hidden',
        gap: 12,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.08em',
          padding: '3px 8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 3,
          flexShrink: 0,
        }}
      >
        BREAKING
      </span>
      <span
        className="mr"
        style={{
          fontSize: 13,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {ticker}
      </span>
    </div>
  )
}
