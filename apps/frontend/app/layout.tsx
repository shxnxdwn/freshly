import * as React from 'react';
import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import '@/app/styles/globals.css';
import Providers from '@/app/Providers';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin', 'cyrillic']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic']
});

export const metadata: Metadata = {
  title: 'Freshly',
  description: 'Интернет магазин на Next.js'
};

export type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body className={`${interSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
