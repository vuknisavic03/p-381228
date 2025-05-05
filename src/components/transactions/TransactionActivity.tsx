
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Euro, Search } from "lucide-react";

export function TransactionActivity() {
  return (
    <div className="p-4 md:p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Activity</h2>
        <div className="flex items-center border border-[#E7E8EC] rounded-md px-2.5 py-2">
          <Euro className="h-3.5 w-3.5 mr-2.5 text-gray-700" />
          <span className="text-sm font-medium">Revenue</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search transactions" 
            className="pl-9 border-[#E7E8EC] focus:border-[#E7E8EC]" 
          />
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <span className="text-[#9EA3AD] text-base">Still no activity</span>
      </div>
    </div>
  );
}
