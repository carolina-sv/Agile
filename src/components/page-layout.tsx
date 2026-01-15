import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import Header from './header';
import MainNav from './main-nav';
import { Rocket } from 'lucide-react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center gap-2">
            <Rocket className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Agile</h1>
          </div>
          <MainNav />
        </div>
      </Sidebar>
      <SidebarRail />
      <SidebarInset>
        <Header title={title} />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
