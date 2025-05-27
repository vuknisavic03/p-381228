

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

  const cancelEditing = () => {
    setEditingUnit(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, unitId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveUnitName(unitId);
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };

  return (
    <div className="space-y-3">
      {/* Units List */}
      {units.length > 0 ? (
        <div className="space-y-3">
          {units.map((unit) => (
            <Card key={unit.id} className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all duration-200">
              {/* Unit Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex-shrink-0 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-200">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {editingUnit === unit.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={unit.unitNumber}
                          onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                          className="h-8 text-sm font-semibold border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-blue-50/50 rounded-lg px-3 w-40"
                          placeholder="Unit name"
                          autoFocus
                          onBlur={() => saveUnitName(unit.id)}
                          onKeyDown={(e) => handleKeyDown(e, unit.id)}
                        />
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => saveUnitName(unit.id)}
                            className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEditing}
                            className="h-7 w-7 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md"
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="group/name flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1 -mx-2 -my-1 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => startEditing(unit.id)}
                      >
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {unit.unitNumber || "Unnamed Unit"}
                        </span>
                        <Edit3 className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover/name:opacity-100 transition-opacity duration-150" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right side elements */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {shouldShowOccupancyStatus() && (
                    <Badge
                      variant="outline"
                      className={`cursor-pointer transition-all duration-200 ${
                        unit.occupancyStatus === "occupied" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                          : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                      }`}
                      onClick={() => toggleOccupancyStatus(unit.id)}
                    >
                      {unit.occupancyStatus === "occupied" ? (
                        <><Users className="h-3 w-3 mr-1.5" />Occupied</>
                      ) : (
                        <><UserX className="h-3 w-3 mr-1.5" />Vacant</>
                      )}
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeUnit(unit.id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Unit Details */}
              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <Select
                    value={unit.category}
                    onValueChange={(value) => updateUnit(unit.id, { category: value })}
                  >
                    <SelectTrigger className="h-9 w-full bg-gray-50/50 border-gray-200 hover:border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-sm rounded-lg transition-all duration-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {getAvailableCategories().map((cat) => (
                        <SelectItem key={cat.value} value={cat.value} className="text-sm rounded-lg">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tenant Information */}
                {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <User className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-emerald-800">Tenant Details</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="cursor-pointer bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200 transition-colors duration-200"
                        onClick={() => toggleUnitTenantType(unit.id)}
                      >
                        {unit.tenant?.type === "individual" ? "Individual" : "Company"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <Input
                        value={unit.tenant?.name || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                        placeholder={unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                        className="h-8 bg-white/80 border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 text-sm rounded-lg"
                      />
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          value={unit.tenant?.phone || ""}
                          onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                          placeholder="Phone"
                          className="h-8 bg-white/80 border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 text-sm rounded-lg"
                        />
                        <Input
                          value={unit.tenant?.email || ""}
                          onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                          placeholder="Email"
                          className="h-8 bg-white/80 border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 text-sm rounded-lg"
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
            className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition-all duration-200 group"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-dashed border-current group-hover:border-solid transition-all duration-200">
                <Plus className="h-3 w-3 m-0.5" />
              </div>
              Add Another Unit
            </div>
          </Button>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mx-auto mb-4">
            <Building className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No units added yet</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">Create and manage individual units within this property to track tenants and occupancy.</p>
          <Button
            onClick={addUnit}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-6 text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Unit
          </Button>
        </div>
      )}
    </div>
  );
}

