
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutList } from "lucide-react";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";

export default function Transactions() {
  const isMobile = useIsMobile();
  
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col md:flex-row">
        {isMobile ? (
          <Sheet>
            <div className="flex-1 bg-gradient-to-b from-[#F8FAFF] to-white overflow-y-auto">
              <div className="sticky top-0 z-10 bg-white border-b border-[#EBECED] p-4 flex justify-between items-center shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A1F2C]">Transaction Details</h2>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-[#D6BCFA] text-[#8B5CF6] hover:bg-[#F5EFFE]">
                    <LayoutList className="h-4 w-4" />
                    Activity
                  </Button>
                </SheetTrigger>
              </div>
              <div className="pb-20">
                <TransactionForm />
              </div>
            </div>
            <SheetContent side="right" className="w-full sm:max-w-md p-0">
              <div className="h-full bg-white border-l border-[#EBECED] flex flex-col">
                <div className="p-4 border-b border-[#EBECED] flex items-center gap-2">
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-[#8B5CF6] hover:bg-[#F5EFFE]">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <h2 className="text-lg font-semibold text-[#1A1F2C]">Transaction Activity</h2>
                </div>
                <div className="flex-1 overflow-auto">
                  <TransactionActivity />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={30} className="h-full">
              <div className="bg-white border-r border-[#EBECED] overflow-y-auto h-full shadow-sm">
                <TransactionActivity />
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel className="h-full">
              <div className="flex-1 bg-gradient-to-b from-[#F8FAFF] to-white overflow-y-auto h-full">
                <TransactionForm />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </DashboardLayout>
  );
}
