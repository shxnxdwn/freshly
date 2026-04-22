import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>;

export const DropdownMenuSubContent = (props: DropdownMenuSubContentProps) => {
  const { className, ...rest } = props;

  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 min-w-24 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg p-1 shadow-lg ring-1 duration-100',
        className
      )}
      {...rest}
    />
  );
};
