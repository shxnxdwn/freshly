import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export const CardDescription = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...rest} />;
};
