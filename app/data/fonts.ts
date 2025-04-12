import { Geist, Geist_Mono } from 'next/font/google';
import { Inter } from 'next/font/google';

// Initialize the Inter font
export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

// Initialize Geist font (for headings)
export const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist',
})

// Initialize Geist Mono (for code blocks)
export const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
})