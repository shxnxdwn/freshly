import * as React from 'react';
import { cn } from '@/shared/lib/utils/cn';

export type FieldError = React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
};

export const FieldError = (props: FieldError) => {
  const { className, children, errors, ...rest } = props;

  const content = React.useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-destructive text-sm font-normal', className)}
      {...rest}
    >
      {content}
    </div>
  );
};
