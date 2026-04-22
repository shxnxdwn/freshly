import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type FieldLegendProps = React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' };

export const FieldLegend = (props: FieldLegendProps) => {
  const { className, variant = 'legend', ...rest } = props;

  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className)}
      {...rest}
    />
  );
};
