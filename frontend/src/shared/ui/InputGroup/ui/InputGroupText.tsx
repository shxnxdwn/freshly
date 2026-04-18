import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type InputGroupTextProps = React.ComponentProps<'span'>;

export const InputGroupText = (props: InputGroupTextProps) => {
  const { className, ...rest } = props;

  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...rest}
    />
  );
};
