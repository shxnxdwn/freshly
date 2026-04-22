import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type PaginationContentProps = React.ComponentProps<'ul'>;

export const PaginationContent = (props: PaginationContentProps) => {
  const { className, ...rest } = props;

  return <ul data-slot="pagination-content" className={cn('flex items-center gap-0.5', className)} {...rest} />;
};
