
import React from "react";
import { Sidebar } from "../navigation/Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-end p-4 border-b border-[#E4E5EA]">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Choose Workspace
          </Button>
        </div>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
