import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type AlertDialogMediaProps = React.ComponentProps<'div'>;

export const AlertDialogMedia = (props: AlertDialogMediaProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...rest}
    />
  );
};
