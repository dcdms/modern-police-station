import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { cnBase as cn } from 'tailwind-variants'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Delegacia 5.0',
  description:
    'Software que descobre informações sobre indivíduos a partir de dados biométricos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="pt-BR">
      <body
        className={cn(
          spaceGrotesk.className,
          'bg-neutral-950 text-white antialiased',
        )}
      >
        {children}
      </body>
    </html>
  )
}
