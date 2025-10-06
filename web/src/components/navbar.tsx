import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MoonIcon, Sun, LaptopMinimal, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../providers/themeProvider';
import { ButtonGroup, ButtonGroupSeparator } from './ui/button-group';

export interface NavLink {
  path: string;
  name: string;
}

const iconClass = 'group-hover:-translate-y-[1px] group-hover:scale-125 transition-discrete duration-300';

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
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition duration-300
                  ${
                    location.pathname === link.path
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'hover:bg-gray-700 hover:text-white hover:-translate-y-[2px] group-hover:scale-125'
                  }
                `}
              >
                {link.name}
              </Link>
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
