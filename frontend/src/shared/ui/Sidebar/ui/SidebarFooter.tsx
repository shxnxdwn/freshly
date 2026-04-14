import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SidebarFooterProps = React.ComponentProps<'div'>;

export const SidebarFooter = (props: SidebarFooterProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...rest}
    />
  );
};
