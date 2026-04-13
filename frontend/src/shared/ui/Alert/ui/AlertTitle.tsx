import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type AlertTitleProps = React.ComponentProps<'div'>;

export const AlertTitle = (props: AlertTitleProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="alert-title"
      className={cn(
        '[&_a]:hover:text-foreground font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3',
        className
      )}
      {...rest}
    />
  );
};
