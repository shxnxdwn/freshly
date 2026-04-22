import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

export type DropdownMenuSubProps = React.ComponentProps<typeof DropdownMenuPrimitive.Sub>;

export const DropdownMenuSub = ({ ...props }: DropdownMenuSubProps) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
};
