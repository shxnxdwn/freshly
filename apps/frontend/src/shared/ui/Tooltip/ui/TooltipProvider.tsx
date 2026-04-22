import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

export type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;

export const TooltipProvider = (props: TooltipProviderProps) => {
  const { delayDuration = 0, ...rest } = props;

  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...rest} />;
};
