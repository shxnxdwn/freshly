import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

export type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>;

export const AlertDialogTrigger = (props: AlertDialogTriggerProps) => {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
};
