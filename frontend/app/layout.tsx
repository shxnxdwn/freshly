import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import '@/app/globals.css';
import type { ReactNode } from 'react';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic']
});

export const metadata: Metadata = {
  title: 'Freshly',
  description: 'Интернет магазин на Next.js'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${interSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
