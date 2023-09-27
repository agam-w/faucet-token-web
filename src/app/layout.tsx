import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wallet Faucet',
  description: 'Get ETH on your tesnet wallet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-300">{children}</body>
    </html>
  )
}
