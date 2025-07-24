import React, { useState } from "react";
import { ChevronDown, ChevronRight, Building, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Unit {
  id: string;
  name: string;
  type?: string;
}

interface Listing {
  id: string;
  address: string;
  units?: Unit[];
}

interface ListingsUnitsFilterProps {
  listings: Listing[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export function ListingsUnitsFilter({
  listings,
  selectedValues,
  onToggle
}: ListingsUnitsFilterProps) {
  const [expandedListings, setExpandedListings] = useState<Set<string>>(new Set());

  const toggleListing = (listingId: string) => {
    setExpandedListings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(listingId)) {
        newSet.delete(listingId);
      } else {
        newSet.add(listingId);
      }
      return newSet;
    });
  };

  const isListingSelected = (listing: Listing) => {
    return selectedValues.includes(`listing-${listing.id}`) || 
           (listing.units || []).some(unit => selectedValues.includes(`unit-${unit.id}`));
  };

  const isUnitSelected = (unitId: string) => {
    return selectedValues.includes(`unit-${unitId}`);
  };

  const handleListingToggle = (listing: Listing) => {
    const listingKey = `listing-${listing.id}`;
    const isCurrentlySelected = selectedValues.includes(listingKey);
    
    if (isCurrentlySelected) {
      // Deselect listing and all its units
      onToggle(listingKey);
      (listing.units || []).forEach(unit => {
        const unitKey = `unit-${unit.id}`;
        if (selectedValues.includes(unitKey)) {
          onToggle(unitKey);
        }
      });
    } else {
      // Select listing
      onToggle(listingKey);
    }
  };

  const handleUnitToggle = (listing: Listing, unit: Unit) => {
    const unitKey = `unit-${unit.id}`;
    const listingKey = `listing-${listing.id}`;
    
    onToggle(unitKey);
    
    // If listing was selected as a whole, deselect it since we're now selecting individual units
    if (selectedValues.includes(listingKey)) {
      onToggle(listingKey);
    }
  };

  return (
    <ScrollArea className="max-h-80">
      <div className="space-y-1">
        {listings.map(listing => {
          const isExpanded = expandedListings.has(listing.id);
          const hasUnits = listing.units && listing.units.length > 0;
          const listingSelected = isListingSelected(listing);
          
          return (
            <div key={listing.id} className="space-y-1">
              {/* Listing Row */}
              <div className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all cursor-pointer",
                listingSelected 
                  ? "bg-muted/40 text-foreground" 
                  : "hover:bg-muted/30 text-muted-foreground hover:text-foreground"
              )}>
                {hasUnits && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleListing(listing.id);
                    }}
                    className="h-6 w-6 p-0 hover:bg-muted/60"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                )}
                
                <div
                  onClick={() => handleListingToggle(listing)}
                  className="flex items-center gap-2 flex-1"
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedValues.includes(`listing-${listing.id}`)
                      ? "bg-foreground border-foreground" 
                      : listingSelected
                      ? "border-muted-foreground/50 bg-muted/20"
                      : "border-muted-foreground/30 hover:border-muted-foreground/50"
                  )}>
                    {selectedValues.includes(`listing-${listing.id}`) && (
                      <div className="w-2 h-2 bg-background rounded-full" />
                    )}
                  </div>
                  
                  <Building className="h-4 w-4 text-muted-foreground" />
                  
                  <div className="flex-1">
                    <div className="text-sm font-medium">{listing.address}</div>
                    {hasUnits && (
                      <div className="text-xs text-muted-foreground">
                        {listing.units!.length} unit{listing.units!.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
                
                {!hasUnits && <div className="w-6" />}
              </div>

              {/* Units */}
              {hasUnits && isExpanded && (
                <div className="ml-8 space-y-1">
                  {listing.units!.map(unit => (
                    <div
                      key={unit.id}
                      onClick={() => handleUnitToggle(listing, unit)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md transition-all cursor-pointer",
                        isUnitSelected(unit.id)
                          ? "bg-muted/40 border border-muted-foreground/20" 
                          : "hover:bg-muted/30"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                        isUnitSelected(unit.id)
                          ? "bg-foreground border-foreground" 
                          : "border-muted-foreground/30 hover:border-muted-foreground/50"
                      )}>
                        {isUnitSelected(unit.id) && (
                          <div className="w-2 h-2 bg-background rounded-full" />
                        )}
                      </div>
                      
                      <Home className="h-3.5 w-3.5 text-muted-foreground" />
                      
                      <div className="flex-1">
                        <div className="text-sm">{unit.name}</div>
                        {unit.type && (
                          <div className="text-xs text-muted-foreground">{unit.type}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        
        {listings.length === 0 && (
          <div className="px-3 py-4 text-sm text-muted-foreground text-center">
            No properties available
          </div>
        )}
      </div>
    </ScrollArea>
  );
}