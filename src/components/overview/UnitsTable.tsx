
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UnitOverview } from "@/services/overviewService";

interface UnitsTableProps {
  units: UnitOverview[];
  isLoading?: boolean;
}

export function UnitsTable({ units, isLoading }: UnitsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Units Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(8)].map((_, i) => (
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
          Units Overview
          <Badge variant="secondary">{units.length} units</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell>
                    <div className="font-medium">{unit.unitNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">{unit.listingName}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {unit.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {unit.tenantName ? (
                      <div>
                        <div className="font-medium text-sm">{unit.tenantName}</div>
                        {unit.tenantType && (
                          <div className="text-xs text-gray-500">{unit.tenantType}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No tenant</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={unit.occupancyStatus === 'occupied' ? 'default' : 'secondary'}
                      className={unit.occupancyStatus === 'occupied' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {unit.occupancyStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    ${unit.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium text-red-600">
                    ${unit.expenses.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <span className={unit.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ${unit.profit.toLocaleString()}
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
