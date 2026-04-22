import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';

export type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>;

export const SheetPortal = (props: SheetPortalProps) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};
