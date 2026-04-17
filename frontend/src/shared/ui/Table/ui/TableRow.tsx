import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type TableRowProps = React.ComponentProps<'tr'>;

export const TableRow = (props: TableRowProps) => {
  const { className, ...rest } = props;

  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className
      )}
      {...rest}
    />
  );
};
