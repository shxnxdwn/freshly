import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils';

export type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

export const SheetTitle = (props: SheetTitleProps) => {
  const { className, ...rest } = props;

  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground text-base font-medium', className)}
      {...rest}
    />
  );
};
