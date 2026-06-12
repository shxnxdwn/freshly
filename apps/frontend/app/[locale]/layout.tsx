import * as React from 'react';
import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import '@/app/styles/globals.css';
import Providers from '@/app/providers/Providers';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin', 'cyrillic']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic']
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('title'),
    description: t('description')
  };
}

export type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();
  const headersList = await headers();
  const serverIsMobile = headersList.get('x-is-mobile') === 'true';

  return (
    <html lang="ru">
      <body className={`${interSans.variable} ${geistMono.variable} antialiased`}>
        <Providers locale={locale} messages={messages} serverIsMobile={serverIsMobile}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
