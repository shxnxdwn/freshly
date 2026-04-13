import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export const CardFooter = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="card-footer"
      className={cn('bg-muted/50 flex items-center rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3', className)}
      {...rest}
    />
  );
};
