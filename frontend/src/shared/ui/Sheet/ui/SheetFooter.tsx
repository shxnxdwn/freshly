import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type SheetFooterProps = React.ComponentProps<'div'>;

export const SheetFooter = (props: SheetFooterProps) => {
  const { className, ...rest } = props;

  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...rest} />;
};
