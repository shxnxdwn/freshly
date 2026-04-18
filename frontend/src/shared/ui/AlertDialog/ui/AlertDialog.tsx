import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { AlertDialogCancel } from './AlertDialogCancel';
import { AlertDialogTrigger } from './AlertDialogTrigger';
import { AlertDialogContent } from './AlertDialogContent';
import { AlertDialogHeader } from './AlertDialogHeader';
import { AlertDialogFooter } from './AlertDialogFooter';
import { AlertDialogMedia } from './AlertDialogMedia';
import { AlertDialogTitle } from './AlertDialogTitle';
import { AlertDialogDescription } from './AlertDialogDescription';
import { AlertDialogAction } from './AlertDialogAction';

export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>;

export const AlertDialog = (props: AlertDialogProps) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};

Object.assign(AlertDialog, {
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Media: AlertDialogMedia,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel
});
