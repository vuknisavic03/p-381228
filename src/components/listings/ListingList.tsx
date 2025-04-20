
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export function ListingList() {
  return (
    <div className="p-5">
      <div className="rounded-lg bg-white border border-[#E7E8EC] shadow-[0px_4px_12px_5px_rgba(243,243,246,0.3)] p-2.5 flex items-center justify-between gap-5 flex-wrap">
        <div className="flex-1 relative flex items-center rounded-md border border-[#E7E8EC] px-2.5 py-2">
          <Search className="w-3.5 h-3.5 text-[#9EA3AD] mr-1.5" />
          <Input 
            className="border-0 p-0 text-[13px] text-[#9EA3AD] font-normal focus-visible:ring-0" 
            placeholder="Search..." 
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-[38px] px-4 font-medium">
            Edit
          </Button>
          <Button variant="outline" size="sm" className="h-[38px] px-2 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="mt-5.5">
        <div className="rounded-lg border border-[#E7E8EC] p-2.5">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-7">
              <span className="text-[13px] text-[#9EA3AD]">#1</span>
              <span className="text-[13px] text-black font-medium">Belgrade, Dunavska 12</span>
            </div>
            <div className="bg-[#F3F3F6] text-[14px] text-[#9EA3AD] px-2.5 py-1.5 rounded">
              Commercial
            </div>
          </div>
          <div className="h-px bg-[#E4E5EA] my-2.5" />
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-9 text-[13px]">
              <span className="text-[#9EA3AD]">Alexander Whitmore</span>
              <span className="text-black">000-000-0000</span>
            </div>
            <div className="bg-[#F3F3F6] text-[14px] text-[#9EA3AD] px-2.5 py-1.5 rounded">
              Retail
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
