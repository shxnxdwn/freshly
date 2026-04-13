import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils';

export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>;

export const AlertDialogTitle = (props: AlertDialogTitleProps) => {
  const { className, ...rest } = props;

  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        'text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
        className
      )}
      {...rest}
    />
  );
};
