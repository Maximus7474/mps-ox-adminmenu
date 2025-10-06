import { Outlet } from "react-router-dom";
import Navbar, { type NavLink } from "./navbar";

interface LayoutProps {
  links: NavLink[];
  close: () => void;
}

const PageLayout: React.FC<LayoutProps> = ({ links, close }) => {
  return (
    <div className="w-2/3 h-3/4 bg-gray-800 rounded-lg flex flex-col">
      <Navbar links={links} close={close} />
      <main className="flex-grow overflow-y-auto text-white">
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;
