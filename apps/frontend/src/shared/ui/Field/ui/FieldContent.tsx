import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type FieldContentProps = React.ComponentProps<'div'>;

export const FieldContent = (props: FieldContentProps) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="field-content"
      className={cn('group/field-content flex flex-1 flex-col gap-0.5 leading-snug', className)}
      {...rest}
    />
  );
};
