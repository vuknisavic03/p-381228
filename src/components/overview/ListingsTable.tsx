
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ListingOverview } from "@/services/overviewService";
import { formatPropertyType, getPropertyTypeIcon } from "@/utils/propertyTypeUtils";

interface ListingsTableProps {
  listings: ListingOverview[];
  isLoading?: boolean;
}

export function ListingsTable({ listings, isLoading }: ListingsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Listings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-gray-200 overflow-hidden">
      <CardHeader className="border-b border-gray-100 bg-white">
        <CardTitle className="flex items-center gap-2 text-gray-900 font-semibold">
          Listings Overview
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium">
            {listings.length} Properties
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-b-xl">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className="font-semibold text-gray-800">Property</TableHead>
                <TableHead className="font-semibold text-gray-800">Type</TableHead>
                <TableHead className="font-semibold text-gray-800">Tenants</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Expenses</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Net Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => {
                const getTenantDisplay = () => {
                  // For hospitality and vacation rental, don't show tenant info at all
                  if (listing.type === 'hospitality' || listing.type === 'vacation_rental') {
                    return "—";
                  }
                  
                  if (listing.unitsCount > 1) {
                    return "Multiple Tenants";
                  }
                  return listing.tenantName || "No Tenant";
                };

                const tenantDisplay = getTenantDisplay();

                return (
                  <TableRow key={listing.id} className="hover:bg-gray-50/70 border-b border-gray-100 last:border-b-0">
                    <TableCell className="py-4">
                      <div className="font-semibold text-gray-900">{listing.name}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">{getPropertyTypeIcon(listing.type)}</span>
                        <span className="text-sm font-medium text-gray-700">{formatPropertyType(listing.type)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={
                        tenantDisplay === "—" 
                          ? "text-gray-400 text-sm"
                          : (listing.unitsCount > 1 || listing.tenantName) 
                            ? "text-gray-900 font-medium" 
                            : "text-gray-500 text-sm italic"
                      }>
                        {tenantDisplay}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className="text-green-500">
                        +${listing.revenue.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className="text-red-400">
                        -${listing.expenses.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className={
                        listing.profit >= 0 ? 'text-green-500' : 'text-red-400'
                      }>
                        {listing.profit >= 0 ? '+' : ''}${listing.profit.toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
