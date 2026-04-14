import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SidebarGroupContentProps = React.ComponentProps<'div'>;

export const SidebarGroupContent = (props: SidebarGroupContentProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...rest}
    />
  );
};
