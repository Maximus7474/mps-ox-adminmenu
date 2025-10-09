import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MoonIcon, Sun, LaptopMinimal, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../providers/themeProvider';
import { ButtonGroup, ButtonGroupSeparator } from './ui/button-group';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export interface NavLink {
  path: string;
  name: string;
  children?: NavLink[];
}

const iconClass = 'group-hover:-translate-y-[1px] group-hover:scale-125 transition-discrete duration-300';

const isParentLinkActive = (children: NavLink[], pathname: string) => {
  return children.some(child => pathname === child.path);
}

const Navbar: React.FC<{links: NavLink[], close: () => void}> = ({ links, close }) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="p-4 shadow-xl sticky top-0 z-10 w-full rounded-t-lg">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-4 justify-between items-start">
          <p className="text-2xl font-bold">
            Admin Menu
          </p>

          <div className="flex space-x-4">
            {links.map((link) => (
              link.children
              ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className={`
                      px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:-translate-y-[2px] group-hover:scale-125
                      ${
                        isParentLinkActive(link.children, location.pathname)
                          && 'shadow-md underline underline-offset-2 hover:underline-offset-4'
                      }
                    `}>
                      {link.name}
                      {<ChevronDown />}
                    </Button>
                  </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      {link.children.map((item, idx) => {
                        const path = `${link.path}/${item.path}`;

                        return (
                        <DropdownMenuItem key={idx} asChild>
                          <Link
                            to={path}
                            className={`
                              px-3 py-2 rounded-md text-sm font-medium transition duration-300 
                              ${location.pathname === path
                                ? 'text-white shadow-md  underline underline-offset-2'
                                : 'hover:bg-gray-700 hover:text-white'
                              }
                            `}
                          >
                            {path === location.pathname && <ChevronRight />}
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                    )})}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant='ghost' asChild>
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition duration-300
                      ${
                        location.pathname === link.path
                          ? 'text-white shadow-md underline underline-offset-2'
                          : 'hover:-translate-y-[2px] group-hover:scale-125'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </Button>
              )
            ))}
          </div>
        </div>

        <ButtonGroup>
          <Button
            variant='ghost'
            className='group'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {
              theme === 'dark'
                ? <MoonIcon className={iconClass} />
                : theme === 'light'
                  ? <Sun className={iconClass} />
                  : <LaptopMinimal className={iconClass} />
            }
          </Button>
          <ButtonGroupSeparator />
          <Button variant='ghost' className='group' onClick={close}>
            <X strokeWidth={3} className={iconClass} />
          </Button>
        </ButtonGroup>
      </div>
    </nav>
  );
};

export default Navbar;
