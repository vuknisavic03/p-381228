import React from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building, 
  Receipt, 
  FileText, 
  TrendingUp, 
  FolderOpen,
  Settings
} from "lucide-react";

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  isActive?: boolean;
}

function NavItem({ icon: Icon, label, path, isActive }: NavItemProps) {
  const navigate = useNavigate();
  
  return (
    <button
      className={cn(
        "flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-all duration-200 ease-in-out",
        "hover:bg-sidebar-accent text-sidebar-foreground",
        isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : "font-normal"
      )}
      onClick={() => navigate(path)}
    >
      <Icon className={cn(
        "w-5 h-5",
        isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70"
      )} />
      <span className="text-sm">{label}</span>
    </button>
  );
}

interface ModernSidebarProps {
  workspaceName?: string;
  userInitials?: string;
  owner?: string;
}

export function ModernSidebar({ 
  workspaceName = "User's Workspace", 
  userInitials = "U",
  owner = "User" 
}: ModernSidebarProps) {
  const location = useLocation();
  
  const navigationItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/" },
    { icon: Building, label: "Listings", path: "/listings" },
    { icon: Receipt, label: "Transactions", path: "/transactions" },
    { icon: FileText, label: "Invoicing", path: "/invoicing" },
    { icon: TrendingUp, label: "Cash Flow", path: "/cash-flow" },
    { icon: FolderOpen, label: "Documents", path: "/documents" },
  ];

  return (
    <div className="h-full w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col">
      {/* Workspace Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary text-sidebar-primary-foreground rounded-lg flex items-center justify-center font-semibold text-sm">
            {userInitials}
          </div>
          <div>
            <div className="font-semibold text-sm text-sidebar-foreground">
              {workspaceName}
            </div>
            <div className="text-xs text-sidebar-foreground/60">
              {owner}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      {/* Settings Section */}
      <div className="p-4 border-t border-sidebar-border">
        <NavItem
          icon={Settings}
          label="Settings"
          path="/settings"
          isActive={location.pathname === '/settings'}
        />
      </div>
    </div>
  );
}