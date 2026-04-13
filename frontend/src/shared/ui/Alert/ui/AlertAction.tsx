import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export const AlertAction = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return <div data-slot="alert-action" className={cn('absolute top-2 right-2', className)} {...rest} />;
};
