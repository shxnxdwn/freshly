import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type DropdownMenuSeparatorProps = React.ComponentProps<typeof DropdownMenuPrimitive.Separator>;

export const DropdownMenuSeparator = (props: DropdownMenuSeparatorProps) => {
  const { className, ...rest } = props;

  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...rest}
    />
  );
};
