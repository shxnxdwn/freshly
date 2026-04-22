import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type PopoverHeaderProps = React.ComponentProps<'div'>;

export const PopoverHeader = (props: PopoverHeaderProps) => {
  const { className, ...rest } = props;

  return <div data-slot="popover-header" className={cn('flex flex-col gap-0.5 text-sm', className)} {...rest} />;
};
