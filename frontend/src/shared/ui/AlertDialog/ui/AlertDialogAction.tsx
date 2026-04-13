import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';

export type AlertDialogActionProps = React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'>;

export const AlertDialogAction = (props: AlertDialogActionProps) => {
  const { className, variant = 'default', size = 'default', ...rest } = props;

  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action data-slot="alert-dialog-action" className={cn(className)} {...rest} />
    </Button>
  );
};
