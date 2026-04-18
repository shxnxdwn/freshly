'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';

export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;

export const SelectValue = (props: SelectValueProps) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
};
