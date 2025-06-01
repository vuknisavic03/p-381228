
import React, { useState } from "react";
import { Search, Building2, MapPin, Users, CheckCircle2, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-6">
      {/* Enhanced Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search properties by name, address, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl text-base transition-all duration-200"
        />
      </div>

      {/* Property List with Modern Cards */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-base font-medium">No properties found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
          </div>
        ) : (
          filteredListings.map((listing) => {
            const isSelected = listing.id === selectedListingId;
            
            return (
              <Card
                key={listing.id}
                className={`relative p-6 cursor-pointer transition-all duration-200 border-2 hover:shadow-lg ${
                  isSelected 
                    ? "border-blue-500 bg-blue-50/50 shadow-md scale-[1.02]" 
                    : "border-gray-200 bg-white hover:border-blue-200"
                }`}
                onClick={() => onSelect(listing.id)}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Property Icon */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                    isSelected ? "bg-blue-500" : "bg-gray-100"
                  }`}>
                    <Building2 className={`h-6 w-6 transition-colors duration-200 ${
                      isSelected ? "text-white" : "text-gray-500"
                    }`} />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="font-bold text-gray-900 text-lg truncate">
                          {listing.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {listing.address}, {listing.city}
                          </span>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className="ml-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1"
                      >
                        {formatPropertyType(listing.type)}
                      </Badge>
                    </div>

                    {/* Enhanced Occupancy and Units Info */}
                    <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                      {listing.units && listing.units.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Users className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold text-gray-900">
                              {listing.units.length} {listing.units.length === 1 ? 'Unit' : 'Units'}
                            </span>
                            <div className="text-xs text-gray-500">Multi-unit property</div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            listing.occupancyStatus === "occupied" ? "bg-green-500" : "bg-gray-400"
                          }`} />
                          <span className="text-sm font-medium text-gray-700">
                            {listing.occupancyStatus === "occupied" ? "Occupied" : "Vacant"}
                          </span>
                        </div>
                      )}
                      
                      {listing.tenant && (
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-amber-500" />
                          <span className="text-sm text-gray-600 font-medium">
                            {listing.tenant.name}
                          </span>
                        </div>
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
