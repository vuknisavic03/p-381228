
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users, UserX, Building, User, Edit3 } from "lucide-react";
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
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);

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

  const handleUnitNameSubmit = (unitId: string, newName: string) => {
    updateUnit(unitId, { unitNumber: newName.trim() || `Unit ${units.findIndex(u => u.id === unitId) + 1}` });
    setEditingUnitId(null);
  };

  const handleUnitNameKeyDown = (e: React.KeyboardEvent, unitId: string, value: string) => {
    if (e.key === 'Enter') {
      handleUnitNameSubmit(unitId, value);
    } else if (e.key === 'Escape') {
      setEditingUnitId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Units List */}
      {units.length > 0 ? (
        <div className="space-y-6">
          {units.map((unit) => (
            <Card key={unit.id} className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
              {/* Unit Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    {editingUnitId === unit.id ? (
                      <Input
                        defaultValue={unit.unitNumber}
                        className="h-9 text-sm font-medium border-blue-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                        placeholder="Unit name"
                        autoFocus
                        onBlur={(e) => handleUnitNameSubmit(unit.id, e.target.value)}
                        onKeyDown={(e) => handleUnitNameKeyDown(e, unit.id, e.currentTarget.value)}
                      />
                    ) : (
                      <div 
                        onClick={() => setEditingUnitId(unit.id)}
                        className="h-9 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 flex items-center group"
                      >
                        <span className="flex-1">{unit.unitNumber}</span>
                        <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Status and Actions */}
                <div className="flex items-center gap-3 ml-4">
                  {shouldShowOccupancyStatus() && (
                    <Badge
                      variant="outline"
                      className={`cursor-pointer text-sm px-3 py-1.5 h-9 rounded-lg transition-colors ${
                        unit.occupancyStatus === "occupied" 
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                          : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                      }`}
                      onClick={() => toggleOccupancyStatus(unit.id)}
                    >
                      {unit.occupancyStatus === "occupied" ? (
                        <><Users className="h-4 w-4 mr-2" />Occupied</>
                      ) : (
                        <><UserX className="h-4 w-4 mr-2" />Vacant</>
                      )}
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeUnit(unit.id)}
                    className="h-9 w-9 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Unit Details */}
              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <Select
                    value={unit.category}
                    onValueChange={(value) => updateUnit(unit.id, { category: value })}
                  >
                    <SelectTrigger className="h-10 text-sm rounded-lg border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCategories().map((cat) => (
                        <SelectItem key={cat.value} value={cat.value} className="text-sm">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tenant Information */}
                {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Tenant Information</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="cursor-pointer text-sm bg-green-100 text-green-700 border-green-300 hover:bg-green-200 rounded-full px-3 py-1"
                        onClick={() => toggleUnitTenantType(unit.id)}
                      >
                        {unit.tenant?.type === "individual" ? "Individual" : "Company"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-green-700 mb-1">
                          {unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                        </label>
                        <Input
                          value={unit.tenant?.name || ""}
                          onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                          placeholder={unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                          className="h-9 text-sm bg-white border-green-200 rounded-lg focus:border-green-300 focus:ring-2 focus:ring-green-100"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-green-700 mb-1">Phone</label>
                          <Input
                            value={unit.tenant?.phone || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                            placeholder="Phone"
                            className="h-9 text-sm bg-white border-green-200 rounded-lg focus:border-green-300 focus:ring-2 focus:ring-green-100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-green-700 mb-1">Email</label>
                          <Input
                            value={unit.tenant?.email || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                            placeholder="Email"
                            className="h-9 text-sm bg-white border-green-200 rounded-lg focus:border-green-300 focus:ring-2 focus:ring-green-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
          
          {/* Add Unit Button */}
          <Button
            onClick={addUnit}
            size="sm"
            variant="outline"
            className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Unit
          </Button>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No units added</h3>
          <p className="text-sm text-gray-600 mb-6">Add units to manage this property</p>
          <Button
            onClick={addUnit}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
