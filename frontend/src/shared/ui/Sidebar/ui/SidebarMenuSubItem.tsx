import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type SidebarMenuSubItemProps = React.ComponentProps<'li'>;

export const SidebarMenuSubItem = (props: SidebarMenuSubItemProps) => {
  const { className, ...rest } = props;

  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...rest}
    />
  );
};
