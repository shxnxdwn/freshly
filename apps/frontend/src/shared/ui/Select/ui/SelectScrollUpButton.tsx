'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';
import { ChevronUpIcon } from 'lucide-react';

export type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>;

export const SelectScrollUpButton = (props: SelectScrollUpButtonProps) => {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
};
