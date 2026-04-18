import * as React from 'react';
import { Textarea } from '@/shared/ui/Textarea';
import { cn } from '@/shared/lib/utils/cn';

export type InputGroupTextareaProps = React.ComponentProps<'textarea'>;

export const InputGroupTextarea = (props: InputGroupTextareaProps) => {
  const { className, ...rest } = props;

  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className
      )}
      {...rest}
    />
  );
};
