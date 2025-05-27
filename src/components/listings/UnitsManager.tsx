
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Users, UserX, Building } from "lucide-react";
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
  // Category maps based on property type
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
      category: "",
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

  const updateUnitTenant = (unitId: string, tenantData: Partial<Unit['tenant']>) => {
    const unit = units.find(u => u.id === unitId);
    if (unit) {
      updateUnit(unitId, {
        tenant: unit.tenant ? { ...unit.tenant, ...tenantData } : {
          name: tenantData.name || "",
          phone: tenantData.phone || "",
          email: tenantData.email || "",
          type: tenantData.type || "individual"
        }
      });
    }
  };

  const toggleUnitTenantType = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    if (unit?.tenant) {
      updateUnitTenant(unitId, {
        type: unit.tenant.type === "individual" ? "company" : "individual"
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-800">Units Management</h3>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addUnit}
          className="h-7 text-xs bg-white hover:bg-blue-50 border-blue-200 rounded-full px-3"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Unit
        </Button>
      </div>

      <div className="space-y-3">
        {units.map((unit) => (
          <Card key={unit.id} className="p-4 space-y-3">
            {/* Unit Name/Number - Now at the top */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <label className="block text-xs font-medium text-gray-500">Unit Name/Number</label>
                <Input
                  value={unit.unitNumber}
                  onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                  className="h-7 flex-1 text-xs"
                  placeholder="Enter unit name or number"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeUnit(unit.id)}
                className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0 ml-2"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>

            {/* Unit Details */}
            <div className="flex items-center gap-2">
              <Select
                value={unit.category}
                onValueChange={(value) => updateUnit(unit.id, { category: value })}
              >
                <SelectTrigger className="h-7 text-xs flex-1 min-w-0">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableCategories().map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="text-xs">{cat.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {shouldShowOccupancyStatus() && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toggleOccupancyStatus(unit.id)}
                  className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-2 flex-shrink-0"
                >
                  {unit.occupancyStatus === "occupied" ? (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-green-600" />
                      <span>Occupied</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <UserX className="h-3 w-3 text-orange-600" />
                      <span>Vacant</span>
                    </div>
                  )}
                </Button>
              )}
            </div>

            {/* Tenant Details - Show only if occupied and tenant info should be shown */}
            {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-green-600" />
                    <h4 className="text-xs font-medium text-gray-700">Tenant Details</h4>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleUnitTenantType(unit.id)} 
                    className="h-6 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-2"
                  >
                    {unit.tenant?.type === "individual" ? "Switch to Company" : "Switch to Individual"}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                    </label>
                    <Input
                      className="h-7 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-xs rounded-md"
                      value={unit.tenant?.name || ""}
                      onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                      placeholder="Enter tenant name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                      <Input
                        className="h-7 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-xs rounded-md"
                        value={unit.tenant?.phone || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                      <Input
                        className="h-7 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-xs rounded-md"
                        value={unit.tenant?.email || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
        
        {units.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Building className="h-6 w-6 mx-auto mb-2 text-gray-300" />
            <p className="text-xs">No units added yet. Click "Add Unit" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
