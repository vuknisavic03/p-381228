import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export function ListingList() {
  return (
    <div className="p-3 space-y-3">
      <div className="rounded-md bg-white border border-[#E7E8EC] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-1.5 flex items-center justify-between gap-3">
        <div className="flex-1 relative flex items-center rounded-md border border-[#E7E8EC] h-7 bg-[#F8F9FA]">
          <Search className="w-3.5 h-3.5 text-[#9EA3AD] ml-2" />
          <Input 
            className="border-0 p-0 h-7 text-xs text-[#9EA3AD] font-normal focus-visible:ring-0 bg-transparent" 
            placeholder="Search listings..." 
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs font-medium border-[#E7E8EC] bg-[#F8F9FA] hover:bg-gray-50">
            Edit
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs font-medium border-[#E7E8EC] bg-[#F8F9FA] hover:bg-gray-50">
            <Filter className="w-3 h-3 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <ListingCard
          id="1"
          address="Belgrade, Dunavska 12"
          propertyType="Commercial"
          tenant="Alexander Whitmore"
          phone="000-000-0000"
          category="Retail"
        />
        <ListingCard
          id="2"
          address="New Belgrade, Block 23"
          propertyType="Residential"
          tenant="Maria Johnson"
          phone="111-111-1111"
          category="Apartment"
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
    <div className="rounded-md border border-[#E7E8EC] bg-white p-3 space-y-2 hover:border-[#1EAEDB] hover:shadow-[0_2px_4px_rgba(0,0,0,0.04)] transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#9EA3AD]">#{id}</span>
          <span className="text-xs text-[#1A1F2C] font-medium">{address}</span>
        </div>
        <span className="text-[11px] bg-[#F8F9FA] text-[#9EA3AD] px-2 py-0.5 rounded">
          {propertyType}
        </span>
      </div>
      <div className="h-px bg-[#F4F4F8]" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-[#9EA3AD]">{tenant}</span>
          <span className="text-[#1A1F2C]">{phone}</span>
        </div>
        <span className="text-[11px] bg-[#F8F9FA] text-[#9EA3AD] px-2 py-0.5 rounded">
          {category}
        </span>
      </div>
    </div>
  );
}
