import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export const CardHeader = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props;

  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3',
        className
      )}
      {...rest}
    />
  );
};
