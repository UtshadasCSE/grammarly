import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ProgressProvider } from '@/contexts/ProgressContext';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
