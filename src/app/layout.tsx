import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Faucet Token Web',
  description: 'Get ETH on your tesnet wallet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-400">{children}</body>
    </html>
  )
}
