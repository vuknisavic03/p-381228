
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Listings Overview
          <Badge variant="secondary">{listings.length} properties</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Units</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{listing.name}</div>
                      {listing.tenantName && (
                        <div className="text-sm text-gray-500">{listing.tenantName}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {getPropertyTypeIcon(listing.type)}
                      <span className="text-sm">{formatPropertyType(listing.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={listing.occupancyStatus === 'occupied' ? 'default' : 'secondary'}
                      className={listing.occupancyStatus === 'occupied' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {listing.occupancyStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {listing.occupiedUnits}/{listing.unitsCount}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    ${listing.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium text-red-600">
                    ${listing.expenses.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <span className={listing.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${listing.profit.toLocaleString()}
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
