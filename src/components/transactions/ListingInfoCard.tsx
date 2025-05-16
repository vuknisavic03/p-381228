
import React from "react";
import { House, Mail, Phone, ShoppingCart, User } from "lucide-react";
import { Listing } from "./TransactionFormTypes";

interface ListingInfoCardProps {
  listing: Listing;
}

export function ListingInfoCard({ listing }: ListingInfoCardProps) {
  const payer = listing.tenant;
  
  return (
    <div className="rounded-xl border border-gray-100 bg-white mb-6 p-5 flex flex-col gap-3 shadow-xs">
      <div className="flex gap-3 items-center">
        <div className="flex items-center justify-center rounded-lg bg-gray-50 h-12 w-12">
          <User className="h-7 w-7 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">{payer.name}</span>
            <span className="ml-2 bg-gray-100 text-xs font-semibold text-gray-600 rounded px-2 py-0.5">{payer.type}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-700">{payer.email}</span>
            <Phone className="h-4 w-4 text-gray-400 ml-4" />
            <span className="text-sm text-gray-700">{payer.phone}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 mt-1">
        <House className="h-5 w-5 text-gray-400" />
        <div>
          <div className="font-semibold text-gray-900">{listing.name}</div>
          <div className="text-sm text-gray-500">{listing.city}, {listing.country}</div>
        </div>
        <span className="ml-auto bg-gray-100 text-xs font-medium text-gray-600 rounded px-2 py-0.5 flex items-center gap-1">
          <ShoppingCart className="h-3 w-3" />{listing.type}
        </span>
      </div>
    </div>
  );
}
