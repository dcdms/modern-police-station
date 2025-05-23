import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { cnBase as cn } from 'tailwind-variants'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Polaris',
  description:
    'Software that discover information about individuals from biometrical data.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="en">
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
