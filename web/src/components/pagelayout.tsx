import { Outlet } from "react-router-dom";
import Navbar, { type NavLink } from "./navbar";

interface LayoutProps {
  links: NavLink[];
  close: () => void;
}

const PageLayout: React.FC<LayoutProps> = ({ links, close }) => {
  return (
    <div className="w-2/3 h-2/3 bg-blue-40 rounded-lg">
      <Navbar links={links} close={close} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;
