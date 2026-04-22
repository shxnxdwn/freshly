import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type SidebarContentProps = React.ComponentProps<'div'>;

export const SidebarContent = (props: SidebarContentProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...rest}
    />
  );
};
