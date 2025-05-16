
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
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
      <div className="h-screen flex flex-col">
        {/* Top bar with Activity and Add Transaction button */}
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Activity</h1>
          </div>
          <Button
            onClick={() => setIsAddFormOpen(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white h-9 px-4 gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Horizontal separator line */}
        <Separator className="w-full border-gray-200" />

        {/* Activity table */}
        <div className="flex-1 overflow-y-auto bg-white p-4">
          <TransactionActivity />
        </div>

        {/* Add Transaction Sheet */}
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent
            side="right"
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-xl bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Add Transaction</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsAddFormOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <TransactionForm onClose={() => setIsAddFormOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
