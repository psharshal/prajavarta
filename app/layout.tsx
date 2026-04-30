import type { Metadata } from 'next'
import { Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-en',
  display: 'swap',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-mr',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'प्रजावार्ता — मराठी बातम्या',
  description: 'मराठीतून विश्वासार्ह बातम्या · संपादकीय निष्ठा आणि वाचनीय अनुभव.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mr" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <body style={{ fontFamily: 'var(--font-en, system-ui, sans-serif)' }}>
        {children}
      </body>
    </html>
  )
}
