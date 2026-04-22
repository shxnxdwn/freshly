import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPrimitive.Portal>;

export const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
};
