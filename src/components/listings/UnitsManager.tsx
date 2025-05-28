
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users, UserX, Building, User, Mail, Phone } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center py-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Units</h3>
        <p className="text-sm text-gray-600">Manage individual units within this property</p>
      </div>

      {/* Units List */}
      {units.length > 0 ? (
        <div className="space-y-6">
          {units.map((unit, index) => (
            <Card key={unit.id} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
              {/* Unit Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Unit #{index + 1}</h4>
                    <p className="text-sm text-gray-500">Property unit details</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {shouldShowOccupancyStatus() && (
                    <Badge 
                      variant={unit.occupancyStatus === "occupied" ? "default" : "secondary"}
                      className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
                        unit.occupancyStatus === "occupied" 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-orange-100 text-orange-800 hover:bg-orange-200"
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
                    className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Unit Details Section */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h5 className="text-sm font-semibold text-gray-700 mb-4">Basic Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Unit Name</label>
                      <Input
                        value={unit.unitNumber}
                        onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                        placeholder="Enter unit name"
                        className="h-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Unit Category</label>
                      <Select
                        value={unit.category}
                        onValueChange={(value) => updateUnit(unit.id, { category: value })}
                      >
                        <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
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
                </div>

                {/* Tenant Information */}
                {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                  <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-600" />
                        <h5 className="text-sm font-semibold text-green-800">Tenant Information</h5>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs px-3 bg-white border-green-300 text-green-700 hover:bg-green-100"
                        onClick={() => toggleUnitTenantType(unit.id)}
                      >
                        {unit.tenant?.type === "individual" ? "Individual" : "Company"}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-green-700 mb-2">
                          {unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                        </label>
                        <Input
                          value={unit.tenant?.name || ""}
                          onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                          placeholder={unit.tenant?.type === "individual" ? "Enter full name" : "Enter company name"}
                          className="h-10 bg-white border-green-200 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-green-700 mb-2">
                            <Phone className="inline h-3 w-3 mr-1" />
                            Phone Number
                          </label>
                          <Input
                            value={unit.tenant?.phone || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                            placeholder="Enter phone number"
                            className="h-10 bg-white border-green-200 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-green-700 mb-2">
                            <Mail className="inline h-3 w-3 mr-1" />
                            Email Address
                          </label>
                          <Input
                            value={unit.tenant?.email || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                            placeholder="Enter email address"
                            className="h-10 bg-white border-green-200 focus:border-green-400 focus:ring-1 focus:ring-green-400"
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
          <div className="text-center py-6">
            <Button
              onClick={addUnit}
              variant="outline"
              className="h-12 px-8 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition-all"
            >
              <Plus className="h-5 w-5 mr-3" />
              Add Another Unit
            </Button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6">
            <Building className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No units added yet</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
            Add units to manage this property. Each unit can have its own category, occupancy status, and tenant information.
          </p>
          <Button
            onClick={addUnit}
            className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 rounded-xl"
          >
            <Plus className="h-5 w-5 mr-3" />
            Add Your First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
