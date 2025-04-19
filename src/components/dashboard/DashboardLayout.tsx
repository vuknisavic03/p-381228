
import React from "react";
import { MainNav } from "../navigation/MainNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center justify-between p-4 border-b border-[#E4E5EA]">
        <MainNav />
        <Button 
          variant="outline"
          onClick={() => navigate('/')}
          className="ml-4"
        >
          Choose Workspace
        </Button>
      </div>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
