
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Listings Overview
          <Badge variant="secondary">{listings.length} Properties</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Property</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Occupancy</TableHead>
                <TableHead className="font-semibold text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-right">Expenses</TableHead>
                <TableHead className="font-semibold text-right">Net Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{listing.name}</div>
                      {listing.tenantName && (
                        <div className="text-sm text-gray-500">Tenant: {listing.tenantName}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPropertyTypeIcon(listing.type)}
                      <span className="text-sm font-medium">{formatPropertyType(listing.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={listing.occupancyStatus === 'occupied' ? 'default' : 'secondary'}
                      className={`${
                        listing.occupancyStatus === 'occupied' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      } font-medium`}
                    >
                      {formatStatus(listing.occupancyStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {listing.occupiedUnits}/{listing.unitsCount}
                      </span>
                      <span className="text-sm text-gray-500">Units</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-green-600">
                      +${listing.revenue.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-red-600">
                      -${listing.expenses.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      listing.profit >= 0 ? 'text-green-600' : 'text-red-600'
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
