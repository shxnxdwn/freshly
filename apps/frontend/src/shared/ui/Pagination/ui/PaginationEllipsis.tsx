import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { MoreHorizontalIcon } from 'lucide-react';

export type PaginationEllipsisProps = React.ComponentProps<'span'>;

export const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const { className, ...rest } = props;

  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
      {...rest}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
};
