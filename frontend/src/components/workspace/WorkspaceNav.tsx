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
  };

  const handleSupport = () => {
    console.log("Support clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/');
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
            <div className="space-y-6">
              {/* Reset Password Section */}
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="font-medium mb-1 text-gray-900">Reset Password</div>
                <div className="text-sm text-gray-500 mb-3">Change your account password</div>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center bg-white border-gray-200 hover:bg-gray-50" 
                  onClick={handleResetPassword}
                >
                  <span>Reset Password</span>
                  <Key className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Support Section */}
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="font-medium mb-1 text-gray-900">Support</div>
                <div className="text-sm text-gray-500 mb-3">Get help with your account</div>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center bg-white border-gray-200 hover:bg-gray-50" 
                  onClick={handleSupport}
                >
                  <span>Contact Support</span>
                  <LifeBuoy className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Logout Section */}
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="font-medium mb-1 text-gray-900">Log Out</div>
                <div className="text-sm text-gray-500 mb-3">Sign out from your account</div>
                <Button 
                  variant="outline"
                  className="w-full flex justify-between items-center text-red-500 hover:text-red-600 hover:border-red-200 bg-white" 
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
