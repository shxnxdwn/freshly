import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type FieldTitleProps = React.ComponentProps<'div'>;

export const FieldTitle = (props: FieldTitleProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="field-label"
      className={cn(
        'flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50',
        className
      )}
      {...rest}
    />
  );
};
