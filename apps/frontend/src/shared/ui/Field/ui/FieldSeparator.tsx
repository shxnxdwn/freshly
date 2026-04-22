import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { Separator } from '@/shared/ui/Separator';

export type FieldSeparatorProps = React.ComponentProps<'div'> & {
  children?: React.ReactNode;
};

export const FieldSeparator = (props: FieldSeparatorProps) => {
  const { children, className, ...rest } = props;

  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className)}
      {...rest}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
};
