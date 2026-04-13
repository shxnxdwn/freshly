import * as React from 'react';
import { Separator as SeparatorPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils';

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>;

export const Separator = (props: SeparatorProps) => {
  const { className, orientation = 'horizontal', decorative = true, ...rest } = props;

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
        className
      )}
      {...rest}
    />
  );
};
