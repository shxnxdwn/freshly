import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/shared/lib/utils/cn';

export const logoVariants = cva(
  'inline-flex items-center gap-2 font-bold tracking-tighter transition-colors select-none',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        primary: 'text-primary',
        muted: 'text-muted-foreground'
      },
      size: {
        default: 'text-xl',
        sm: 'text-lg',
        lg: 'text-2xl',
        xl: 'text-3xl'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type LogoProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof logoVariants> & {
    asChild?: boolean;
  };

export const Logo = (props: LogoProps) => {
  const { className, variant, size, asChild = false, href = '/', ...rest } = props;

  const Comp = asChild ? Slot.Root : Link;

  return (
    <Comp href={href} className={cn(logoVariants({ variant, size, className }))} {...rest}>
      <span>Freshly</span>
    </Comp>
  );
};
