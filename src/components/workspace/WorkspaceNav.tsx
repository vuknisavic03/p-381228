
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LayoutDashboard, List, BarChart, UserCog, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { ClientDetailsDialog } from "@/components/workspace/ClientDetailsDialog";

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
  const [isClientDetailsOpen, setIsClientDetailsOpen] = React.useState(false);
  
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

  // Handle opening workspace manager
  const handleOpenWorkspaceManager = () => {
    navigate('/workspace-manager', { 
      state: { 
        workspace: workspaceData
      }
    });
  };

  // Handle viewing client details
  const handleViewClientDetails = () => {
    setIsClientDetailsOpen(true);
  };

  return (
    <div className="w-[280px] border-r border-[#E4E5EA] h-full bg-white">
      <div className="p-4 border-b border-[#E4E5EA]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-[#F6F6F7] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-sm font-medium text-[#9EA3AD]">
                {workspaceData.initials}
              </div>
              <span className="text-[#1A1A1A] font-medium">{workspaceData.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px]">
            <DropdownMenuItem onClick={handleOpenWorkspaceManager} className="cursor-pointer">
              <UserCog className="mr-2 h-4 w-4" />
              <span>Workspace Manager</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewClientDetails} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Client Details</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-4">
        <div className="text-sm text-[#9EA3AD] font-semibold mb-4">WORKSPACE</div>
        <div className="space-y-2">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
              isActive('/dashboard') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigateWithWorkspace('/dashboard')}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className={cn(
              "text-[#1A1A1A]",
              isActive('/dashboard') ? "font-semibold" : "font-medium"
            )}>Overview</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
              isActive('/listings') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigateWithWorkspace('/listings')}
          >
            <List className="w-5 h-5" />
            <span className={cn(
              "text-[#1A1A1A]",
              isActive('/listings') ? "font-semibold" : "font-medium"
            )}>Listings</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
              isActive('/transactions') && "bg-[#F6F6F7]"
            )}
            onClick={() => navigateWithWorkspace('/transactions')}
          >
            <BarChart className="w-5 h-5" />
            <span className={cn(
              "text-[#1A1A1A]",
              isActive('/transactions') ? "font-semibold" : "font-medium"
            )}>Transactions</span>
          </div>
        </div>
      </div>

      {/* Client Details Dialog */}
      <Dialog open={isClientDetailsOpen} onOpenChange={setIsClientDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <ClientDetailsDialog client={workspaceData} onClose={() => setIsClientDetailsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
