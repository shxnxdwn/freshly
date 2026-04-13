import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';

export type AlertDialogCancelProps = React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'>;

export const AlertDialogCancel = (props: AlertDialogCancelProps) => {
  const { className, variant = 'outline', size = 'default', ...rest } = props;

  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" className={cn(className)} {...rest} />
    </Button>
  );
};
