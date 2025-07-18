
import React from "react";
import { Building, MapPin, Users, UserX, ChevronRight, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { useState } from "react";

interface Unit {
  id: string;
  unitNumber: string;
  occupancyStatus: string;
  tenant?: {
    name: string;
    type: string;
  };
}

interface Listing {
  id: string;
  name: string;
  type: string;
  address?: string;
  units?: Unit[];
}

interface ListingsUnitsFilterProps {
  listings: Listing[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export function ListingsUnitsFilter({ listings, selectedValues, onToggle }: ListingsUnitsFilterProps) {
  const [expandedListings, setExpandedListings] = useState<Set<string>>(new Set());

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isListingSelected = (listingId: string) => {
    return selectedValues.includes(listingId);
  };

  const isUnitSelected = (listingId: string, unitId: string) => {
    return selectedValues.includes(`${listingId}-${unitId}`);
  };

  const hasUnitsSelected = (listingId: string) => {
    return selectedValues.some(value => value.startsWith(`${listingId}-`));
  };

  const toggleExpanded = (listingId: string) => {
    const newExpanded = new Set(expandedListings);
    if (newExpanded.has(listingId)) {
      newExpanded.delete(listingId);
    } else {
      newExpanded.add(listingId);
    }
    setExpandedListings(newExpanded);
  };

  const isExpanded = (listingId: string) => expandedListings.has(listingId);

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto w-full">
      {listings.map((listing) => {
        const hasUnits = listing.units && listing.units.length > 0;
        const listingSelected = isListingSelected(listing.id);
        const unitsSelected = hasUnitsSelected(listing.id);
        const expanded = isExpanded(listing.id);
        
        return (
          <div key={listing.id} className="space-y-1">
            {/* Main Listing */}
            <div className={cn(
              "border-2 rounded-lg transition-all duration-200 hover:shadow-sm mb-2",
              (listingSelected || unitsSelected) 
                ? "bg-filter-selected-bg border-filter-selected-border shadow-sm" 
                : "bg-background border-border hover:border-muted-foreground"
            )}>
              <div className="p-4">
                <div className="flex items-center gap-2.5">
                  {hasUnits && (
                    <button
                      onClick={() => toggleExpanded(listing.id)}
                      className="p-0.5 hover:bg-gray-100/70 rounded transition-colors flex-shrink-0"
                    >
                      {expanded ? (
                        <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                      )}
                    </button>
                  )}
                  
                  <div 
                    className="flex items-center gap-2.5 flex-1 cursor-pointer min-w-0"
                    onClick={() => onToggle(listing.id)}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Building className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">
                          {listing.name}
                        </div>
                        {listing.address && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{listing.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {hasUnits && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs px-2 py-0.5 bg-gray-100/70 text-gray-600 rounded-full font-medium">
                        {listing.units.length} unit{listing.units.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Units - Only show when expanded */}
              {hasUnits && expanded && (
                <div className="border-t border-border bg-muted/30">
                  <div className="p-3 space-y-2">
                    {listing.units.map((unit) => {
                      const unitValue = `${listing.id}-${unit.id}`;
                      const isSelected = isUnitSelected(listing.id, unit.id);
                      
                      return (
                        <div 
                          key={unit.id}
                          className={cn(
                            "p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ml-4 mb-2",
                            isSelected 
                              ? "bg-filter-selected-bg border-filter-selected-border shadow-sm" 
                              : "bg-background border-border hover:border-muted-foreground hover:shadow-sm"
                          )}
                          onClick={() => onToggle(unitValue)}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">
                                  {unit.unitNumber}
                                </span>
                                <span className={cn(
                                  "px-2 py-0.5 text-xs font-medium rounded-full",
                                  unit.occupancyStatus === "occupied"
                                    ? "bg-green-100/70 text-green-700 border border-green-200/60"
                                    : "bg-gray-100/70 text-gray-600 border border-gray-200/60"
                                )}>
                                  {capitalizeFirstLetter(unit.occupancyStatus)}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                {unit.tenant ? (
                                  <>
                                    <Users className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-600 truncate">
                                      {unit.tenant.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      ({capitalizeFirstLetter(unit.tenant.type)})
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <UserX className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">No tenant</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {listings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Building className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No listings available</p>
        </div>
      )}
    </div>
  );
}
