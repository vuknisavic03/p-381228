import React from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LayoutList, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Transactions() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const workspaceData = location.state?.workspace || {
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA"
  };
  const [open, setOpen] = useState(false);
  
  return (
    <DashboardLayout
      workspaceName={workspaceData.name}
      userInitials={workspaceData.initials}
      owner={workspaceData.owner}
    >
      <div className="h-full flex flex-col md:flex-row">
        <div className="w-full flex justify-end items-center px-4 py-2 border-b bg-white z-10">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button onClick={() => setOpen(true)} variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-full max-w-md">
              <TransactionForm onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 h-full w-full">
          {isMobile ? (
            <div className="w-full bg-white flex flex-col">
              <TransactionActivity />
            </div>
          ) : (
            <div className="flex w-full h-full animate-fade-in">
              <div className="flex-1 bg-white overflow-y-auto h-full border-l border-gray-200 transition-all duration-300">
                <TransactionActivity />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
