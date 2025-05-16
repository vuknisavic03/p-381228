
import React from "react";
import { WorkspaceNav } from "../workspace/WorkspaceNav";
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
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <WorkspaceNav 
        workspaceName={workspaceName}
        userInitials={userInitials}
        owner={owner}
      />
      <Separator orientation="vertical" className="h-full border-[#E4E5EA]" />
      <main className="flex-1 relative overflow-auto bg-white">
        {children}
      </main>
    </div>
  );
}
