'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

export type TableProps = React.ComponentProps<'table'>;

export const TableRoot = (props: TableProps) => {
  const { className, ...rest } = props;

  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={cn('w-full caption-bottom text-sm', className)} {...rest} />
    </div>
  );
};

export const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow
});
