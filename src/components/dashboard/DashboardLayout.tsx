
import React from "react";
import { WorkspaceList } from "../workspace/WorkspaceList";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <WorkspaceList />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
