
import React from "react";
import { ModernSidebar } from "./ModernSidebar";
import { Separator } from "@/components/ui/separator";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  workspaceName?: string;
  userInitials?: string;
  owner?: string;
}

export function DashboardLayout({ 
  children, 
  workspaceName = "Kevin's Workspace", 
  userInitials = "KA",
  owner = "Kevin Anderson" 
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ModernSidebar 
        workspaceName={workspaceName}
        userInitials={userInitials}
        owner={owner}
      />
      <main className="flex-1 relative overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
}
