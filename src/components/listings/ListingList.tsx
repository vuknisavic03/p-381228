import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ListingList() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 space-y-6 flex-shrink-0">
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
      </div>

      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="space-y-2">
          {[...Array(10)].map((_, index) => (
            <ListingCard
              key={index + 1}
              id={`${index + 1}`}
              address={`Belgrade, Dunavska ${12 + index}`}
              propertyType={index % 2 === 0 ? "Commercial" : "Residential"}
              tenant={`Alexander Whitmore ${index + 1}`}
              phone="000-000-0000"
              category={index % 3 === 0 ? "Retail" : index % 2 === 0 ? "Office" : "Restaurant"}
            />
          ))}
        </div>
      </ScrollArea>
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
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="rounded-lg border border-transparent bg-white p-4 space-y-3 hover:border-[#EBECED] hover:shadow-sm transition-all cursor-pointer group animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-[#8D95A1]">#{id}</span>
          <span className="text-base text-[#3D4149] font-medium tracking-tight">{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-[#F5F5F7] text-[#8D95A1] px-2 py-0.5 rounded border border-[#EBECED] font-medium transition-colors group-hover:border-[#D1D5DB]">
            {propertyType}
          </span>
          {isHovered && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                console.log("View details for listing", id);
              }}
            >
              <ArrowRight className="w-4 h-4 text-[#8D95A1]" />
            </Button>
          )}
        </div>
      </div>
      <div className="h-px bg-[#F4F4F8]" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-base text-[#8D95A1] font-medium">{tenant}</span>
          <span className="text-base text-[#3D4149]">{phone}</span>
        </div>
        <span className="text-sm bg-[#F5F5F7] text-[#8D95A1] px-2 py-0.5 rounded border border-[#EBECED] font-medium transition-colors group-hover:border-[#D1D5DB]">
          {category}
        </span>
      </div>
    </div>
  );
}
