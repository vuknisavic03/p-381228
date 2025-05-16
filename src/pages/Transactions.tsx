
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TransactionActivity } from "@/components/transactions/TransactionActivity";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-slate-100"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-4 w-4 text-[#1A1A1A]" />
              <span className="sr-only">Settings</span>
            </Button>
            <h1 className="text-xl font-semibold text-[#1A1A1A]">Activity</h1>
          </div>
          <Button
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#333] text-white px-4"
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
        
        {/* Settings Sheet */}
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetContent className="w-[400px] bg-white p-6">
            <div className="text-xl font-semibold mb-6">Settings</div>
            <div className="space-y-4">
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Workspace Settings</div>
                <div className="text-sm text-[#9EA3AD]">Manage workspace details and preferences</div>
              </div>
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Account</div>
                <div className="text-sm text-[#9EA3AD]">Update your personal information</div>
              </div>
              <div className="bg-[#F6F6F7] p-4 rounded-md">
                <div className="font-medium mb-1">Display</div>
                <div className="text-sm text-[#9EA3AD]">Change appearance settings</div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
