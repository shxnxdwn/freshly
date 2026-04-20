'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';

import { PopoverAnchor } from './PopoverAnchor';
import { PopoverContent } from './PopoverContent';
import { PopoverDescription } from './PopoverDescription';
import { PopoverHeader } from './PopoverHeader';
import { PopoverTitle } from './PopoverTitle';
import { PopoverTrigger } from './PopoverTrigger';

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

export const PopoverRoot = (props: PopoverProps) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
};

export const Popover = Object.assign(PopoverRoot, {
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Description: PopoverDescription,
  Header: PopoverHeader,
  Title: PopoverTitle,
  Trigger: PopoverTrigger
});
