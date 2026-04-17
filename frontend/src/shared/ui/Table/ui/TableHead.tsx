import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type TableHeadProps = React.ComponentProps<'th'>;

export const TableHead = (props: TableHeadProps) => {
  const { className, ...rest } = props;

  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...rest}
    />
  );
};
