'use client';

import * as React from 'react';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';

const MobileContext = React.createContext<boolean | null>(null);

type MobileProviderProps = {
  serverIsMobile: boolean;
  breakpoint?: number;
  children: React.ReactNode;
};

export function useMobile(): boolean {
  const context = React.useContext(MobileContext);
  if (context === null) {
    throw new Error('[Next]: useMobile must be used within MobileProvider');
  }
  return context;
}

export function MobileProvider(props: MobileProviderProps) {
  const { serverIsMobile, breakpoint, children } = props;
  const isMobile = useIsMobile(serverIsMobile, breakpoint);

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
}
