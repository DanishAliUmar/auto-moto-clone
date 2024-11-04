import { useRouter } from 'next/router'; // Import useRouter
import Svgs from '@/components/ui/Element/Sidebar/Sidebar.jsx';
import { ArrowDownIcon, ArrowLeftIcon, Cross1Icon, DashboardIcon, HamburgerMenuIcon, Link1Icon, ListBulletIcon, TextAlignJustifyIcon } from '@radix-ui/react-icons';
import { ArrowLeft, Calendar, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  expandSidebar: boolean;
  setExpandSidebar: (value: boolean) => void;
}

const Sidebar = ({ expandSidebar, setExpandSidebar }: SidebarProps) => {
  // const router = useRouter(); // Get the router instance

  const routes = [
    {
      id: 1,
      url: "dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard />,
      link: '/dashboard',
    },
    {
      id: 2,
      url: "auto-web-hooks",
      name: "Web Hook",
      icon: <Calendar />,
      link: '/dashboard/auto-web-hooks',
    },
    {
      id: 3,
      url: "editor-setup-hooks",
      name: "Setup Hooks",
      icon: <Link1Icon />,
      link: '/dashboard/editor-setup-hooks',
    },
    {
      id: 4,
      url: "settings",
      name: "Settings",
      icon: <Settings />,
      link: '/dashboard/settings',
    },
    
  ];



  return (
    <aside className={`bg-primary-foreground border-r text-sm h-full sm:static fixed space-y-5 max-h-[calc(100vh-5rem)] overflow-y-auto min-h-[calc(100vh-5rem)] no-scrollbar py-4 px-1 z-[16] transition-all ${expandSidebar ? "min-w-[250px]" : ""}`}>
      <div
        onClick={() => setExpandSidebar(!expandSidebar)}
        className={`flex items-center border-b border-black_v2 cursor-pointer h-10 p-3 pb-5 w-full transition-all ${expandSidebar ? "justify-between" : "justify-center"}`}
      >
        <div className={`flex items-center gap-2 ${expandSidebar ? '' : 'justify-center w-full'}`}>
          {expandSidebar ? <ArrowLeft className='text-primary' /> : <HamburgerMenuIcon className='text-primary'/>}
          <p className={`truncate font-bold text-primary ${expandSidebar ? 'block' : 'hidden'} transition-all`}>WebHook</p>
        </div>
      </div>

      <div className="space-y-3">
        {routes.map((item) => (
          <Link key={item.id} href={item.link}>
            <div  onClick={() => {
              if (item.link === '/dashboard/editor-setup-hooks') {
                localStorage.removeItem("webhook_detail");
              } else {
                console.log("No action for this link");
              }
            }} className={`flex items-center h-11 p-3 gap-5 transition-all rounded-lg hover:bg-secondary-foreground hover:text-white `}>
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              <span className={`font-medium ${expandSidebar ? 'block' : 'hidden'}`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
