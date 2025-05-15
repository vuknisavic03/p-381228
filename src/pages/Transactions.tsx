
import React from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Transactions() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  
  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-full flex flex-col md:flex-row">
        {isMobile ? (
          <Sheet>
            <div className="flex-1 bg-white overflow-y-auto animate-fade-in">
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 animate-fade-in">Transaction Details</h2>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "flex items-center gap-2 border-gray-200 text-gray-700",
                      "hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    )}
                  >
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
              <div className="h-full bg-white border-l border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <h2 className="text-lg font-semibold text-gray-900">Transaction Activity</h2>
                </div>
                <div className="flex-1 overflow-auto">
                  <TransactionActivity />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex w-full h-full animate-fade-in">
            <div className="w-1/2 bg-white overflow-y-auto h-full shadow-sm transition-all duration-300 hover:shadow-md">
              <TransactionForm />
            </div>
            <div className="w-1/2 bg-white overflow-y-auto h-full border-l border-gray-200 transition-all duration-300">
              <TransactionActivity />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
