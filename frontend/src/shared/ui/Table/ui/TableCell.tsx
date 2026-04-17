import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type TableCellProps = React.ComponentProps<'td'>;

export const TableCell = (props: TableCellProps) => {
  const { className, ...rest } = props;

  return (
    <td
      data-slot="table-cell"
      className={cn('p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0', className)}
      {...rest}
    />
  );
};
