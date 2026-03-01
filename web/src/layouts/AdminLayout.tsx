import { Outlet, useLocation } from 'react-router';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import { Separator } from '../components/ui/separator';
import { AppSidebar, menuItems } from '../components/Sidebar';

export function AdminLayout() {
  const location = useLocation();
  const currentPage = menuItems.find((item) => item.path === location.pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />

            <h1 className='text-sm font-semibold tracking-tight'>{currentPage?.title || 'Overview'}</h1>
          </div>
        </header>

        <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='min-h-[100vh] flex-1 rounded-xl p-2'>
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
