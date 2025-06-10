import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Listing } from "./TransactionFormTypes";
import { formatPropertyType, getPropertyTypeIcon } from "@/utils/propertyTypeUtils";

interface ListingInfoCardProps {
  listing: Listing;
}

export function ListingInfoCard({ listing }: ListingInfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white mb-0 p-5 flex flex-col gap-3 shadow-xs">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{listing.name}</h3>
          <div className="flex items-center text-gray-600 gap-1 mt-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{listing.address}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-md">
          {getPropertyTypeIcon(listing.type)}
          <span className="text-xs font-medium text-gray-700">
            {formatPropertyType(listing.type)}
          </span>
        </div>
      </div>
      
      <div className="h-px bg-gray-100 -mx-5" />
      
      <div>
        <div className="text-xs font-medium text-gray-500 mb-2">Tenant</div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex-1">
            <div className="font-medium text-gray-900">{listing.tenant.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{listing.tenant.type}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Mail className="h-3.5 w-3.5 text-gray-400" /> 
              <span>{listing.tenant.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Phone className="h-3.5 w-3.5 text-gray-400" /> 
              <span>{listing.tenant.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
