
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LayoutDashboard, List, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

      {/* Horizontal separator that spans the full width */}
      <Separator className="w-full" />

      {/* Navigation section */}
      <div className="p-4 flex-1">
        <div className="text-sm text-[#9EA3AD] font-semibold mb-4">WORKSPACE</div>
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

      {/* User section with settings button */}
      <Separator className="w-full" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {userInitials}
            </div>
            <div className="text-sm font-medium text-gray-800">{owner}</div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
