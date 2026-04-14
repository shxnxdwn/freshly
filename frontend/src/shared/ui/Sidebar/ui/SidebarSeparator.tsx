import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/Separator';

export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;

export const SidebarSeparator = (props: SidebarSeparatorProps) => {
  const { className, ...rest } = props;

  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...rest}
    />
  );
};
