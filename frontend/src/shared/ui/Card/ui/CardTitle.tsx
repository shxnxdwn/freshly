import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export const CardTitle = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="card-title"
      className={cn('text-base leading-snug font-medium group-data-[size=sm]/card:text-sm', className)}
      {...rest}
    />
  );
};
