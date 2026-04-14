import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SidebarMenuProps = React.ComponentProps<'ul'>;

export const SidebarMenu = (props: SidebarMenuProps) => {
  const { className, ...rest } = props;

  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-0', className)}
      {...rest}
    />
  );
};
