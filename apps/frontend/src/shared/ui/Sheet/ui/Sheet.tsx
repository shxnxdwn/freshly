import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { SheetClose } from './SheetClose';
import { SheetContent } from './SheetContent';
import { SheetDescription } from './SheetDescription';
import { SheetFooter } from './SheetFooter';
import { SheetHeader } from './SheetHeader';
import { SheetOverlay } from './SheetOverlay';
import { SheetPortal } from './SheetPortal';
import { SheetTitle } from './SheetTitle';
import { SheetTrigger } from './SheetTrigger';

export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

export const SheetRoot = (props: SheetProps) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

export const Sheet = Object.assign(SheetRoot, {
  Close: SheetClose,
  Content: SheetContent,
  Description: SheetDescription,
  Footer: SheetFooter,
  Header: SheetHeader,
  Overlay: SheetOverlay,
  Portal: SheetPortal,
  Title: SheetTitle,
  Trigger: SheetTrigger
});
