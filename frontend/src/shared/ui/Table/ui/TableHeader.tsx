import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type TableHeaderProps = React.ComponentProps<'thead'>;

export const TableHeader = (props: TableHeaderProps) => {
  const { className, ...rest } = props;

  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...rest} />;
};
