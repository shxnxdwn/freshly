import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type FieldGroupProps = React.ComponentProps<'div'>;

export const FieldGroup = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className
      )}
      {...rest}
    />
  );
};
