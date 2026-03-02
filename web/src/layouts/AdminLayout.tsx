import { Outlet, useLocation } from 'react-router';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar, menuItems } from '../components/Sidebar';

// AdminLayout.tsx
export function AdminLayout() {
  const location = useLocation();
  const currentPage = menuItems.find((item) => item.path === location.pathname);

  return (
    <SidebarProvider className='relative flex h-full w-full overflow-hidden items-stretch'>
      <AppSidebar />
      <SidebarInset className='flex flex-col min-w-0 flex-1 bg-background'>
        <header className='flex h-16 shrink-0 items-center gap-2 px-4 border-b border-border/10'>
          <SidebarTrigger className='-ml-1' />

          <h1 className='text-sm font-semibold tracking-tight'>{currentPage?.title || 'Overview'}</h1>
        </header>

        <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='min-h-[100vh] flex-1 rounded-xl py-2'>
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
