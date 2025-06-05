
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UnitOverview } from "@/services/overviewService";
import { formatPropertyType, getPropertyTypeIcon } from "@/utils/propertyTypeUtils";

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

  const formatCategory = (category: string) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatTenantType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className="shadow-sm border-gray-200 overflow-hidden">
      <CardHeader className="border-b border-gray-100 bg-white">
        <CardTitle className="flex items-center gap-2 text-gray-900 font-semibold">
          Units Overview
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium">
            {units.length} Units
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-gray-50/80 hover:bg-gray-50/80">
                <TableHead className="font-semibold text-gray-800">Unit</TableHead>
                <TableHead className="font-semibold text-gray-800">Property</TableHead>
                <TableHead className="font-semibold text-gray-800">Type</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Expenses</TableHead>
                <TableHead className="font-semibold text-gray-800 text-right">Net Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id} className="hover:bg-gray-50/70 border-b border-gray-100 last:border-b-0">
                  <TableCell className="py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{unit.unitNumber}</div>
                      <div className="text-sm text-gray-600 mt-1">{unit.listingName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className="text-xs font-medium border-gray-300 text-gray-700">
                      {formatCategory(unit.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    {unit.tenantName ? (
                      <div>
                        <div className="font-semibold text-gray-900">{unit.tenantName}</div>
                        {unit.tenantType && (
                          <div className="text-sm text-gray-600 mt-1">{formatTenantType(unit.tenantType)}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm italic">No Tenant</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="text-green-500">
                      +${unit.revenue.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="text-red-400">
                      -${unit.expenses.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className={
                      unit.profit >= 0 ? 'text-green-500' : 'text-red-400'
                    }>
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
