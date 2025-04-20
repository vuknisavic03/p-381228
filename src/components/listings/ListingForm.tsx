
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Euro, Upload } from "lucide-react";

export function ListingForm() {
  return (
    <div className="p-4 border-r border-[#E7E8EC] h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 bg-[#1A1A1A] rounded-full" />
          <h2 className="text-lg font-medium text-black">Listing details</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-sm font-medium text-black border-[#E7E8EC]"
        >
          Save
        </Button>
      </div>

      <div className="space-y-4">
        {/* Listing Details Section */}
        <div className="border border-[#E7E8EC] rounded-lg divide-y">
          <div className="flex justify-between p-3">
            <span className="text-xs text-[#9EA3AD]">Listing ID</span>
            <span className="text-xs font-bold">#1</span>
          </div>
          <Input placeholder="City" className="border-0 rounded-none px-3 py-2 text-sm" />
          <Input placeholder="Address" className="border-0 rounded-none px-3 py-2 text-sm" />
          <Input placeholder="Country" className="border-0 rounded-none px-3 py-2 text-sm" />
          <Input placeholder="Postal Code" className="border-0 rounded-none px-3 py-2 text-sm" />
        </div>

        {/* Unit Details Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#006FB5] rounded-full" />
              <span className="text-sm font-medium">Unit details</span>
            </div>
          </div>
          <div className="border border-[#E7E8EC] rounded-lg divide-y">
            <Input placeholder="Type" className="border-0 rounded-none px-3 py-2 text-sm" />
            <Input placeholder="Category" className="border-0 rounded-none px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Tenant Details Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#006FB5] rounded-full" />
              <span className="text-sm font-medium">Tenant details</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 h-7 font-medium"
            >
              <Euro className="h-3 w-3" /> Individual
            </Button>
          </div>
          <div className="border border-[#E7E8EC] rounded-lg divide-y">
            <Input placeholder="Name" className="border-0 rounded-none px-3 py-2 text-sm" />
            <Input placeholder="Phone" className="border-0 rounded-none px-3 py-2 text-sm" />
            <Input placeholder="Email" className="border-0 rounded-none px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#006FB5] rounded-full" />
            <span className="text-sm font-medium">Payment details</span>
          </div>
          <div className="border border-[#E7E8EC] rounded-lg divide-y">
            <Input placeholder="Revenue" className="border-0 rounded-none px-3 py-2 text-sm" />
            <Input placeholder="Expenses" className="border-0 rounded-none px-3 py-2 text-sm" />
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#006FB5] rounded-full" />
              <span className="text-sm font-medium">Additional details</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 h-7 font-medium"
            >
              <Upload className="h-3 w-3" /> Upload docs
            </Button>
          </div>
          <div className="border border-[#E7E8EC] rounded-lg p-3">
            <Input placeholder="Type here..." className="border-0 px-0 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
