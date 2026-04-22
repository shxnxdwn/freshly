import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type FieldSetProps = React.ComponentProps<'fieldset'>;

export const FieldSet = (props: FieldSetProps) => {
  const { className, ...rest } = props;

  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className
      )}
      {...rest}
    />
  );
};
