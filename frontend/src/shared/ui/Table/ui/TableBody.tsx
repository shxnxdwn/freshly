import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type TableBodyProps = React.ComponentProps<'tbody'>;

export const TableBody = (props: TableBodyProps) => {
  const { className, ...rest } = props;

  return <tbody data-slot="table-body" className={cn('[&_tr:last-child]:border-0', className)} {...rest} />;
};
