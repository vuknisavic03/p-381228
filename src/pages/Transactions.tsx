
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

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
      <div className="h-screen flex flex-col bg-white">
        {/* Top bar with Activity and Add Transaction button */}
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Activity</h1>
          </div>
          <Button
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700"
          >
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Horizontal separator line */}
        <Separator className="w-full border-[#E4E5EA]" />

        {/* Activity table with improved layout */}
        <div className="flex-1 overflow-y-auto bg-white p-6">
          <TransactionActivity />
        </div>

        {/* Add Transaction Sheet */}
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent
            side="right"
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-xl bg-white"
          >
            <TransactionForm onClose={() => setIsAddFormOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
