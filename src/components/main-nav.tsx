'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  FolderKanban,
  BarChartBig,
  Users,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Board', icon: LayoutGrid },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/reports', label: 'Reports', icon: BarChartBig },
  { href: '/team', label: 'Team', icon: Users },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="text-zinc-500 font-semibold uppercase text-[10px] tracking-wider">
          Menu Principal
        </SidebarGroupLabel>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              {/* Usamos 'asChild' para que o botão se comporte como o Link do Next.js */}

              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-white"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}