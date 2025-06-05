
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

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-white">
        <CardTitle className="flex items-center gap-2 text-gray-900 font-semibold">
          Listings Overview
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium">
            {listings.length} Properties
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className="font-semibold text-gray-800">Property</TableHead>
                <TableHead className="font-semibold text-gray-800">Type</TableHead>
                <TableHead className="font-semibold text-gray-800">Status</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Expenses</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Net Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id} className="hover:bg-gray-50/70 border-b border-gray-100 last:border-b-0">
                  <TableCell className="py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{listing.name}</div>
                      {listing.tenantName && (
                        <div className="text-sm text-gray-600 mt-1">Tenant: {listing.tenantName}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{getPropertyTypeIcon(listing.type)}</span>
                      <span className="text-sm font-medium text-gray-700">{formatPropertyType(listing.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      variant={listing.occupancyStatus === 'occupied' ? 'default' : 'secondary'}
                      className={`font-medium ${
                        listing.occupancyStatus === 'occupied' 
                          ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100' 
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {formatStatus(listing.occupancyStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="font-semibold text-emerald-600">
                      +${listing.revenue.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="font-semibold text-rose-600">
                      -${listing.expenses.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className={`font-semibold ${
                      listing.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {listing.profit >= 0 ? '+' : ''}${listing.profit.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
