
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleWorkspaceClick = () => {
    navigate('/workspace-picker', { state: { from: location.pathname } });
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button onClick={handleWorkspaceClick} variant="outline">
            Choose Workspace
          </Button>
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
