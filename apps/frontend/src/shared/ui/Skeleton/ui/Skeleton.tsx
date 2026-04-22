import { cn } from '@/shared/lib/utils/cn';
import * as React from 'react';

export type SkeletonProps = React.ComponentProps<'div'>;

export const Skeleton = (props: SkeletonProps) => {
  const { className, ...rest } = props;

  return <div data-slot="skeleton" className={cn('bg-muted animate-pulse rounded-md', className)} {...rest} />;
};
