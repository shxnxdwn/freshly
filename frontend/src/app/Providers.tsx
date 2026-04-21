'use client';

import * as React from 'react';
import { Sidebar } from '@/shared/ui/Sidebar';
import { Tooltip } from '@/shared/ui/Tooltip';

export type ProvidersProps = { children: React.ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <Sidebar.Provider>
      <Tooltip.Provider>{children}</Tooltip.Provider>
    </Sidebar.Provider>
  );
}
