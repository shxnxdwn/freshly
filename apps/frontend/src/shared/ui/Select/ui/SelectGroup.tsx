'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

export const SelectGroup = (props: SelectGroupProps) => {
  const { className, ...rest } = props;

  return <SelectPrimitive.Group data-slot="select-group" className={cn('scroll-my-1 p-1', className)} {...rest} />;
};
