import * as React from 'react';
import { Input } from '@/shared/ui/Input';
import { cn } from '@/shared/lib/utils/cn';

export type InputGroupInputProps = React.ComponentProps<'input'>;

export const InputGroupInput = (props: InputGroupInputProps) => {
  const { className, ...rest } = props;

  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className
      )}
      {...rest}
    />
  );
};
