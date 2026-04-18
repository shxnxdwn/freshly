'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { TooltipContent } from './TooltipContent';
import { TooltipProvider } from './TooltipProvider';
import { TooltipTrigger } from './TooltipTrigger';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

export const Tooltip = (props: TooltipProps) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
};

Object.assign(Tooltip, {
  Content: TooltipContent,
  Provider: TooltipProvider,
  Trigger: TooltipTrigger
});
