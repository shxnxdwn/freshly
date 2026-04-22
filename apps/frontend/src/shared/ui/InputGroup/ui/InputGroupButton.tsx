import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib/utils/cn';

const inputGroupButtonVariants = cva('flex items-center gap-2 text-sm shadow-none', {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      sm: '',
      'icon-xs': 'size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0',
      'icon-sm': 'size-8 p-0 has-[>svg]:p-0'
    }
  },
  defaultVariants: {
    size: 'xs'
  }
});

export type InputGroupButtonProps = Omit<React.ComponentProps<typeof Button>, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>;

export const InputGroupButton = (props: InputGroupButtonProps) => {
  const { className, type = 'button', variant = 'ghost', size = 'xs', ...rest } = props;

  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...rest}
    />
  );
};
