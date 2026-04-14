import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SidebarGroupProps = React.ComponentProps<'div'>;

export const SidebarGroup = (props: SidebarGroupProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...rest}
    />
  );
};
