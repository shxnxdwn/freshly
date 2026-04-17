import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>;

export const SheetDescription = (props: SheetDescriptionProps) => {
  const { className, ...rest } = props;

  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  );
};
