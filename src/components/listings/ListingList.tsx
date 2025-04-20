
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export function ListingList() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9EA3AD] w-4 h-4" />
          <Input className="pl-10" placeholder="Search..." />
        </div>
        <Button variant="outline" className="gap-2 border-[#E7E8EC]">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="border border-[#E7E8EC] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#9EA3AD]">#1</span>
              <h3 className="text-base font-medium text-[#1A1A1A]">Belgrade, Dunavska 12</h3>
              <span className="px-2 py-1 bg-[#F1F0FB] text-[#9b87f5] text-xs rounded">Commercial</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9EA3AD]">Alexander Whitmore</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#9EA3AD]">000-000-0000</span>
              <span className="text-sm text-[#9EA3AD]">Retail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
