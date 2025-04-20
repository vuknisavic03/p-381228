
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ListingForm() {
  return (
    <div className="p-6 border-r border-[#E7E8EC]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-1 bg-[#1A1A1A] rounded-full" />
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Listing details</h2>
        </div>
        <Button
          variant="outline"
          className="text-sm font-medium text-[#1A1A1A] border-[#E7E8EC]"
        >
          Save
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            placeholder="Listing ID"
            defaultValue="#1"
            className="text-[#9EA3AD]"
            readOnly
          />
        </div>

        <div>
          <Input placeholder="City" className="text-[#1A1A1A]" />
        </div>

        <div>
          <Input placeholder="Address" className="text-[#1A1A1A]" />
        </div>

        <div>
          <Input placeholder="Country" className="text-[#1A1A1A]" />
        </div>

        <div>
          <Input placeholder="Postal Code" className="text-[#1A1A1A]" />
        </div>

        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 bg-[#33C3F0] rounded-full" />
            <h3 className="text-base font-medium text-[#1A1A1A]">Add unit details</h3>
          </div>
          <div className="space-y-4">
            <Input placeholder="Type" className="text-[#1A1A1A]" />
            <Input placeholder="Category" className="text-[#1A1A1A]" />
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 bg-[#33C3F0] rounded-full" />
            <h3 className="text-base font-medium text-[#1A1A1A]">Add tenant details</h3>
          </div>
          <div className="space-y-4">
            <Input placeholder="Name" className="text-[#1A1A1A]" />
            <Input placeholder="Phone" className="text-[#1A1A1A]" />
            <Input placeholder="Mail" type="email" className="text-[#1A1A1A]" />
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 bg-[#33C3F0] rounded-full" />
            <h3 className="text-base font-medium text-[#1A1A1A]">Add payment details</h3>
          </div>
          <div className="space-y-4">
            <Input placeholder="Revenue" className="text-[#1A1A1A]" />
            <Input placeholder="Expenses" className="text-[#1A1A1A]" />
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#33C3F0] rounded-full" />
              <h3 className="text-base font-medium text-[#1A1A1A]">Add some additional details</h3>
            </div>
            <Button variant="outline" className="text-sm font-medium text-[#1A1A1A] border-[#E7E8EC]">
              Upload documents
            </Button>
          </div>
          <Textarea 
            placeholder="Type here..." 
            className="min-h-[100px] text-[#1A1A1A]"
          />
        </div>
      </div>
    </div>
  );
}
