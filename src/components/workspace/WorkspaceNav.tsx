
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LayoutDashboard, List, BarChart, Settings } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface WorkspaceNavProps {
  workspaceName?: string;
  userInitials?: string;
  owner?: string;
}

export function WorkspaceNav({ 
  workspaceName = "Kevin's Space", 
  userInitials = "K",
  owner = "Kevin Anderson" 
}: WorkspaceNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  // Get workspace data from current location state or use default
  const workspaceData = location.state?.workspace || {
    name: workspaceName,
    owner: owner,
    initials: userInitials
  };

  // Function to navigate with workspace data preserved
  const navigateWithWorkspace = (path: string) => {
    navigate(path, { 
      state: { 
        workspace: workspaceData
      }
    });
  };

  return (
    <div className="w-[280px] h-full bg-white flex flex-col">
      {/* Header section with workspace info */}
      <div className="p-4 w-full">
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-[#F6F6F7] transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-sm font-medium text-[#9EA3AD]">
            {workspaceData.initials}
          </div>
          <span className="text-[#1A1A1A] font-medium">{workspaceData.name}</span>
        </button>
      </div>

      {/* Navigation section */}
      <div className="p-4 flex-1">
        <div className="space-y-2">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer",
              isActive('/dashboard') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigateWithWorkspace('/dashboard')}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className={cn(
              "text-[16px] text-[#1A1A1A]",
              isActive('/dashboard') ? "font-semibold" : "font-medium"
            )}>Overview</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer",
              isActive('/listings') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigateWithWorkspace('/listings')}
          >
            <List className="w-5 h-5" />
            <span className={cn(
              "text-[16px] text-[#1A1A1A]",
              isActive('/listings') ? "font-semibold" : "font-medium"
            )}>Listings</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer",
              isActive('/transactions') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigateWithWorkspace('/transactions')}
          >
            <BarChart className="w-5 h-5" />
            <span className={cn(
              "text-[16px] text-[#1A1A1A]",
              isActive('/transactions') ? "font-semibold" : "font-medium"
            )}>Transactions</span>
          </div>
        </div>
      </div>

      {/* Settings button at the bottom */}
      <div className="p-4 border-t border-[#E4E5EA]">
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md hover:bg-[#F6F6F7] transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-[16px] text-[#1A1A1A] font-medium">Settings</span>
            </button>
          </SheetTrigger>
          <SheetContent className="w-[400px] bg-white p-6">
            <div className="text-xl font-semibold mb-6">Settings</div>
            <div className="space-y-4">
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Workspace Settings</div>
                <div className="text-sm text-[#9EA3AD]">Manage workspace details and preferences</div>
              </div>
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Account</div>
                <div className="text-sm text-[#9EA3AD]">Update your personal information</div>
              </div>
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Display</div>
                <div className="text-sm text-[#9EA3AD]">Change appearance settings</div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
