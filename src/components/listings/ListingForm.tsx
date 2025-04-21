
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Euro, Upload } from "lucide-react";

export function ListingForm() {
  return (
    <div className="px-3 py-2 h-full overflow-y-auto bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-1 bg-[#1A1A1A] rounded-full" />
          <h2 className="text-base font-semibold text-black">Listing details</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs font-semibold text-black border-[#E7E8EC] hover:bg-gray-50 h-7 px-4 py-1 rounded"
        >
          Save
        </Button>
      </div>

      <div className="space-y-3">
        <div className="border border-[#E7E8EC] rounded-md divide-y">
          <div className="flex justify-between px-3 py-2 bg-gray-50">
            <span className="text-xs text-[#9EA3AD]">Listing ID</span>
            <span className="text-xs font-bold">#1</span>
          </div>
          <Input placeholder="City" className="border-0 rounded-none px-3 py-2 text-xs" />
          <Input placeholder="Address" className="border-0 rounded-none px-3 py-2 text-xs" />
          <Input placeholder="Country" className="border-0 rounded-none px-3 py-2 text-xs" />
          <Input placeholder="Postal Code" className="border-0 rounded-none px-3 py-2 text-xs" />
        </div>

        {/* Unit Details Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
            <span className="text-xs font-medium">Unit details</span>
          </div>
          <div className="border border-[#E7E8EC] rounded-md divide-y">
            <Input placeholder="Type" className="border-0 rounded-none px-3 py-2 text-xs" />
            <Input placeholder="Category" className="border-0 rounded-none px-3 py-2 text-xs" />
          </div>
        </div>

        {/* Tenant Details Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
              <span className="text-xs font-medium">Tenant details</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1 h-6 font-medium border-[#E7E8EC] hover:bg-gray-50 px-2 py-0 rounded"
            >
              <Euro className="h-3 w-3" /> Individual
            </Button>
          </div>
          <div className="border border-[#E7E8EC] rounded-md divide-y">
            <Input placeholder="Name" className="border-0 rounded-none px-3 py-2 text-xs" />
            <Input placeholder="Phone" className="border-0 rounded-none px-3 py-2 text-xs" />
            <Input placeholder="Email" className="border-0 rounded-none px-3 py-2 text-xs" />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
            <span className="text-xs font-medium">Payment details</span>
          </div>
          <div className="border border-[#E7E8EC] rounded-md divide-y">
            <Input placeholder="Revenue" className="border-0 rounded-none px-3 py-2 text-xs" />
            <Input placeholder="Expenses" className="border-0 rounded-none px-3 py-2 text-xs" />
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
              <span className="text-xs font-medium">Additional details</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1 h-6 font-medium border-[#E7E8EC] hover:bg-gray-50 px-2 py-0 rounded"
            >
              <Upload className="h-3 w-3" /> Upload docs
            </Button>
          </div>
          <div className="border border-[#E7E8EC] rounded-md p-2">
            <Input placeholder="Type here..." className="border-0 px-0 text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
