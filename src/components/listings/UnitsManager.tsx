import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Users, UserX, Building, ChevronLeft, ChevronRight, Edit3, User, Building2 } from "lucide-react";
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
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

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
    setCurrentUnitIndex(units.length);
  };

  const removeUnit = (unitId: string) => {
    const updatedUnits = units.filter(unit => unit.id !== unitId);
    onUnitsChange(updatedUnits);
    
    if (currentUnitIndex >= updatedUnits.length && updatedUnits.length > 0) {
      setCurrentUnitIndex(updatedUnits.length - 1);
    } else if (updatedUnits.length === 0) {
      setCurrentUnitIndex(0);
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

  const goToPreviousUnit = () => {
    setCurrentUnitIndex(prev => Math.max(0, prev - 1));
  };

  const goToNextUnit = () => {
    setCurrentUnitIndex(prev => Math.min(units.length - 1, prev + 1));
  };

  const currentUnit = units[currentUnitIndex];

  return (
    <div className="space-y-6">
      {units.length > 0 ? (
        <div className="space-y-6">
          {/* Enhanced Header with Better Navigation */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-lg">
                  <Building className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Property Units</h3>
                  <p className="text-sm text-gray-400">Manage units and tenant information</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={addUnit}
                  size="sm"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
                {units.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUnit(currentUnit.id)}
                    className="h-9 w-9 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Unit Navigation - Only show if multiple units */}
            {units.length > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">Current Unit:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToPreviousUnit}
                      disabled={currentUnitIndex === 0}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-md border border-gray-100 min-w-[80px] text-center">
                      {currentUnitIndex + 1} of {units.length}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNextUnit}
                      disabled={currentUnitIndex === units.length - 1}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md disabled:opacity-30"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Editing: <span className="font-medium text-gray-600">{currentUnit?.unitNumber}</span>
                </div>
              </div>
            )}
          </div>

          {/* Current Unit Configuration */}
          {currentUnit && (
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
              {/* Unit Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <h4 className="text-base font-semibold text-gray-600">Unit Details</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`unitNumber-${currentUnit.id}`} className="text-sm font-medium text-gray-500">Unit Name</Label>
                    {editingUnitId === currentUnit.id ? (
                      <Input
                        defaultValue={currentUnit.unitNumber}
                        className="h-10 border-gray-100 focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
                        placeholder="Enter unit name"
                        autoFocus
                        onBlur={(e) => handleUnitNameSubmit(currentUnit.id, e.target.value)}
                        onKeyDown={(e) => handleUnitNameKeyDown(e, currentUnit.id, e.currentTarget.value)}
                      />
                    ) : (
                      <div 
                        onClick={() => setEditingUnitId(currentUnit.id)}
                        className="px-3 py-2.5 text-sm bg-gray-25 border border-gray-100 rounded-lg cursor-pointer transition-all hover:border-gray-200 hover:bg-gray-50 flex items-center justify-between group h-10"
                      >
                        <span className="text-gray-700 font-medium">{currentUnit.unitNumber}</span>
                        <Edit3 className="h-3 w-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-500">Property Category</Label>
                    <Select
                      value={currentUnit.category}
                      onValueChange={(value) => updateUnit(currentUnit.id, { category: value })}
                    >
                      <SelectTrigger className="h-10 border-gray-100 focus:border-gray-300 focus:ring-1 focus:ring-gray-200">
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

              {/* Occupancy Status */}
              {shouldShowOccupancyStatus() && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <h4 className="text-base font-semibold text-gray-600">Occupancy Status</h4>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-25 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                    <div className="flex items-center gap-3">
                      {currentUnit.occupancyStatus === "occupied" ? (
                        <>
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                            <Users className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-600">Occupied</p>
                            <p className="text-sm text-gray-400">This unit has tenants</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-75 rounded-lg">
                            <UserX className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-600">Vacant</p>
                            <p className="text-sm text-gray-400">This unit is available</p>
                          </div>
                        </>
                      )}
                    </div>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleOccupancyStatus(currentUnit.id)}
                      className="text-sm border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
                    >
                      Switch to {currentUnit.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Tenant Information */}
              {shouldShowTenantInfo() && currentUnit.occupancyStatus === "occupied" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <h4 className="text-base font-semibold text-gray-600">Tenant Information</h4>
                  </div>
                  
                  <div className="bg-gray-25 border border-gray-100 rounded-xl p-5 space-y-5">
                    {/* Name Field with Tenant Type Toggle */}
                    <div className="grid grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-500">Type</Label>
                        <div className="flex bg-white border border-gray-200 rounded-md p-0.5 shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateUnitTenant(currentUnit.id, { type: "individual" })}
                            className={`px-2 py-1.5 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
                              currentUnit.tenant?.type === "individual"
                                ? "bg-blue-500 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <User className="h-3 w-3" />
                            Individual
                          </button>
                          <button
                            type="button"
                            onClick={() => updateUnitTenant(currentUnit.id, { type: "company" })}
                            className={`px-2 py-1.5 text-xs font-medium rounded transition-all flex items-center gap-1.5 ${
                              currentUnit.tenant?.type === "company"
                                ? "bg-blue-500 text-white shadow-sm"
                                : "text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <Building2 className="h-3 w-3" />
                            Company
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 space-y-2">
                        <Label htmlFor={`tenantName-${currentUnit.id}`} className="text-sm font-medium text-gray-500">
                          {currentUnit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                        </Label>
                        <Input
                          id={`tenantName-${currentUnit.id}`}
                          value={currentUnit.tenant?.name || ""}
                          onChange={(e) => updateUnitTenant(currentUnit.id, { name: e.target.value })}
                          placeholder={currentUnit.tenant?.type === "individual" ? "Enter tenant's full name" : "Enter company name"}
                          className="bg-white border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-200 h-10"
                        />
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`tenantPhone-${currentUnit.id}`} className="text-sm font-medium text-gray-500">Phone Number</Label>
                        <Input
                          id={`tenantPhone-${currentUnit.id}`}
                          value={currentUnit.tenant?.phone || ""}
                          onChange={(e) => updateUnitTenant(currentUnit.id, { phone: e.target.value })}
                          placeholder="Enter phone number"
                          className="bg-white border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-200 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`tenantEmail-${currentUnit.id}`} className="text-sm font-medium text-gray-500">Email Address</Label>
                        <Input
                          id={`tenantEmail-${currentUnit.id}`}
                          value={currentUnit.tenant?.email || ""}
                          onChange={(e) => updateUnitTenant(currentUnit.id, { email: e.target.value })}
                          placeholder="Enter email address"
                          className="bg-white border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-200 h-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white border border-gray-100 rounded-xl">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mx-auto mb-4">
            <Building className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No units configured</h3>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Start by adding units to manage this property effectively
          </p>
          <Button
            onClick={addUnit}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow-sm border border-gray-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
