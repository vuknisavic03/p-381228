
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LayoutDashboard, List, BarChart, Settings, Key, LifeBuoy, LogOut } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

  // Placeholder functions for the settings buttons
  const handleResetPassword = () => {
    console.log("Reset Password clicked");
    // Will be implemented with backend integration
  };

  const handleSupport = () => {
    console.log("Support clicked");
    // Will be implemented with backend integration
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/');
    // Will be implemented with backend integration
  };

  return (
    <div className="w-[280px] h-full bg-white flex flex-col">
      {/* Header section with workspace info */}
      <div className="p-4 w-full">
        <button 
          className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-[#F6F6F7] transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-sm font-medium text-[#9EA3AD]">
            {workspaceData.initials}
          </div>
          <span className="text-[#1A1A1A] font-medium text-base">
            {workspaceData.name}
          </span>
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

      {/* Settings button at the bottom - Square hover effect */}
      <div className="p-4 border-t border-[#E4E5EA]">
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#F6F6F7] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[400px] bg-white p-6">
            <div className="text-xl font-semibold mb-6">Settings</div>
            <div className="space-y-6">
              {/* Reset Password Section */}
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Reset Password</div>
                <div className="text-sm text-[#9EA3AD] mb-3">Change your account password</div>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center" 
                  onClick={handleResetPassword}
                >
                  <span>Reset Password</span>
                  <Key className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Support Section */}
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Support</div>
                <div className="text-sm text-[#9EA3AD] mb-3">Get help with your account</div>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center" 
                  onClick={handleSupport}
                >
                  <span>Contact Support</span>
                  <LifeBuoy className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Logout Section */}
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Log Out</div>
                <div className="text-sm text-[#9EA3AD] mb-3">Sign out from your account</div>
                <Button 
                  variant="outline"
                  className="w-full flex justify-between items-center text-red-500 hover:text-red-600 hover:border-red-200" 
                  onClick={handleLogout}
                >
                  <span>Log Out</span>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
