
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Users, UserX, Building, Edit3, Save, X } from "lucide-react";
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
  const [editingUnit, setEditingUnit] = useState<string | null>(null);

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
    setEditingUnit(newUnit.id);
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
    if (unit) {
      const currentType = unit.tenant?.type || "individual";
      const newType: "individual" | "company" = currentType === "individual" ? "company" : "individual";
      
      const updatedTenant = {
        name: unit.tenant?.name || "",
        phone: unit.tenant?.phone || "",
        email: unit.tenant?.email || "",
        type: newType
      };
      
      updateUnit(unitId, { tenant: updatedTenant });
    }
  };

  const getCategoryLabel = (categoryValue: string) => {
    const category = getAvailableCategories().find(cat => cat.value === categoryValue);
    return category?.label || categoryValue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Building className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Units Management</h3>
            <p className="text-sm text-gray-500">{units.length} {units.length === 1 ? 'unit' : 'units'} configured</p>
          </div>
        </div>
        <Button
          type="button"
          onClick={addUnit}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      {/* Units Grid */}
      {units.length > 0 ? (
        <div className="grid gap-4">
          {units.map((unit) => (
            <Card key={unit.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              {/* Unit Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Input
                      value={unit.unitNumber}
                      onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                      className="text-lg font-semibold border-none p-0 h-auto bg-transparent focus:ring-0 focus:border-b focus:border-blue-500"
                      placeholder="Unit name or number"
                    />
                    <div className="flex items-center gap-2">
                      {shouldShowOccupancyStatus() && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => toggleOccupancyStatus(unit.id)}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            unit.occupancyStatus === "occupied" 
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                              : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                          }`}
                        >
                          {unit.occupancyStatus === "occupied" ? (
                            <>
                              <Users className="h-3 w-3 mr-1" />
                              Occupied
                            </>
                          ) : (
                            <>
                              <UserX className="h-3 w-3 mr-1" />
                              Vacant
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Category Selection */}
                  <div className="flex items-center gap-4">
                    <Select
                      value={unit.category}
                      onValueChange={(value) => updateUnit(unit.id, { category: value })}
                    >
                      <SelectTrigger className="w-64 h-9 rounded-lg border-gray-200">
                        <SelectValue placeholder="Select category" />
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
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUnit(unit.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Tenant Information - Show only if occupied */}
              {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <h4 className="text-sm font-medium text-gray-900">Tenant Details</h4>
                    </div>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleUnitTenantType(unit.id)} 
                      className="h-7 text-xs rounded-full px-3 bg-white"
                    >
                      {unit.tenant?.type === "individual" ? "Individual" : "Company"}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">
                        {unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                      </label>
                      <Input
                        className="h-9 border-gray-200 rounded-lg"
                        value={unit.tenant?.name || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                        placeholder="Enter name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Phone</label>
                      <Input
                        className="h-9 border-gray-200 rounded-lg"
                        value={unit.tenant?.phone || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                        placeholder="Phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Email</label>
                      <Input
                        className="h-9 border-gray-200 rounded-lg"
                        value={unit.tenant?.email || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <Building className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No units configured</h3>
          <p className="text-gray-500 mb-4">Add your first unit to get started with multi-unit management.</p>
          <Button
            type="button"
            onClick={addUnit}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
