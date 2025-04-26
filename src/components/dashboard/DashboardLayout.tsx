
import React from "react";
import { WorkspaceNav } from "../workspace/WorkspaceNav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <WorkspaceNav />
      <main className="flex-1 relative overflow-auto">
        {children}
      </main>
    </div>
  );
}
