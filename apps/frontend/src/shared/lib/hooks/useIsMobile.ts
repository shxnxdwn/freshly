'use client';

import * as React from 'react';

const DEFAULT_BREAKPOINT = 768;

export function useIsMobile(serverIsMobile: boolean, breakpoint: number = DEFAULT_BREAKPOINT): boolean {
  const query = `(max-width: ${breakpoint}px)`;

  const subscribe = React.useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    [query]
  );

  const getSnapshot = React.useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = React.useCallback(() => serverIsMobile, [serverIsMobile]);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
