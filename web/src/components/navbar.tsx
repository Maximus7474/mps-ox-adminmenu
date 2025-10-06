import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { X } from 'lucide-react';
import { Button } from './ui/button';

export interface NavLink {
  path: string;
  name: string;
}

const Navbar: React.FC<{links: NavLink[], close: () => void}> = ({ links, close }) => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900/90 p-4 shadow-xl sticky top-0 z-10 w-full rounded-t-lg">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 justify-between items-start">
          <p className="text-white text-2xl font-bold">
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
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <Button variant='ghost' onClick={close} className='text-white'>
          <X strokeWidth={3} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
