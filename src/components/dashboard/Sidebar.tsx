
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Separator } from "@/components/ui/separator";
import { 
  LayoutGrid, 
  Home, 
  Building2, 
  CircleDollarSign, 
  Settings, 
  LineChart, 
  Users, 
  LogOut,
  Map
} from 'lucide-react';

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Define navigation items
  const mainNavItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <Home className="w-4 h-4" />,
      current: isActive("/")
    },
    {
      name: "Listings",
      href: "/listings",
      icon: <Building2 className="w-4 h-4" />,
      current: isActive("/listings")
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: <CircleDollarSign className="w-4 h-4" />,
      current: isActive("/transactions")
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <LineChart className="w-4 h-4" />,
      current: isActive("/analytics")
    },
    {
      name: "Map Search",
      href: "/map-search",
      icon: <Map className="w-4 h-4" />,
      current: isActive("/map-search")
    }
  ];

  const bottomNavItems = [
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
      current: isActive("/settings")
    },
    {
      name: "Team",
      href: "/team",
      icon: <Users className="w-4 h-4" />,
      current: isActive("/team")
    }
  ];

  return (
    <div className="flex h-full w-60 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center h-14 px-4">
        <LayoutGrid className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">PropManage</span>
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto pb-4">
        <div className="grid gap-1 px-2">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          
          <NavLink
            to="/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 mt-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
}
