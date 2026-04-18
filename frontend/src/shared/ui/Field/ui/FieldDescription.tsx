import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type FieldDescriptionProps = React.ComponentProps<'p'>;

export const FieldDescription = (props: FieldDescriptionProps) => {
  const { className, ...rest } = props;

  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-muted-foreground text-left text-sm leading-normal font-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
        'last:mt-0 nth-last-2:-mt-1',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...rest}
    />
  );
};
