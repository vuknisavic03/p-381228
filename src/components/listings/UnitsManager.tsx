
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
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

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
    setExpandedUnit(newUnit.id);
  };

  const removeUnit = (unitId: string) => {
    onUnitsChange(units.filter(unit => unit.id !== unitId));
    if (expandedUnit === unitId) {
      setExpandedUnit(null);
    }
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

  const toggleTenantType = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    if (unit?.tenant) {
      updateUnit(unitId, {
        tenant: {
          ...unit.tenant,
          type: unit.tenant.type === "individual" ? "company" : "individual"
        }
      });
    }
  };

  return (
    <div className="space-y-4">
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
          className="h-8 text-xs bg-white hover:bg-blue-50 border-blue-200 rounded-full px-3"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Unit
        </Button>
      </div>

      <div className="space-y-3">
        {units.map((unit) => (
          <Card key={unit.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Input
                  value={unit.unitNumber}
                  onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                  className="h-8 w-32 text-sm"
                  placeholder="Unit number"
                />
                <Select
                  value={unit.category}
                  onValueChange={(value) => updateUnit(unit.id, { category: value })}
                >
                  <SelectTrigger className="h-8 w-48 text-sm">
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
                {shouldShowOccupancyStatus() && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleOccupancyStatus(unit.id)}
                    className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-3"
                  >
                    {unit.occupancyStatus === "occupied" ? (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-green-600" />
                        <span>Occupied</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <UserX className="h-3 w-3 text-orange-600" />
                        <span>Vacant</span>
                      </div>
                    )}
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                  className="h-8 text-xs"
                >
                  {expandedUnit === unit.id ? "Collapse" : "Expand"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUnit(unit.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {expandedUnit === unit.id && (
              <div className="space-y-4 pt-3 border-t border-gray-100">
                {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">Tenant Information</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTenantType(unit.id)}
                        className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-3"
                      >
                        {unit.tenant?.type === "individual" ? "Switch to Company" : "Switch to Individual"}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <Input
                        value={unit.tenant?.name || ""}
                        onChange={(e) => updateUnit(unit.id, {
                          tenant: { ...unit.tenant, name: e.target.value, type: unit.tenant?.type || "individual", phone: unit.tenant?.phone || "", email: unit.tenant?.email || "" }
                        })}
                        placeholder={unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                        className="h-8 text-sm"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          value={unit.tenant?.phone || ""}
                          onChange={(e) => updateUnit(unit.id, {
                            tenant: { ...unit.tenant, phone: e.target.value, name: unit.tenant?.name || "", type: unit.tenant?.type || "individual", email: unit.tenant?.email || "" }
                          })}
                          placeholder="Phone"
                          className="h-8 text-sm"
                        />
                        <Input
                          value={unit.tenant?.email || ""}
                          onChange={(e) => updateUnit(unit.id, {
                            tenant: { ...unit.tenant, email: e.target.value, name: unit.tenant?.name || "", type: unit.tenant?.type || "individual", phone: unit.tenant?.phone || "" }
                          })}
                          placeholder="Email"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <span className="text-xs font-medium text-gray-500 block mb-2">Unit Notes</span>
                  <Input
                    value={unit.notes || ""}
                    onChange={(e) => updateUnit(unit.id, { notes: e.target.value })}
                    placeholder="Additional notes for this unit..."
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            )}
          </Card>
        ))}
        
        {units.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Building className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No units added yet. Click "Add Unit" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
