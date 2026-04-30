export default function Newsletter() {
  return (
    <div
      style={{
        background: 'var(--brand-primary-light)',
        padding: 20,
        borderLeft: '3px solid var(--brand-primary)',
      }}
    >
      <div
        className="mr"
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--brand-primary)',
          marginBottom: 6,
        }}
      >
        दैनिक न्यूजलेटर
      </div>
      <p
        className="mr"
        style={{
          margin: '0 0 12px',
          fontSize: 13,
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
        }}
      >
        दिवसाच्या मुख्य बातम्या थेट आपल्या इनबॉक्समध्ये.
      </p>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          type="email"
          placeholder="email@example.com"
          style={{
            flex: 1,
            padding: '8px 10px',
            border: '1px solid var(--border-default)',
            borderRadius: 3,
            fontSize: 13,
            background: '#fff',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          style={{
            background: 'var(--brand-primary)',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: 3,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Subscribe
        </button>
      </div>
    </div>
  )
}
