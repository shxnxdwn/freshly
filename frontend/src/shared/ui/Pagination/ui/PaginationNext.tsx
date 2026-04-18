import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { ChevronRightIcon } from 'lucide-react';
import { PaginationLink } from './PaginationLink';

export type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & { text?: string };

export const PaginationNext = (props: PaginationNextProps) => {
  const { className, text = 'Next', ...rest } = props;

  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn('pr-1.5!', className)} {...rest}>
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
};
