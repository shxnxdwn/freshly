'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';
import { ChevronDownIcon } from 'lucide-react';

export type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>;

export const SelectScrollDownButton = (props: SelectScrollDownButtonProps) => {
  const { className, ...rest } = props;

  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
};
