import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Building, Trash2 } from "lucide-react";

interface ListingTableProps {
  listings: any[];
  onEdit: (listing: any) => void;
  onDelete?: (listing: any) => void;
  isLoading?: boolean;
}

export const ListingTable: React.FC<ListingTableProps> = ({
  listings,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const getOccupancyColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "occupied":
        return "text-emerald-600 bg-emerald-50";
      case "vacant":
        return "text-red-600 bg-red-50";
      case "maintenance":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "residential":
        return "bg-blue-500";
      case "commercial":
        return "bg-purple-500";
      case "mixed":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const handleRowClick = (listing: any) => {
    onEdit(listing);
  };

  const handleEditClick = (e: React.MouseEvent, listing: any) => {
    e.stopPropagation();
    onEdit(listing);
  };

  const handleDeleteClick = (e: React.MouseEvent, listing: any) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      onDelete?.(listing);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading listings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white">
              <TableRow className="border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-gray-50/40">
                <TableHead className="font-semibold text-gray-800 text-sm py-4 px-6">Property</TableHead>
                <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4">Occupancy</TableHead>
                <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4">Type</TableHead>
                <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4">Units</TableHead>
                <TableHead className="font-semibold text-gray-800 text-sm py-4 px-4">Tenant</TableHead>
                <TableHead className="w-20 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow
                  key={`listing-${listing.id}`}
                  className="hover:bg-gradient-to-r hover:from-gray-50/70 hover:to-transparent cursor-pointer group transition-all duration-300 border-b border-gray-100/60 last:border-b-0"
                  onClick={() => handleRowClick(listing)}
                >
                  <TableCell className="py-5 px-6">
                    <div className="space-y-1.5">
                      <div className="font-semibold text-gray-900 text-sm leading-tight">
                        {listing.address}
                      </div>
                      {listing.neighbourhood && (
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {listing.neighbourhood}, {listing.country}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-5 px-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${getOccupancyColor(listing.occupancyStatus)}`}>
                      {listing.occupancyStatus}
                    </span>
                  </TableCell>
                  
                  <TableCell className="py-5 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPropertyTypeColor(listing.propertyType)}`}></div>
                      <span className="text-gray-600 text-sm font-medium">{listing.propertyType}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-5 px-4">
                    <div className="text-gray-700 text-sm font-medium">
                      {listing.units ? `${listing.units.length} unit${listing.units.length > 1 ? 's' : ''}` : '0 units'}
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-5 px-4">
                    <div className="text-gray-600 text-sm font-medium">
                      {listing.tenant || 'No tenant'}
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-5 px-2">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100 hover:scale-105"
                        onClick={(e) => handleEditClick(e, listing)}
                        aria-label={`Edit listing at ${listing.address}`}
                      >
                        <ChevronRight className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </Button>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-red-50 hover:scale-105"
                          onClick={(e) => handleDeleteClick(e, listing)}
                          aria-label={`Delete listing at ${listing.address}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {listings.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm">
              <Building className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-gray-900 font-bold text-xl mb-3">No listings found</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Try adjusting your filters or search criteria to find the listings you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};