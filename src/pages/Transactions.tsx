
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { DateRangeHeader } from "@/components/transactions/DateRangeHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DateRange } from "react-day-picker";
import { startOfMonth, endOfMonth } from "date-fns";

export default function Transactions() {
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-screen flex flex-col bg-white">
        {/* Notion-inspired header */}
        <div className="border-b border-gray-100">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-gray-400 font-normal">Edited just now</span>
            </div>
            <div className="flex items-center gap-3">
              <DateRangeHeader 
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
              <Button
                onClick={() => setIsAddFormOpen(true)}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm px-3 py-1.5 h-8 rounded-md shadow-sm transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Transaction
              </Button>
            </div>
          </div>
        </div>

        {/* Main content container */}
        <div className="flex-1 relative overflow-hidden bg-white">
          <TransactionActivity />
        </div>

        {/* Add Transaction Sheet */}
        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent
            side="right"
            className="w-[480px] sm:w-[540px] p-0 border-l shadow-2xl bg-white"
          >
            <TransactionForm onClose={() => setIsAddFormOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
