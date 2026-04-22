import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
};

export const DropdownMenuLabel = (props: DropdownMenuProps) => {
  const { className, inset, ...rest } = props;

  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn('text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7', className)}
      {...rest}
    />
  );
};
