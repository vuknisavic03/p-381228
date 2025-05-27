
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users, UserX, Building, Edit3, Check, X, Mail, Phone, User, Home } from "lucide-react";
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

  const occupiedUnits = units.filter(unit => unit.occupancyStatus === "occupied").length;
  const vacantUnits = units.filter(unit => unit.occupancyStatus === "vacant").length;

  return (
    <div className="space-y-6">
      {/* Elegant Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">Units</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{units.length} total</span>
            {shouldShowOccupancyStatus() && (
              <>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  {occupiedUnits} occupied
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  {vacantUnits} vacant
                </span>
              </>
            )}
          </div>
        </div>
        
        <Button
          type="button"
          onClick={addUnit}
          size="sm"
          className="bg-gray-900 hover:bg-gray-800 text-white h-9 px-4 rounded-lg font-medium shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      {/* Units List */}
      {units.length > 0 ? (
        <div className="space-y-3">
          {units.map((unit, index) => (
            <Card key={unit.id} className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl">
              {/* Status Indicator Bar */}
              {shouldShowOccupancyStatus() && (
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                  unit.occupancyStatus === "occupied" ? "bg-emerald-400" : "bg-amber-400"
                }`} />
              )}
              
              <div className="p-6">
                {/* Unit Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-lg">
                      <Home className="h-5 w-5 text-gray-600" />
                    </div>
                    
                    <div className="space-y-1">
                      {editingUnit === unit.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={unit.unitNumber}
                            onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                            className="h-7 w-32 text-sm font-medium border-gray-200 focus:border-gray-400"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingUnit(null)}
                            className="h-7 w-7 p-0 hover:bg-gray-100"
                          >
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">{unit.unitNumber}</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingUnit(unit.id)}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                          >
                            <Edit3 className="h-3 w-3 text-gray-500" />
                          </Button>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">Unit #{index + 1}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {shouldShowOccupancyStatus() && (
                      <Badge
                        variant="outline"
                        className={`cursor-pointer transition-all duration-200 border-0 text-xs font-medium px-3 py-1 ${
                          unit.occupancyStatus === "occupied" 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
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
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="mb-5">
                  <Select
                    value={unit.category}
                    onValueChange={(value) => updateUnit(unit.id, { category: value })}
                  >
                    <SelectTrigger className="w-full h-9 border-gray-200 focus:border-gray-400 bg-gray-50 text-sm">
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

                {/* Tenant Information */}
                {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                  <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Tenant Details</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUnitTenantType(unit.id)}
                        className="h-6 px-2 text-xs text-gray-600 hover:bg-white"
                      >
                        {unit.tenant?.type === "individual" ? "Individual" : "Company"}
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <Input
                        value={unit.tenant?.name || ""}
                        onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                        placeholder={unit.tenant?.type === "individual" ? "Full name" : "Company name"}
                        className="h-9 bg-white border-gray-200 focus:border-gray-400 text-sm"
                      />
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                          <Input
                            value={unit.tenant?.phone || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                            placeholder="Phone"
                            className="h-9 pl-9 bg-white border-gray-200 focus:border-gray-400 text-sm"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                          <Input
                            value={unit.tenant?.email || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                            placeholder="Email"
                            className="h-9 pl-9 bg-white border-gray-200 focus:border-gray-400 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Elegant Empty State */
        <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto mb-4 border border-gray-100">
            <Building className="h-7 w-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No units added yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
            Create your first unit to start managing this property's rental spaces and tenants.
          </p>
          <Button
            onClick={addUnit}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
