
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

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatCategory = (category: string) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatTenantType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Units Overview
          <Badge variant="secondary">{units.length} Units</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Unit</TableHead>
                <TableHead className="font-semibold">Property</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Tenant</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-right">Expenses</TableHead>
                <TableHead className="font-semibold text-right">Net Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-medium text-gray-900">{unit.unitNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-gray-700">{unit.listingName}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-medium border-gray-300">
                      {formatCategory(unit.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {unit.tenantName ? (
                      <div>
                        <div className="font-medium text-sm text-gray-900">{unit.tenantName}</div>
                        {unit.tenantType && (
                          <div className="text-xs text-gray-500">{formatTenantType(unit.tenantType)}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm italic">No Tenant</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={unit.occupancyStatus === 'occupied' ? 'default' : 'secondary'}
                      className={`${
                        unit.occupancyStatus === 'occupied' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      } font-medium`}
                    >
                      {formatStatus(unit.occupancyStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-green-600">
                      +${unit.revenue.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-red-600">
                      -${unit.expenses.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      unit.profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {unit.profit >= 0 ? '+' : ''}${unit.profit.toLocaleString()}
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
