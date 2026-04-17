import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export const CardAction = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...rest}
    />
  );
};
