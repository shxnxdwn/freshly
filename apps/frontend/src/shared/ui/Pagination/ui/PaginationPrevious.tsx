import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { ChevronLeftIcon } from 'lucide-react';
import { PaginationLink } from './PaginationLink';

export type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & { text?: string };

export const PaginationPrevious = (props: PaginationPreviousProps) => {
  const { className, text = 'Previous', ...rest } = props;

  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn('pl-1.5!', className)} {...rest}>
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
};
