'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { SelectGroup } from './SelectGroup';
import { SelectValue } from './SelectValue';
import { SelectTrigger } from './SelectTrigger';
import { SelectContent } from './SelectContent';
import { SelectLabel } from './SelectLabel';
import { SelectItem } from './SelectItem';
import { SelectSeparator } from './SelectSeparator';
import { SelectScrollUpButton } from './SelectScrollUpButton';
import { SelectScrollDownButton } from './SelectScrollDownButton';

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;

export const Select = (props: SelectProps) => {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
};

Object.assign(Select, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton
});
