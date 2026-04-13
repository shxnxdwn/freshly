import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type AlertDescriptionProps = React.ComponentProps<'div'>;

export const AlertDescription = (props: AlertDescriptionProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
        className
      )}
      {...rest}
    />
  );
};
