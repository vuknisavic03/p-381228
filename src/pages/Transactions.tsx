
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { DateRangeHeader } from "@/components/transactions/DateRangeHeader";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
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
      <div className="h-screen flex flex-col bg-gray-50/30">
        {/* Modern Page Header */}
        <div className="bg-white border-b border-gray-200/60 shadow-sm">
          <div className="px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left: Page Title & Subtitle */}
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  Transactions
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Track your property income and expenses
                </p>
              </div>
              
              {/* Right: Action Buttons */}
              <div className="flex items-center gap-3">
                <DateRangeHeader 
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
                <div className="h-8 w-px bg-gray-200"></div>
                <Button
                  onClick={() => setIsAddFormOpen(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2.5 h-10 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md flex items-center gap-2.5"
                >
                  <Plus className="h-4 w-4" />
                  Add Transaction
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content container */}
        <div className="flex-1 relative overflow-hidden">
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
