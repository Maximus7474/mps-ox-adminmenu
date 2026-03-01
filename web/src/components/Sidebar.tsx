import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Users, UserCog, Settings, Sun, Moon, ChevronsUpDown } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useTheme } from '../providers/ThemeProvider';

export const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Groups', icon: Users, path: '/groups' },
  { title: 'Players', icon: UserCog, path: '/players' },
];

export function AppSidebar() {
  const location = useLocation();
  const { setTheme, theme } = useTheme();

  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <div className='cursor-pointer'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                  <Settings className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>FiveM Admin</span>
                  <span className='truncate text-xs text-muted-foreground'>v1.0.2</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={location.pathname === item.path}>
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground'>
                {theme === 'light' ? <Sun className='size-4' /> : <Moon className='size-4' />}
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>Appearance</span>
                <span className='truncate text-xs capitalize'>{theme} mode</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
