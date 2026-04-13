import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type AlertActionProps = React.ComponentProps<'div'>;

export const AlertAction = (props: AlertActionProps) => {
  const { className, ...rest } = props;

  return <div data-slot="alert-action" className={cn('absolute top-2 right-2', className)} {...rest} />;
};
