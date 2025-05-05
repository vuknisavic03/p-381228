
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronRight, LayoutList } from "lucide-react";

export default function Transactions() {
  const isMobile = useIsMobile();
  
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col md:flex-row">
        {isMobile ? (
          <Sheet>
            <div className="bg-white border-b border-[#EBECED] p-4 flex justify-between items-center shadow-sm">
              <h2 className="text-lg font-medium">Transaction Form</h2>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <LayoutList className="h-4 w-4" />
                  Activity
                </Button>
              </SheetTrigger>
            </div>
            <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
              <TransactionForm />
            </div>
            <SheetContent side="right" className="w-full sm:max-w-md p-0">
              <div className="h-full bg-white border-l border-[#EBECED]">
                <TransactionActivity />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <div className="w-[300px] bg-white border-r border-[#EBECED] overflow-y-auto h-full">
              <TransactionActivity />
            </div>
            <div className="flex-1 bg-[#FAFBFC] overflow-y-auto">
              <TransactionForm />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
