import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils';

export type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>;

export const SheetOverlay = (props: SheetOverlayProps) => {
  const { className, ...rest } = props;

  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
        className
      )}
      {...rest}
    />
  );
};
