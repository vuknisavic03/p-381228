
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
    <div className="flex h-screen w-full overflow-hidden bg-[#FCFCFD]">
      <WorkspaceNav 
        workspaceName={workspaceName}
        userInitials={userInitials}
        owner={owner}
      />
      <Separator orientation="vertical" className="h-full border-[#EAECF0]" />
      <main className="flex-1 relative overflow-auto bg-[#FCFCFD]">
        {children}
      </main>
    </div>
  );
}
