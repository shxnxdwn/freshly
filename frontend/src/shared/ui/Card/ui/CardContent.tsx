import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export const CardContent = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return <div data-slot="card-content" className={cn('px-4 group-data-[size=sm]/card:px-3', className)} {...rest} />;
};
