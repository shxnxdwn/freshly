import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { CardAction } from '@/shared/ui/Card/ui/CardAction';
import { CardContent } from '@/shared/ui/Card/ui/CardContent';
import { CardDescription } from '@/shared/ui/Card/ui/CardDescription';
import { CardFooter } from '@/shared/ui/Card/ui/CardFooter';
import { CardHeader } from '@/shared/ui/Card/ui/CardHeader';
import { CardTitle } from '@/shared/ui/Card/ui/CardTitle';

export type CardProps = React.ComponentProps<'div'> & { size?: 'default' | 'sm' };

export const Card = (props: CardProps) => {
  const { className, size = 'default', ...rest } = props;

  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card bg-card text-card-foreground ring-foreground/10 flex flex-col gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className
      )}
      {...rest}
    />
  );
};

Object.assign(Card, {
  Action: CardAction,
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle
});
