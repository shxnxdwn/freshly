import * as React from 'react';
import { useSidebar } from '@/shared/ui/Sidebar/model/hooks/useSidebar';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { PanelLeftIcon } from 'lucide-react';

export type SidebarTriggerProps = React.ComponentProps<typeof Button>;

export const SidebarTrigger = (props: SidebarTriggerProps) => {
  const { className, onClick, ...rest } = props;
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...rest}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
