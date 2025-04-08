import './globals.css'
import type { Metadata } from 'next/metadata'
import { Geist, Geist_Mono } from 'next/font/google'
import { Inter } from 'next/font/google'
import Header from '@/components/project/fundamentals/Header'

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Initialize Geist font (for headings)
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

// Initialize Geist Mono (for code blocks)
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Astra UI',
  description: 'Astra UI is an open-source UI library for Next.js, offering accessible, production-ready components to power your next project with ease. Try it today!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="w-full h-full flex-center">
        <main className="w-[90vw] md:w-[92.5vw] lg:w-[95vw]">
          <div className="mb-32">
          <Header />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}