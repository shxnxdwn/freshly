import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SidebarMenuSubProps = React.ComponentProps<'ul'>;

export const SidebarMenuSub = (props: SidebarMenuSubProps) => {
  const { className, ...rest } = props;

  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden',
        className
      )}
      {...rest}
    />
  );
};
