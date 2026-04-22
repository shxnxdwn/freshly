import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { Loader2Icon } from 'lucide-react';

export type SpinnerProps = React.ComponentProps<'svg'>;

export const Spinner = (props: SpinnerProps) => {
  const { className, ...rest } = props;

  return <Loader2Icon role="status" aria-label="Loading" className={cn('size-4 animate-spin', className)} {...rest} />;
};
