
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
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 px-3 text-sm font-normal border-[#EBECED] bg-[#FAFBFC] hover:bg-white hover:border-[#D1D5DB] text-[#3D4149] transition-colors"
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 px-2.5 text-sm font-normal border-[#EBECED] bg-[#FAFBFC] hover:bg-white hover:border-[#D1D5DB] text-[#3D4149] transition-colors"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" />
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
    <div className="rounded-lg border border-transparent bg-white p-4 space-y-3 hover:border-[#EBECED] hover:shadow-sm transition-all cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#8D95A1] opacity-0 group-hover:opacity-100 transition-opacity">#{id}</span>
          <span className="text-sm text-[#3D4149] font-medium tracking-tight">{address}</span>
        </div>
        <span className="text-xs bg-[#F5F5F7] text-[#8D95A1] px-2 py-0.5 rounded border border-[#EBECED] font-medium">
          {propertyType}
        </span>
      </div>
      <div className="h-px bg-[#F4F4F8]" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#8D95A1] font-medium">{tenant}</span>
          <span className="text-[#3D4149]">{phone}</span>
        </div>
        <span className="text-xs bg-[#F5F5F7] text-[#8D95A1] px-2 py-0.5 rounded border border-[#EBECED] font-medium">
          {category}
        </span>
      </div>
    </div>
  );
}
