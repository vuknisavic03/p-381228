
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Euro } from "lucide-react";

export function ListingForm() {
  return (
    <div className="p-8 border-r border-[#E7E8EC]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-1 bg-[#1A1A1A] rounded-full" />
          <h2 className="text-xl font-medium text-black">Listing details</h2>
        </div>
        <Button
          variant="outline"
          className="h-[38px] px-2.5 py-2 text-sm font-medium text-black border-[#E7E8EC]"
        >
          Save
        </Button>
      </div>

      <div className="space-y-5">
        <div className="border border-[#E7E8EC] rounded-lg">
          <div className="flex gap-10 p-3.5">
            <span className="text-[#9EA3AD] text-[13px] font-medium">Listing ID</span>
            <span className="text-black text-[13px] font-bold">#1</span>
          </div>
          <div className="h-px bg-[#E7E8EC]" />
          <div className="p-3.5">
            <span className="text-[#9EA3AD] text-[13px] font-medium">City *</span>
          </div>
          <div className="h-px bg-[#E7E8EC]" />
          <div className="p-3.5">
            <span className="text-[#9EA3AD] text-[13px] font-medium">Address *</span>
          </div>
          <div className="h-px bg-[#E7E8EC]" />
          <div className="p-3.5">
            <span className="text-[#9EA3AD] text-[13px] font-medium">Country</span>
          </div>
          <div className="h-px bg-[#E7E8EC]" />
          <div className="p-3.5">
            <span className="text-[#9EA3AD] text-[13px] font-medium">Postal Code</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-2 h-2 bg-[#006FB5] rounded-full" />
              <span className="text-base font-medium text-black">Add unit details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-11 h-[22px] bg-gray-100 rounded" />
              <div className="w-[22px] h-[22px] border border-[#E7E8EC] rounded" />
            </div>
          </div>

          <div className="border border-[#E7E8EC] rounded-lg p-1">
            <span className="text-[#9EA3AD] text-[13px] font-medium p-3.5 block">Type *</span>
            <div className="h-px bg-[#E7E8EC]" />
            <span className="text-[#9EA3AD] text-[13px] font-medium p-3.5 block">Category</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-2 h-2 bg-[#006FB5] rounded-full" />
              <span className="text-base font-medium text-black">Add tenant details</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-[38px] px-2.5 py-2 gap-2 text-sm font-medium text-black border-[#E7E8EC]"
            >
              <Euro className="w-3 h-3" />
              Individual
            </Button>
          </div>

          <div className="border border-[#E7E8EC] rounded-lg p-1">
            <span className="text-[#9EA3AD] text-[13px] font-medium p-3.5 block">Name *</span>
            <div className="h-px bg-[#E7E8EC]" />
            <span className="text-[#9EA3AD] text-[13px] font-medium p-3.5 block">Phone</span>
            <div className="h-px bg-[#E7E8EC]" />
            <span className="text-[#9EA3AD] text-[13px] font-medium p-3.5 block">Mail</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-2 h-2 bg-[#006FB5] rounded-full" />
            <span className="text-base font-medium text-black">Add payment details</span>
          </div>

          <div className="border border-[#E7E8EC] rounded-lg p-1">
            <span className="text-[#9EA3AD] text-[13px] font-medium p-3.5 block">Revenue</span>
            <div className="h-px bg-[#E7E8EC]" />
            <span className="text-[#9EA3AD] text-[13px] font-medium p-3.5 block">Expenses</span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-2 h-2 bg-[#006FB5] rounded-full" />
              <span className="text-base font-medium text-black">Add some additional details</span>
            </div>
            <Button
              variant="outline"
              className="h-[38px] px-2 py-2 text-sm font-medium text-black border-[#E7E8EC] shadow-[0px_4px_8px_5px_rgba(236,236,234,0.3)]"
            >
              Upload documents
            </Button>
          </div>

          <div className="border border-[#E7E8EC] rounded-lg p-4">
            <span className="text-[#9EA3AD] text-[13px] font-medium">Type here...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
