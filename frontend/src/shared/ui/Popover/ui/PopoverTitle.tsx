import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type PopoverTitleProps = React.ComponentProps<'h2'>;

export const PopoverTitle = (props: PopoverTitleProps) => {
  const { className, ...rest } = props;

  return <div data-slot="popover-title" className={cn('font-medium', className)} {...rest} />;
};
