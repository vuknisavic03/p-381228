
import React from "react";
import { House, Mail, Phone, ShoppingCart, User } from "lucide-react";
import { Listing } from "./TransactionFormTypes";

interface ListingInfoCardProps {
  listing: Listing;
}

export function ListingInfoCard({ listing }: ListingInfoCardProps) {
  const payer = listing.tenant;
  
  return (
    <div className="space-y-4 rounded-lg bg-white p-4 border border-gray-100 shadow-sm">
      {/* Tenant Information */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full bg-gray-50 h-10 w-10 flex-shrink-0">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{payer.name}</div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <Mail className="h-3.5 w-3.5" /> {payer.email} 
            <span className="mx-1">•</span>
            <Phone className="h-3.5 w-3.5" /> {payer.phone}
          </div>
        </div>
        <span className="ml-auto text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-600 font-medium">
          {payer.type}
        </span>
      </div>
      
      {/* Property Information */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md mt-2">
        <div className="flex items-center justify-center rounded-full bg-white h-8 w-8 flex-shrink-0">
          <House className="h-4 w-4 text-gray-400" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{listing.name}</div>
          <div className="text-sm text-gray-500">{listing.city}, {listing.country}</div>
        </div>
        <span className="ml-auto text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-white text-gray-600 font-medium">
          <ShoppingCart className="h-3 w-3" /> {listing.type}
        </span>
      </div>
    </div>
  );
}
