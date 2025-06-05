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
          {/* Clean Header with Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Units</h3>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousUnit}
                  disabled={currentUnitIndex === 0}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-md border">
                  {currentUnitIndex + 1} of {units.length}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextUnit}
                  disabled={currentUnitIndex === units.length - 1}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={addUnit}
                size="sm"
                className="text-sm px-4 py-2 rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add unit
              </Button>
              {units.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUnit(currentUnit.id)}
                  className="h-9 w-9 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Current Unit Configuration */}
          {currentUnit && (
            <div className="space-y-6">
              {/* Unit Name and Category - Horizontal Layout */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor={`unitNumber-${currentUnit.id}`} className="text-sm font-medium text-gray-900">Unit Name</Label>
                  {editingUnitId === currentUnit.id ? (
                    <Input
                      defaultValue={currentUnit.unitNumber}
                      className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Unit name"
                      autoFocus
                      onBlur={(e) => handleUnitNameSubmit(currentUnit.id, e.target.value)}
                      onKeyDown={(e) => handleUnitNameKeyDown(e, currentUnit.id, e.currentTarget.value)}
                    />
                  ) : (
                    <div 
                      onClick={() => setEditingUnitId(currentUnit.id)}
                      className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer transition-all hover:border-gray-300 hover:bg-gray-50 flex items-center justify-between group h-10"
                    >
                      <span className="text-gray-900">{currentUnit.unitNumber}</span>
                      <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-900">Category</Label>
                  <Select
                    value={currentUnit.category}
                    onValueChange={(value) => updateUnit(currentUnit.id, { category: value })}
                  >
                    <SelectTrigger className="h-10 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
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

              {/* Occupancy Status */}
              {shouldShowOccupancyStatus() && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Occupancy Status</Label>
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3">
                      {currentUnit.occupancyStatus === "occupied" ? (
                        <>
                          <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Occupied</p>
                            <p className="text-sm text-gray-500">Property has tenants</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-lg">
                            <UserX className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Vacant</p>
                            <p className="text-sm text-gray-500">Property is available</p>
                          </div>
                        </>
                      )}
                    </div>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleOccupancyStatus(currentUnit.id)}
                      className="text-sm border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    >
                      Switch to {currentUnit.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Tenant Information */}
              {shouldShowTenantInfo() && currentUnit.occupancyStatus === "occupied" && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  {/* Header with Tenant Type Toggle */}
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-base font-semibold text-gray-900">Tenant Information</h4>
                    <div className="flex bg-white border border-gray-200 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => updateUnitTenant(currentUnit.id, { type: "individual" })}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                          currentUnit.tenant?.type === "individual"
                            ? "bg-gray-900 text-white shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <User className="h-3.5 w-3.5" />
                        Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => updateUnitTenant(currentUnit.id, { type: "company" })}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                          currentUnit.tenant?.type === "company"
                            ? "bg-gray-900 text-white shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <Building2 className="h-3.5 w-3.5" />
                        Company
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor={`tenantName-${currentUnit.id}`} className="text-sm font-medium text-gray-700">
                        {currentUnit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                      </Label>
                      <Input
                        id={`tenantName-${currentUnit.id}`}
                        value={currentUnit.tenant?.name || ""}
                        onChange={(e) => updateUnitTenant(currentUnit.id, { name: e.target.value })}
                        placeholder={currentUnit.tenant?.type === "individual" ? "Enter tenant's full name" : "Enter company name"}
                        className="bg-white border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 h-10"
                      />
                    </div>
                    
                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`tenantPhone-${currentUnit.id}`} className="text-sm font-medium text-gray-700">Phone Number</Label>
                        <Input
                          id={`tenantPhone-${currentUnit.id}`}
                          value={currentUnit.tenant?.phone || ""}
                          onChange={(e) => updateUnitTenant(currentUnit.id, { phone: e.target.value })}
                          placeholder="Phone number"
                          className="bg-white border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`tenantEmail-${currentUnit.id}`} className="text-sm font-medium text-gray-700">Email Address</Label>
                        <Input
                          id={`tenantEmail-${currentUnit.id}`}
                          value={currentUnit.tenant?.email || ""}
                          onChange={(e) => updateUnitTenant(currentUnit.id, { email: e.target.value })}
                          placeholder="Email address"
                          className="bg-white border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 h-10"
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
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mx-auto mb-4">
            <Building className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No units</h3>
          <p className="text-sm text-gray-500 mb-6">Add units to manage this property</p>
          <Button
            onClick={addUnit}
            className="px-6 py-2 rounded-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add unit
          </Button>
        </div>
      )}
    </div>
  );
}
