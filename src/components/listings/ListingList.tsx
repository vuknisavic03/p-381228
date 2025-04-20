
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export function ListingList() {
  return (
    <div className="p-4">
      <div className="rounded-lg bg-white border border-[#E7E8EC] shadow-sm p-2 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex-1 relative flex items-center rounded-md border border-[#E7E8EC] px-2 py-1.5">
          <Search className="w-3.5 h-3.5 text-[#9EA3AD] mr-1.5" />
          <Input 
            className="border-0 p-0 text-xs text-[#9EA3AD] font-normal focus-visible:ring-0" 
            placeholder="Search..." 
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs font-medium">
            Edit
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs font-medium">
            <Filter className="w-3 h-3" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <ListingCard
          id="1"
          address="Belgrade, Dunavska 12"
          propertyType="Commercial"
          tenant="Alexander Whitmore"
          phone="000-000-0000"
          category="Retail"
        />
      </div>
    </div>
  );
}

interface ListingCardProps {
  id: string;
  address: string;
  propertyType: string;
  tenant: string;
  phone: string;
  category: string;
}

function ListingCard({ id, address, propertyType, tenant, phone, category }: ListingCardProps) {
  return (
    <div className="rounded-lg border border-[#E7E8EC] p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#9EA3AD]">#{id}</span>
          <span className="text-xs text-black font-medium">{address}</span>
        </div>
        <span className="text-xs bg-[#F3F3F6] text-[#9EA3AD] px-2 py-1 rounded">
          {propertyType}
        </span>
      </div>
      <div className="h-px bg-[#E4E5EA]" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-xs">
          <span className="text-[#9EA3AD]">{tenant}</span>
          <span className="text-black">{phone}</span>
        </div>
        <span className="text-xs bg-[#F3F3F6] text-[#9EA3AD] px-2 py-1 rounded">
          {category}
        </span>
      </div>
    </div>
  );
}
