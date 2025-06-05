
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      { value: "multi_family", label: "Multi-family" },
      { value: "apartment_condo", label: "Apartment/Condo" },
    ],
    commercial_rental: [
      { value: "office", label: "Office Space" },
      { value: "retail", label: "Retail Store" },
      { value: "medical", label: "Medical/Professional" },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse" },
      { value: "distribution", label: "Distribution Facility" },
      { value: "manufacturing", label: "Manufacturing" },
    ],
    hospitality: [
      { value: "hotel", label: "Hotel" },
      { value: "motel", label: "Motel" },
      { value: "bed_breakfast", label: "Bed & Breakfast" },
    ],
    vacation_rental: [
      { value: "short_term", label: "Short-term Rental" },
      { value: "serviced_apartment", label: "Serviced Apartment" },
      { value: "holiday_home", label: "Holiday Home" },
    ],
    mixed_use: [
      { value: "residential_commercial", label: "Residential-Commercial" },
      { value: "live_work", label: "Live-Work Space" },
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
          {units.map((unit, index) => (
            <div key={unit.id} className="space-y-6">
              {/* Unit Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded text-xs font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Unit Details</h3>
                    <p className="text-sm text-gray-600">Configure the specific details for this unit</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUnit(unit.id)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Unit Configuration */}
              <div className="space-y-4">
                {/* Unit Name */}
                <div>
                  <Label htmlFor={`unitNumber-${unit.id}`} className="text-sm font-medium text-gray-700 mb-2 block">Unit Name/Number</Label>
                  {editingUnitId === unit.id ? (
                    <Input
                      id={`unitNumber-${unit.id}`}
                      defaultValue={unit.unitNumber}
                      className="h-11"
                      placeholder="Unit name"
                      autoFocus
                      onBlur={(e) => handleUnitNameSubmit(unit.id, e.target.value)}
                      onKeyDown={(e) => handleUnitNameKeyDown(e, unit.id, e.currentTarget.value)}
                    />
                  ) : (
                    <div 
                      onClick={() => setEditingUnitId(unit.id)}
                      className="h-11 px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 flex items-center group"
                    >
                      <span className="flex-1">{unit.unitNumber}</span>
                      <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </div>

                {/* Category Selection */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Specific Category</Label>
                  <Select
                    value={unit.category}
                    onValueChange={(value) => updateUnit(unit.id, { category: value })}
                  >
                    <SelectTrigger className="h-11">
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

                {/* Occupancy Status */}
                {shouldShowOccupancyStatus() && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Occupancy Status</Label>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {unit.occupancyStatus === "occupied" ? (
                          <>
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                              <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Occupied</p>
                              <p className="text-xs text-gray-500">Unit has tenants</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                              <UserX className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Vacant</p>
                              <p className="text-xs text-gray-500">Unit is available</p>
                            </div>
                          </>
                        )}
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleOccupancyStatus(unit.id)}
                        className="text-xs"
                      >
                        Switch to {unit.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tenant Information */}
                {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-700">Tenant Information</Label>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleUnitTenantType(unit.id)}
                        className="text-xs"
                      >
                        {unit.tenant?.type === "individual" ? "Switch to Company" : "Switch to Individual"}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`tenantName-${unit.id}`} className="text-sm font-medium text-gray-700 mb-2 block">
                          {unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                        </Label>
                        <Input
                          id={`tenantName-${unit.id}`}
                          value={unit.tenant?.name || ""}
                          onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                          placeholder={unit.tenant?.type === "individual" ? "Enter tenant's full name" : "Enter company name"}
                          className="h-11"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`tenantPhone-${unit.id}`} className="text-sm font-medium text-gray-700 mb-2 block">Phone</Label>
                          <Input
                            id={`tenantPhone-${unit.id}`}
                            value={unit.tenant?.phone || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                            placeholder="Phone number"
                            className="h-11"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`tenantEmail-${unit.id}`} className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                          <Input
                            id={`tenantEmail-${unit.id}`}
                            value={unit.tenant?.email || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                            placeholder="Email address"
                            className="h-11"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Unit Notes */}
                <div>
                  <Label htmlFor={`notes-${unit.id}`} className="text-sm font-medium text-gray-700 mb-2 block">Unit Notes</Label>
                  <Textarea
                    id={`notes-${unit.id}`}
                    value={unit.notes || ""}
                    onChange={(e) => updateUnit(unit.id, { notes: e.target.value })}
                    placeholder="Add any notes specific to this unit..."
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>

              {/* Separator between units */}
              {index < units.length - 1 && (
                <div className="h-px bg-gray-100 my-8" />
              )}
            </div>
          ))}
          
          {/* Add Unit Button */}
          <div className="pt-4">
            <Button
              onClick={addUnit}
              variant="outline"
              className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Unit
            </Button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No units added</h3>
          <p className="text-sm text-gray-600 mb-6">Add units to manage this multi-unit property</p>
          <Button
            onClick={addUnit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
