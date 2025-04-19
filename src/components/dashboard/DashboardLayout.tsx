
import React from "react";
import { WorkspaceNav } from "../workspace/WorkspaceNav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <WorkspaceNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
