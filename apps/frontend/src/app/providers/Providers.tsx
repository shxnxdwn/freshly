'use client';

import * as React from 'react';
import { Tooltip } from '@/shared/ui/Tooltip';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { MobileProvider } from './MobileProvider';

export type ProvidersProps = {
  locale: string;
  messages: AbstractIntlMessages;
  serverIsMobile: boolean;
  children: React.ReactNode;
};

export default function Providers({ locale, messages, serverIsMobile, children }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MobileProvider serverIsMobile={serverIsMobile}>
        <Tooltip.Provider>{children}</Tooltip.Provider>
      </MobileProvider>
    </NextIntlClientProvider>
  );
}
