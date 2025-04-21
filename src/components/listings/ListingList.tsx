import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListingForm } from "./ListingForm";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

export function ListingList() {
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [selectedListing, setSelectedListing] = React.useState<number | null>(null);

  const handleSelectListing = (index: number) => {
    setSelectedListing(index);
    setIsEditOpen(true);
  };

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
              onSelect={() => handleSelectListing(index)}
            />
          ))}
        </div>
      </ScrollArea>

      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent side="right" className="w-[95%] sm:w-[700px] bg-white overflow-y-auto">
          <div className="py-6">
            <ListingForm 
              isEditing={true} 
              listingId={selectedListing !== null ? selectedListing + 1 : undefined} 
            />
          </div>
        </SheetContent>
      </Sheet>
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
  onSelect: () => void;
}

function ListingCard({ id, address, propertyType, tenant, phone, category, onSelect }: ListingCardProps) {
  return (
    <div 
      className="rounded-lg border border-transparent bg-white p-4 space-y-3 hover:border-[#EBECED] hover:shadow-sm transition-all cursor-pointer group animate-fade-in"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-[#8D95A1]">#{id}</span>
          <span className="text-base text-[#3D4149] font-medium tracking-tight">{address}</span>
        </div>
        <span className="text-sm bg-[#F5F5F7] text-[#8D95A1] px-2 py-0.5 rounded border border-[#EBECED] font-medium transition-colors group-hover:border-[#D1D5DB]">
          {propertyType}
        </span>
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
