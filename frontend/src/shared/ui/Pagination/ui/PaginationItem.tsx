import * as React from 'react';

export type PaginationItemProps = React.ComponentProps<'li'>;

export const PaginationItem = (props: PaginationItemProps) => {
  return <li data-slot="pagination-item" {...props} />;
};
