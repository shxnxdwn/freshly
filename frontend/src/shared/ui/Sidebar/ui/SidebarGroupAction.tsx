import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@/shared/lib/utils';

export type SidebarGroupActionProps = React.ComponentProps<'button'> & { asChild?: boolean };

export const SidebarGroupAction = (props: SidebarGroupActionProps) => {
  const { className, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0',
        className
      )}
      {...rest}
    />
  );
};
