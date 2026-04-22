import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { PaginationPrevious } from './PaginationPrevious';
import { PaginationContent } from './PaginationContent';
import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationItem } from './PaginationItem';
import { PaginationLink } from './PaginationLink';
import { PaginationNext } from './PaginationNext';

export type PaginationProps = React.ComponentProps<'nav'>;

export const PaginationRoot = (props: PaginationProps) => {
  const { className, ...rest } = props;

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...rest}
    />
  );
};

export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  Previous: PaginationPrevious
});
