
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Transactions() {
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h1 className="text-xl font-semibold">Transactions</h1>
          <Button 
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-[#FAFBFC]">
          <TransactionActivity />
        </div>
        
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent 
            side="right" 
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-2xl"
          >
            <TransactionForm onClose={() => setIsAddFormOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
