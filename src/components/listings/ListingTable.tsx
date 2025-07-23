import React from "react";
import { MapPin, Phone, Mail, Users, UserX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropertyTypeDisplay, formatPropertyType } from "@/utils/propertyTypeUtils";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";

// Category mapping from ListingForm - this ensures consistency
const typeToCategoryMap = {
  residential_rental: [
    { value: "single_family", label: "Single-family Home" },
    { value: "multi_family", label: "Multi-family" },
    { value: "apartment_condo", label: "Apartment/Condo" },
  ],
  commercial_rental: [
    { value: "office", label: "Office Space" },
    { value: "retail", label: "Retail Store" },
    { value: "medical", label: "Medical/Professional" },
  ],
  industrial: [
    { value: "warehouse", label: "Warehouse" },
    { value: "distribution", label: "Distribution Facility" },
    { value: "manufacturing", label: "Manufacturing" },
  ],
  hospitality: [
    { value: "hotel", label: "Hotel" },
    { value: "motel", label: "Motel" },
    { value: "bed_breakfast", label: "Bed & Breakfast" },
  ],
  vacation_rental: [
    { value: "short_term", label: "Short-term Rental" },
    { value: "serviced_apartment", label: "Serviced Apartment" },
    { value: "holiday_home", label: "Holiday Home" },
  ],
  mixed_use: [
    { value: "residential_commercial", label: "Residential-Commercial" },
    { value: "live_work", label: "Live-Work Space" },
    { value: "multi_purpose", label: "Multi-Purpose" },
  ],
};

// Helper function to get category label
const getCategoryLabel = (type: string, category: string) => {
  const typeCategories = typeToCategoryMap[type as keyof typeof typeToCategoryMap];
  if (!typeCategories) return category;
  
  const foundCategory = typeCategories.find(cat => cat.value === category);
  return foundCategory ? foundCategory.label : category;
};

interface ListingTableProps {
  listings: any[];
  onListingClick: (listing: any) => void;
}

export function ListingTable({ listings, onListingClick }: ListingTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow className="border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-gray-50/40">
            <TableHead className="font-semibold text-gray-800 text-sm py-4 px-6 w-[100px]">Property</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4 w-[200px]">Address</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4 w-[180px]">Tenant</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4 w-[150px]">Contact</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4 w-[120px]">Units</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4 w-[140px]">Type</TableHead>
            <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4 w-[120px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map((listing) => {
            // For hospitality and vacation rental, don't show occupancy status
            const shouldShowOccupancy = listing.type !== 'hospitality' && listing.type !== 'vacation_rental';
            const occupancyStatus = shouldShowOccupancy ? (listing.occupancyStatus || (listing.tenant ? 'occupied' : 'vacant')) : null;
            
            return (
              <TableRow
                key={listing.id}
                className="hover:bg-gradient-to-r hover:from-gray-50/70 hover:to-transparent cursor-pointer group transition-all duration-300 border-b border-gray-100/60 last:border-b-0"
                onClick={() => onListingClick(listing)}
              >
                <TableCell className="py-5 px-6 w-[100px]">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#9EA3AD] font-medium">#{listing.id}</span>
                  </div>
                </TableCell>
                
                <TableCell className="py-5 px-4 w-[200px]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary/80 flex-shrink-0" />
                    <span className="font-medium truncate">{listing.address}</span>
                  </div>
                </TableCell>
                
                <TableCell className="py-5 px-4 w-[180px]">
                  <span className="text-[#9EA3AD] font-medium truncate block">
                    {shouldShowOccupancy ? (listing.tenant?.name || 'No Tenant') : '—'}
                  </span>
                </TableCell>
                
                <TableCell className="py-5 px-4 w-[150px]">
                  <div className="space-y-1">
                    {shouldShowOccupancy && listing.tenant?.phone && (
                      <div className="flex items-center gap-2 text-xs transition-all duration-200 hover:text-primary">
                        <Phone className="h-3 w-3 text-[#9EA3AD] flex-shrink-0" />
                        <span className="truncate">{listing.tenant.phone}</span>
                      </div>
                    )}
                    {shouldShowOccupancy && listing.tenant?.email && (
                      <div className="flex items-center gap-2 text-xs transition-all duration-200 hover:text-primary">
                        <Mail className="h-3 w-3 text-[#9EA3AD] flex-shrink-0" />
                        <span className="truncate">{listing.tenant.email}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell className="py-5 px-4 w-[120px]">
                  <span className="text-sm text-gray-600">
                    {listing.units && listing.units.length > 0 
                      ? `${listing.units.length} units` 
                      : 'Single unit'
                    }
                  </span>
                </TableCell>
                
                <TableCell className="py-5 px-4 w-[140px]">
                  <PropertyTypeDisplay 
                    type={listing.type as PropertyType} 
                    className="px-2.5 py-1 bg-primary/5 text-primary/80 text-sm rounded-full font-medium whitespace-nowrap"
                  />
                </TableCell>
                
                <TableCell className="py-5 px-4 w-[120px]">
                  {shouldShowOccupancy && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      occupancyStatus === 'occupied' 
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      {occupancyStatus === 'occupied' ? (
                        <Users className="h-3 w-3 flex-shrink-0" />
                      ) : (
                        <UserX className="h-3 w-3 flex-shrink-0" />
                      )}
                      <span>{occupancyStatus === 'occupied' ? 'Occupied' : 'Vacant'}</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      {listings.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-500 mb-4">
            No listings match your current filters
          </p>
        </div>
      )}
    </div>
  );
}