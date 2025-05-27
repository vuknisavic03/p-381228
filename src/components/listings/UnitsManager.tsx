
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users, UserX } from "lucide-react";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";

interface Unit {
  id: string;
  unitNumber: string;
  category: string;
  occupancyStatus: "occupied" | "vacant";
  tenant?: {
    name: string;
    phone: string;
    email: string;
    type: "individual" | "company";
  };
  notes?: string;
}

interface UnitsManagerProps {
  propertyType: PropertyType;
  units: Unit[];
  onUnitsChange: (units: Unit[]) => void;
}

export function UnitsManager({ propertyType, units, onUnitsChange }: UnitsManagerProps) {
  const typeToCategoryMap = {
    residential_rental: [
      { value: "single_family", label: "Single-family Home" },
      { value: "multi_family", label: "Multi-family (Duplex, Triplex)" },
      { value: "apartment_condo", label: "Apartment / Condo" },
    ],
    commercial_rental: [
      { value: "office", label: "Office" },
      { value: "retail", label: "Retail" },
      { value: "medical", label: "Medical / Professional Unit" },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse" },
      { value: "distribution", label: "Distribution Facility" },
      { value: "manufacturing", label: "Manufacturing Facility" },
    ],
    hospitality: [
      { value: "hotel", label: "Hotel" },
      { value: "motel", label: "Motel" },
      { value: "bed_breakfast", label: "Bed & Breakfast" },
    ],
    vacation_rental: [
      { value: "short_term", label: "Short-term Rental (Airbnb-style)" },
      { value: "serviced_apartment", label: "Serviced Apartment" },
      { value: "holiday_home", label: "Holiday Home / Villa" },
    ],
    mixed_use: [
      { value: "residential_commercial", label: "Residential-Commercial" },
      { value: "live_work", label: "Live-Work" },
      { value: "multi_purpose", label: "Multi-Purpose" },
    ],
  };

  const getAvailableCategories = () => {
    return typeToCategoryMap[propertyType] || [];
  };

  const shouldShowOccupancyStatus = () => {
    return propertyType && !["hospitality", "vacation_rental"].includes(propertyType);
  };

  const shouldShowTenantInfo = () => {
    return propertyType && !["hospitality", "vacation_rental"].includes(propertyType);
  };

  const addUnit = () => {
    const newUnit: Unit = {
      id: Date.now().toString(),
      unitNumber: `Unit ${units.length + 1}`,
      category: getAvailableCategories()[0]?.value || "",
      occupancyStatus: "vacant",
    };
    onUnitsChange([...units, newUnit]);
  };

  const removeUnit = (unitId: string) => {
    onUnitsChange(units.filter(unit => unit.id !== unitId));
  };

  const updateUnit = (unitId: string, updates: Partial<Unit>) => {
    onUnitsChange(units.map(unit => 
      unit.id === unitId ? { ...unit, ...updates } : unit
    ));
  };

  const toggleOccupancyStatus = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    if (unit) {
      const newStatus = unit.occupancyStatus === "occupied" ? "vacant" : "occupied";
      updateUnit(unitId, {
        occupancyStatus: newStatus,
        tenant: newStatus === "vacant" ? undefined : unit.tenant
      });
    }
  };

  const updateTenant = (unitId: string, field: string, value: string) => {
    const unit = units.find(u => u.id === unitId);
    if (unit) {
      const updatedTenant = {
        name: unit.tenant?.name || "",
        phone: unit.tenant?.phone || "",
        email: unit.tenant?.email || "",
        type: unit.tenant?.type || "individual",
        [field]: value
      } as Unit['tenant'];
      updateUnit(unitId, { tenant: updatedTenant });
    }
  };

  const toggleTenantType = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    if (unit) {
      const newType = unit.tenant?.type === "individual" ? "company" : "individual";
      updateTenant(unitId, "type", newType);
    }
  };

  if (units.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
        <div className="text-gray-400 mb-4">
          <Plus className="h-8 w-8 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No units yet</h3>
        <p className="text-gray-500 mb-6">Add your first unit to get started</p>
        <Button onClick={addUnit} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {units.map((unit) => (
        <div key={unit.id} className="border border-gray-200 rounded-lg p-4 bg-white">
          {/* Unit Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              <Input
                value={unit.unitNumber}
                onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                className="h-8 w-32 text-sm font-medium"
                placeholder="Unit name"
              />
              
              <Select
                value={unit.category}
                onValueChange={(value) => updateUnit(unit.id, { category: value })}
              >
                <SelectTrigger className="h-8 w-48 text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableCategories().map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              {shouldShowOccupancyStatus() && (
                <Badge
                  variant="outline"
                  className={`cursor-pointer ${
                    unit.occupancyStatus === "occupied" 
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleOccupancyStatus(unit.id)}
                >
                  {unit.occupancyStatus === "occupied" ? (
                    <><Users className="h-3 w-3 mr-1" />Occupied</>
                  ) : (
                    <><UserX className="h-3 w-3 mr-1" />Vacant</>
                  )}
                </Badge>
              )}
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeUnit(unit.id)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tenant Info */}
          {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">Tenant</span>
                <Badge
                  variant="outline"
                  className="cursor-pointer text-xs bg-white border-green-300 hover:bg-green-100"
                  onClick={() => toggleTenantType(unit.id)}
                >
                  {unit.tenant?.type === "individual" ? "Individual" : "Company"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Input
                  value={unit.tenant?.name || ""}
                  onChange={(e) => updateTenant(unit.id, "name", e.target.value)}
                  placeholder={unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                  className="h-8 text-sm bg-white"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={unit.tenant?.phone || ""}
                    onChange={(e) => updateTenant(unit.id, "phone", e.target.value)}
                    placeholder="Phone"
                    className="h-8 text-sm bg-white"
                  />
                  <Input
                    value={unit.tenant?.email || ""}
                    onChange={(e) => updateTenant(unit.id, "email", e.target.value)}
                    placeholder="Email"
                    className="h-8 text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <Button
        onClick={addUnit}
        variant="outline"
        className="w-full h-10 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Unit
      </Button>
    </div>
  );
}
