import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ProgressProvider } from '@/contexts/ProgressContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Grammarly — Master English Tenses for IELTS',
  description:
    'Practice grammar, vocabulary, speaking, and writing from beginner to advanced level with structured IELTS-style exercises. Focus on Present, Past, and Future tenses.',
  keywords: ['IELTS', 'English grammar', 'Present tense', 'language learning', 'speaking practice'],
  openGraph: {
    title: 'Grammarly — Master English Tenses for IELTS',
    description: 'A structured IELTS grammar learning platform — from beginner to advanced.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
