import type { Metadata } from 'next'
import { Allison, Pinyon_Script, Quattrocento, Roboto_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const allison = Allison({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-allison',
})

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
})

const quattrocento = Quattrocento({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-quattrocento',
})

const robotoMono = Roboto_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Lesedi & Leeroy - Wedding Invitation',
  description: 'You are cordially invited to celebrate the wedding of Lesedi and Leeroy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${allison.variable} ${pinyonScript.variable} ${quattrocento.variable} ${robotoMono.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
