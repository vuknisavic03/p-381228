
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export function ListingList() {
  return (
    <div className="p-6 space-y-6">
      <div className="rounded-lg bg-white border border-[#EBECED] p-1.5 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex-1 relative flex items-center rounded-md border border-[#EBECED] h-7 bg-[#FAFBFC] hover:bg-white hover:border-[#D1D5DB] transition-colors">
          <Search className="w-3.5 h-3.5 text-[#8D95A1] ml-2.5" />
          <Input 
            className="border-0 p-0 pl-1 h-7 text-sm text-[#3D4149] font-normal focus-visible:ring-0 bg-transparent" 
            placeholder="Search listings..." 
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 px-2.5 text-sm font-normal border-[#EBECED] bg-[#FAFBFC] hover:bg-white hover:border-[#D1D5DB] text-[#3D4149] transition-colors"
        >
          <Filter className="w-3.5 h-3.5 mr-1.5" />
          Filter
        </Button>
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
    <div className="rounded-lg border border-transparent bg-white p-4 space-y-3 hover:border-[#EBECED] hover:shadow-sm transition-all cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-[#8D95A1]">#{id}</span>
          <span className="text-base text-[#3D4149] font-medium tracking-tight">{address}</span>
        </div>
        <span className="text-sm bg-[#F5F5F7] text-[#8D95A1] px-2 py-0.5 rounded border border-[#EBECED] font-medium">
          {propertyType}
        </span>
      </div>
      <div className="h-px bg-[#F4F4F8]" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-base text-[#8D95A1] font-medium">{tenant}</span>
          <span className="text-base text-[#3D4149]">{phone}</span>
        </div>
        <span className="text-sm bg-[#F5F5F7] text-[#8D95A1] px-2 py-0.5 rounded border border-[#EBECED] font-medium">
          {category}
        </span>
      </div>
    </div>
  );
}
