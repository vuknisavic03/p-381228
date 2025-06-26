
import React from "react";
import { Building, MapPin, Users, UserX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto">
      {listings.map((listing) => {
        const hasUnits = listing.units && listing.units.length > 0;
        const listingSelected = isListingSelected(listing.id);
        const unitsSelected = hasUnitsSelected(listing.id);
        
        return (
          <div key={listing.id} className="space-y-2">
            {/* Main Listing */}
            <Card className={cn(
              "p-3 cursor-pointer transition-colors hover:bg-gray-50",
              (listingSelected || unitsSelected) && "bg-blue-50 border-blue-200"
            )}>
              <div 
                className="flex items-center gap-3"
                onClick={() => onToggle(listing.id)}
              >
                <Checkbox 
                  checked={listingSelected}
                  onChange={() => {}} // Handled by parent click
                  className="pointer-events-none"
                />
                
                <div className="flex items-center gap-2 flex-1">
                  <Building className="h-4 w-4 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">
                      {listing.name}
                    </div>
                    {listing.address && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{listing.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {hasUnits && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {listing.units.length} units
                  </span>
                )}
              </div>
            </Card>

            {/* Units */}
            {hasUnits && (
              <div className="ml-4 space-y-1">
                {listing.units.map((unit) => {
                  const unitValue = `${listing.id}-${unit.id}`;
                  const isSelected = isUnitSelected(listing.id, unit.id);
                  
                  return (
                    <Card 
                      key={unit.id}
                      className={cn(
                        "p-2.5 cursor-pointer transition-colors hover:bg-gray-50 border-l-2",
                        isSelected 
                          ? "bg-blue-50 border-blue-200 border-l-blue-400" 
                          : "border-gray-200 border-l-gray-300"
                      )}
                      onClick={() => onToggle(unitValue)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => {}} // Handled by parent click
                          className="pointer-events-none"
                          size="sm"
                        />
                        
                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 text-sm">
                                {unit.unitNumber}
                              </span>
                              <span className={cn(
                                "px-1.5 py-0.5 text-xs font-medium rounded-full",
                                unit.occupancyStatus === "occupied"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              )}>
                                {capitalizeFirstLetter(unit.occupancyStatus)}
                              </span>
                            </div>
                            
                            {unit.tenant ? (
                              <div className="flex items-center gap-1 mt-1">
                                <Users className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600 truncate">
                                  {unit.tenant.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                  ({capitalizeFirstLetter(unit.tenant.type)})
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 mt-1">
                                <UserX className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">No tenant</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
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
