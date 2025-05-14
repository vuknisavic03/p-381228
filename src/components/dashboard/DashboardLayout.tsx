
import React from "react";
import { WorkspaceNav } from "../workspace/WorkspaceNav";

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
    <div className="flex h-screen w-full overflow-hidden">
      <WorkspaceNav 
        workspaceName={workspaceName}
        userInitials={userInitials}
        owner={owner}
      />
      <main className="flex-1 relative overflow-auto">
        {children}
      </main>
    </div>
  );
}
