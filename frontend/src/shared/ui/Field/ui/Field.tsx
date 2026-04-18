'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils/cn';
import { FieldDescription } from './FieldDescription';
import { FieldError } from './FieldError';
import { FieldGroup } from './FieldGroup';
import { FieldLegend } from './FieldLegend';
import { FieldSeparator } from './FieldSeparator';
import { FieldContent } from './FieldContent';
import { FieldTitle } from './FieldTitle';
import { FieldSet } from './FieldSet';
import { FieldLabel } from './FieldLabel';

export const fieldVariants = cva('group/field flex w-full gap-2 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
      horizontal:
        'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      responsive:
        'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
});

export type FieldProps = React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>;

export const Field = (props: FieldProps) => {
  const { className, orientation = 'vertical', ...rest } = props;

  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...rest}
    />
  );
};

Object.assign(Field, {
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
  Group: FieldGroup,
  Legend: FieldLegend,
  Separator: FieldSeparator,
  Set: FieldSet,
  Content: FieldContent,
  Title: FieldTitle
});
