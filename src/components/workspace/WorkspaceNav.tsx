
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LayoutDashboard, List, BarChart, Settings } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { CreateWorkspaceDialog } from "@/components/workspace/CreateWorkspaceDialog";
import { OwnerSettings } from "@/components/workspace/OwnerSettings";
import { ManagerSettings } from "@/components/workspace/ManagerSettings";

interface WorkspaceNavProps {
  workspaceName?: string;
  userInitials?: string;
  owner?: string;
  userType?: 'owner' | 'manager';
}

export function WorkspaceNav({ 
  workspaceName = "Kevin's Space", 
  userInitials = "K",
  owner = "Kevin Anderson",
  userType = "manager"
}: WorkspaceNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
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


  // Add function to handle clicking on the workspace button
  const handleWorkspaceClick = () => {
    navigate('/');
  };

  return (
    <div className="w-[280px] h-full bg-white flex flex-col border-r border-gray-100 font-sans">
      {/* Header section with workspace info */}
      <div className="p-4 w-full">
        <button 
          onClick={handleWorkspaceClick}
          className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
            {workspaceData.initials}
          </div>
          <span className="text-xl font-medium text-gray-900">
            {workspaceData.name}
          </span>
        </button>
      </div>

      {/* Navigation section */}
      <div className="p-4 flex-1">
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors",
              isActive('/dashboard') ? "bg-gray-100" : "hover:bg-gray-50"
            )}
            onClick={() => navigateWithWorkspace('/dashboard')}
          >
            <LayoutDashboard className={cn(
              "w-5 h-5",
              isActive('/dashboard') ? "text-gray-900" : "text-gray-500"
            )} />
            <span className={cn(
              "text-[16px]",
              isActive('/dashboard') ? "font-semibold text-gray-900" : "font-medium text-gray-700"
            )}>Overview</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors",
              isActive('/listings') ? "bg-gray-100" : "hover:bg-gray-50"
            )}
            onClick={() => navigateWithWorkspace('/listings')}
          >
            <List className={cn(
              "w-5 h-5",
              isActive('/listings') ? "text-gray-900" : "text-gray-500"
            )} />
            <span className={cn(
              "text-[16px]",
              isActive('/listings') ? "font-semibold text-gray-900" : "font-medium text-gray-700"
            )}>Listings</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors",
              isActive('/transactions') ? "bg-gray-100" : "hover:bg-gray-50"
            )}
            onClick={() => navigateWithWorkspace('/transactions')}
          >
            <BarChart className={cn(
              "w-5 h-5",
              isActive('/transactions') ? "text-gray-900" : "text-gray-500"
            )} />
            <span className={cn(
              "text-[16px]",
              isActive('/transactions') ? "font-semibold text-gray-900" : "font-medium text-gray-700"
            )}>Transactions</span>
          </div>
        </div>
      </div>

      {/* Settings button at the bottom */}
      <div className="p-4 border-t border-gray-100">
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[400px] bg-white p-6">
            <div className="text-xl font-semibold mb-6 text-gray-900">Settings</div>
            {userType === 'owner' ? (
              <OwnerSettings onCreateWorkspace={() => setIsCreateDialogOpen(true)} />
            ) : (
              <ManagerSettings />
            )}
          </SheetContent>
        </Sheet>
      </div>
      
      <CreateWorkspaceDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
