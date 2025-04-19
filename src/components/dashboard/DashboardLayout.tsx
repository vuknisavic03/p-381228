
import React from "react";
import { WorkspaceNav } from "../workspace/WorkspaceNav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceNav />
      <main className="flex-1 relative">
        {children}
      </main>
    </div>
  );
}
