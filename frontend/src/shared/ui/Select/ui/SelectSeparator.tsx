'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>;

export const SelectSeparator = (props: SelectSeparatorProps) => {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...rest}
    />
  );
};
