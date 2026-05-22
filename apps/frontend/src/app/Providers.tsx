'use client';

import * as React from 'react';
import { Sidebar } from '@/shared/ui/Sidebar';
import { Tooltip } from '@/shared/ui/Tooltip';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

export type ProvidersProps = {
  locale: string;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
};

export default function Providers(props: ProvidersProps) {
  const { locale, messages, children } = props;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Sidebar.Provider>
        <Tooltip.Provider>{children}</Tooltip.Provider>
      </Sidebar.Provider>
    </NextIntlClientProvider>
  );
}
