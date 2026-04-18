'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>;

export const SelectLabel = (props: SelectLabelProps) => {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-1.5 py-1 text-xs', className)}
      {...rest}
    />
  );
};
