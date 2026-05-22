'use client';

import * as React from 'react';
import { Sidebar } from '@/shared/ui/Sidebar';
import { Tooltip } from '@/shared/ui/Tooltip';
import { NextIntlClientProvider } from 'next-intl';

export type ProvidersProps = { children: React.ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextIntlClientProvider>
      <Sidebar.Provider>
        <Tooltip.Provider>{children}</Tooltip.Provider>
      </Sidebar.Provider>
    </NextIntlClientProvider>
  );
}
