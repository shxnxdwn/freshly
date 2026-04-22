import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type TableFooterProps = React.ComponentProps<'tfoot'>;

export const TableFooter = (props: TableFooterProps) => {
  const { className, ...rest } = props;

  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...rest}
    />
  );
};
