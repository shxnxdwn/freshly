import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SidebarMenuItemProps = React.ComponentProps<'li'>;

export const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  const { className, ...rest } = props;

  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...rest}
    />
  );
};
