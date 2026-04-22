import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type PopoverDescriptionProps = React.ComponentProps<'p'>;

export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const { className, ...rest } = props;

  return <p data-slot="popover-description" className={cn('text-muted-foreground', className)} {...rest} />;
};
