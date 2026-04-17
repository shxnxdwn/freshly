import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type SidebarGroupLabelProps = React.ComponentProps<'div'> & { asChild?: boolean };

export const SidebarGroupLabel = (props: SidebarGroupLabelProps) => {
  const { className, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
      {...rest}
    />
  );
};
