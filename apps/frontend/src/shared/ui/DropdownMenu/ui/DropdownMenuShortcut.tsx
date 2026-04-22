import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type DropdownMenuShortcutProps = React.ComponentProps<'span'>;

export const DropdownMenuShortcut = (props: DropdownMenuShortcutProps) => {
  const { className, ...rest } = props;

  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest',
        className
      )}
      {...rest}
    />
  );
};
