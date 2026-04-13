import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils';

export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>;

export const AlertDialogDescription = (props: AlertDialogDescriptionProps) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        'text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3',
        className
      )}
      {...rest}
    />
  );
};
