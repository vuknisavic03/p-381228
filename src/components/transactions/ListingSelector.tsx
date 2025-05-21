
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Listing } from "./TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";

interface ListingSelectorProps {
  listings: Listing[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function ListingSelector({
  listings,
  selectedValue,
  onSelect,
  placeholder = "Select property"
}: ListingSelectorProps) {
  const selectedListing = listings.find(l => l.id === selectedValue);

  return (
    <Select value={selectedValue} onValueChange={onSelect}>
      <SelectTrigger className="w-full h-9 border-gray-200 bg-white text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-gray-900 rounded-md">
        <SelectValue placeholder={placeholder}>
          {selectedListing ? (
            <div className="flex items-center">
              <span>{selectedListing.name}</span>
              <span className="ml-2 text-xs text-gray-500">
                ({formatPropertyType(selectedListing.type)})
              </span>
            </div>
          ) : (
            placeholder
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {listings.map((listing) => (
            <SelectItem 
              key={listing.id} 
              value={listing.id}
              className="flex items-center py-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-gray-600">
                  {getPropertyTypeIcon(listing.type)}
                  <span className="font-medium">{listing.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({formatPropertyType(listing.type)})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
