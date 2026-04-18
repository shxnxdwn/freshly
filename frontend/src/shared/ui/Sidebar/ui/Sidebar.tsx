'use client';

import * as React from 'react';
import { useSidebar } from '../model/hooks/useSidebar';
import { cn } from '@/shared/lib/utils/cn';
import { Sheet } from '@/shared/ui/Sheet';
import { SIDEBAR_WIDTH_MOBILE } from '@/shared/ui/Sidebar/model/constants';
import { SidebarContent } from '@/shared/ui/Sidebar/ui/SidebarContent';
import { SidebarFooter } from '@/shared/ui/Sidebar/ui/SidebarFooter';
import { SidebarGroup } from '@/shared/ui/Sidebar/ui/SidebarGroup';
import { SidebarGroupAction } from '@/shared/ui/Sidebar/ui/SidebarGroupAction';
import { SidebarGroupContent } from '@/shared/ui/Sidebar/ui/SidebarGroupContent';
import { SidebarGroupLabel } from '@/shared/ui/Sidebar/ui/SidebarGroupLabel';
import { SidebarHeader } from '@/shared/ui/Sidebar/ui/SidebarHeader';
import { SidebarInput } from '@/shared/ui/Sidebar/ui/SidebarInput';
import { SidebarInset } from '@/shared/ui/Sidebar/ui/SidebarInset';
import { SidebarMenu } from '@/shared/ui/Sidebar/ui/SidebarMenu';
import { SidebarMenuAction } from '@/shared/ui/Sidebar/ui/SidebarMenuAction';
import { SidebarMenuBadge } from '@/shared/ui/Sidebar/ui/SidebarMenuBadge';
import { SidebarMenuButton } from '@/shared/ui/Sidebar/ui/SidebarMenuButton';
import { SidebarMenuItem } from '@/shared/ui/Sidebar/ui/SidebarMenuItem';
import { SidebarMenuSkeleton } from '@/shared/ui/Sidebar/ui/SidebarMenuSkeleton';
import { SidebarMenuSub } from '@/shared/ui/Sidebar/ui/SidebarMenuSub';
import { SidebarMenuSubButton } from '@/shared/ui/Sidebar/ui/SidebarMenuSubButton';
import { SidebarMenuSubItem } from '@/shared/ui/Sidebar/ui/SidebarMenuSubItem';
import { SidebarProvider } from '@/shared/ui/Sidebar/ui/SidebarProvider';
import { SidebarRail } from '@/shared/ui/Sidebar/ui/SidebarRail';
import { SidebarSeparator } from '@/shared/ui/Sidebar/ui/SidebarSeparator';
import { SidebarTrigger } from '@/shared/ui/Sidebar/ui/SidebarTrigger';

export const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export type SidebarProps = React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
};

export const SidebarRoot = (props: SidebarProps) => {
  const { side = 'left', variant = 'sidebar', collapsible = 'offcanvas', className, children, dir, ...rest } = props;
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn('bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col', className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <Sheet.Content
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
          side={side}
        >
          <Sheet.Header className="sr-only">
            <Sheet.Title>Sidebar</Sheet.Title>
            <Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
          </Sheet.Header>
          <div className="flex h-full w-full flex-col">{children}</div>
        </Sheet.Content>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...rest}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:ring-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Sidebar = Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Input: SidebarInput,
  Inset: SidebarInset,
  Menu: SidebarMenu,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuButton: SidebarMenuButton,
  MenuItem: SidebarMenuItem,
  MenuSkeleton: SidebarMenuSkeleton,
  MenuSub: SidebarMenuSub,
  MenuSubButton: SidebarMenuSubButton,
  MenuSubItem: SidebarMenuSubItem,
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger
});
