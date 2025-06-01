
import React, { useState } from "react";
import { Search, Building2, MapPin, Users, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Listing } from "./TransactionFormTypes";
import { formatPropertyType } from "@/utils/propertyTypeUtils";

interface PropertySelectorProps {
  listings: Listing[];
  selectedListingId: string;
  onSelect: (listingId: string) => void;
}

export function PropertySelector({ listings, selectedListingId, onSelect }: PropertySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredListings = listings.filter(listing =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search properties by name, address, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-11 border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        />
      </div>

      {/* Property List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredListings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Building2 className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No properties found</p>
          </div>
        ) : (
          filteredListings.map((listing) => {
            const isSelected = listing.id === selectedListingId;
            
            return (
              <Card
                key={listing.id}
                className={`relative p-4 cursor-pointer transition-all border-2 hover:border-blue-200 hover:shadow-sm ${
                  isSelected 
                    ? "border-blue-500 bg-blue-50/50 shadow-sm" 
                    : "border-gray-100 bg-white"
                }`}
                onClick={() => onSelect(listing.id)}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {/* Property Icon */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    isSelected ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    <Building2 className={`h-5 w-5 ${isSelected ? "text-blue-600" : "text-gray-500"}`} />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-base truncate">
                          {listing.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-600 truncate">
                            {listing.address}, {listing.city}
                          </span>
                        </div>
                      </div>
                      
                      <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-700 text-xs">
                        {formatPropertyType(listing.type)}
                      </Badge>
                    </div>

                    {/* Occupancy and Units Info */}
                    <div className="flex items-center gap-3 text-xs">
                      {listing.units && listing.units.length > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-gray-600">
                            {listing.units.length} {listing.units.length === 1 ? 'unit' : 'units'}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${
                            listing.occupancyStatus === "occupied" ? "bg-green-500" : "bg-gray-400"
                          }`} />
                          <span className="text-gray-600">
                            {listing.occupancyStatus === "occupied" ? "Occupied" : "Vacant"}
                          </span>
                        </div>
                      )}
                      
                      {listing.tenant && (
                        <span className="text-gray-500">
                          • {listing.tenant.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
