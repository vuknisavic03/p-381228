
import React from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        {/* Header section */}
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        
        {/* Horizontal separator line */}
        <Separator className="w-full border-[#E4E5EA]" />
        
        <div className="flex-1 overflow-y-auto bg-white p-6">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#F6F6F7] p-4 rounded-md">
                  <p className="text-sm text-[#9EA3AD]">This is a placeholder for Profile content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
