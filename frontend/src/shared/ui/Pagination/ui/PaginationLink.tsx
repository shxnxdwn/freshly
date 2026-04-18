import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui/Button';

export type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

export const PaginationLink = (props: PaginationLinkProps) => {
  const { className, isActive, size = 'icon', ...rest } = props;

  return (
    <Button asChild variant={isActive ? 'outline' : 'ghost'} size={size} className={cn(className)}>
      <a aria-current={isActive ? 'page' : undefined} data-slot="pagination-link" data-active={isActive} {...rest} />
    </Button>
  );
};
