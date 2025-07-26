
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { DateRangeHeader } from "@/components/transactions/DateRangeHeader";
import { PageHeader } from "@/components/shared/PageHeader";
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
      <div className="h-screen flex flex-col bg-gray-50">
        <PageHeader
          onAddClick={() => setIsAddFormOpen(true)}
          addButtonText="Add Transaction"
        >
          <DateRangeHeader 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </PageHeader>

        <div className="flex-1 bg-white">
          <TransactionActivity />
        </div>

        <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <SheetContent
            side="right"
            className="w-[600px] sm:w-[700px] lg:w-[800px] p-0 border-l shadow-2xl bg-white"
          >
            <TransactionForm onClose={() => setIsAddFormOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
