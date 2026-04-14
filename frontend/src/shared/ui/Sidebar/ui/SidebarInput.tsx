import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/Input';

export type SidebarInputProps = React.ComponentProps<typeof Input>;

export const SidebarInput = (props: SidebarInputProps) => {
  const { className, ...rest } = props;

  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...rest}
    />
  );
};
