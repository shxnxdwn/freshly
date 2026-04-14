import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SidebarHeaderProps = React.ComponentProps<'div'>;

export const SidebarHeader = (props: SidebarHeaderProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...rest}
    />
  );
};
