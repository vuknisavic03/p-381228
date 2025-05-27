
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users, UserX, Building, Edit3, Check, X, Mail, Phone, User } from "lucide-react";
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
      category: getAvailableCategories()[0]?.value || "",
      occupancyStatus: "vacant",
    };
    onUnitsChange([...units, newUnit]);
  };

  const removeUnit = (unitId: string) => {
    onUnitsChange(units.filter(unit => unit.id !== unitId));
    if (editingUnit === unitId) {
      setEditingUnit(null);
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

  const startEditing = (unitId: string) => {
    setEditingUnit(unitId);
  };

  const saveUnitName = (unitId: string) => {
    setEditingUnit(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, unitId: string) => {
    if (e.key === 'Enter') {
      saveUnitName(unitId);
    }
    if (e.key === 'Escape') {
      setEditingUnit(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Units List */}
      {units.length > 0 ? (
        <div className="space-y-3">
          {units.map((unit) => (
            <Card key={unit.id} className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all">
              {/* Unit Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg flex-shrink-0">
                    <Building className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {editingUnit === unit.id ? (
                      <Input
                        value={unit.unitNumber}
                        onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                        className="h-6 text-sm font-medium border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-2 py-1 w-32"
                        placeholder="Unit name"
                        autoFocus
                        onBlur={() => saveUnitName(unit.id)}
                        onKeyDown={(e) => handleKeyDown(e, unit.id)}
                      />
                    ) : (
                      <span 
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors truncate block"
                        onClick={() => startEditing(unit.id)}
                      >
                        {unit.unitNumber || "Unnamed Unit"}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Right side elements */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {shouldShowOccupancyStatus() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleOccupancyStatus(unit.id)}
                      className={`h-8 px-3 text-xs font-medium ${
                        unit.occupancyStatus === "occupied" 
                          ? "bg-green-50 text-green-700 hover:bg-green-100" 
                          : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                      }`}
                    >
                      {unit.occupancyStatus === "occupied" ? (
                        <><Users className="h-3 w-3 mr-1" />Occupied</>
                      ) : (
                        <><UserX className="h-3 w-3 mr-1" />Vacant</>
                      )}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeUnit(unit.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Unit Details */}
              <div className="space-y-3">
                {/* Category Selection */}
                <div>
                  <Select
                    value={unit.category}
                    onValueChange={(value) => updateUnit(unit.id, { category: value })}
                  >
                    <SelectTrigger className="h-8 w-full bg-gray-50 border-gray-200 text-xs">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCategories().map((cat) => (
                        <SelectItem key={cat.value} value={cat.value} className="text-xs">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tenant Information */}
                {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-green-800">Tenant</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs px-2"
                        onClick={() => toggleUnitTenantType(unit.id)}
                      >
                        {unit.tenant?.type === "individual" ? "Individual" : "Company"}
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        value={unit.tenant?.name || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                        placeholder={unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                        className="h-7 bg-white border-green-200 text-xs"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={unit.tenant?.phone || ""}
                          onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                          placeholder="Phone"
                          className="h-7 bg-white border-green-200 text-xs"
                        />
                        <Input
                          value={unit.tenant?.email || ""}
                          onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                          placeholder="Email"
                          className="h-7 bg-white border-green-200 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
          
          {/* Add Unit Button at Bottom */}
          <Button
            onClick={addUnit}
            size="sm"
            variant="outline"
            className="w-full h-10 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Unit
          </Button>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3">
            <Building className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No units added yet</h3>
          <p className="text-xs text-gray-600 mb-3">Add units to manage this property.</p>
          <Button
            onClick={addUnit}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
