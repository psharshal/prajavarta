interface LogoProps {
  big?: boolean
  inverted?: boolean
}

export default function Logo({ big, inverted }: LogoProps) {
  const color = inverted ? '#fff' : 'inherit'
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
      <span
        className="mr"
        style={{
          fontWeight: 800,
          fontSize: big ? 22 : 18,
          letterSpacing: '-0.01em',
          color,
        }}
      >
        प्रजावार्ता
      </span>
      <span
        style={{
          fontSize: 9,
          marginLeft: 6,
          opacity: 0.7,
          letterSpacing: '0.15em',
          fontWeight: 600,
          color,
        }}
      >
        .COM
      </span>
    </div>
  )
}
