
import React, { useState } from "react";
import { Check, ChevronsUpDown, House } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Listing } from "./TransactionFormTypes";

interface ListingSelectorProps {
  listings: Listing[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function ListingSelector({
  listings,
  selectedValue,
  onSelect,
  className,
}: ListingSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedListing = listings.find(listing => listing.id === selectedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border-gray-200 bg-white text-left h-10 text-sm focus:ring-2 focus:ring-gray-100 focus:border-gray-300 rounded-md",
            !selectedValue && "text-gray-500",
            className
          )}
        >
          {selectedValue ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-center rounded-md bg-gray-100 h-7 w-7 shrink-0">
                <House className="h-4 w-4 text-gray-500" />
              </div>
              <span className="truncate">{selectedListing?.name || "Select property"}</span>
            </div>
          ) : (
            "Select property"
          )}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 max-h-[350px] w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder="Search properties..." className="h-10" />
          <CommandEmpty>No property found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {listings.map((listing) => (
                <CommandItem
                  key={listing.id}
                  value={listing.id}
                  onSelect={() => {
                    onSelect(listing.id);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center justify-center rounded-md bg-gray-100 h-10 w-10 shrink-0">
                      <House className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-medium truncate">{listing.name}</span>
                      <span className="text-xs text-gray-500 truncate">
                        {listing.tenant?.name} • {listing.type}
                      </span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedValue === listing.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
