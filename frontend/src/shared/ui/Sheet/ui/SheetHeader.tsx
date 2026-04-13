import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type SheetHeaderProps = React.ComponentProps<'div'>;

export const SheetHeader = (props: SheetHeaderProps) => {
  const { className, ...rest } = props;

  return <div data-slot="sheet-header" className={cn('flex flex-col gap-0.5 p-4', className)} {...rest} />;
};
