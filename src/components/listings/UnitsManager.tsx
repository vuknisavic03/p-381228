
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Users, UserX, Building, Edit3, User, Building2 } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<string>(units.length > 0 ? units[0].id : "");

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
    setActiveTab(newUnit.id);
  };

  const removeUnit = (unitId: string) => {
    const updatedUnits = units.filter(unit => unit.id !== unitId);
    onUnitsChange(updatedUnits);
    
    // Set active tab to first remaining unit or empty string if no units left
    if (updatedUnits.length > 0) {
      setActiveTab(updatedUnits[0].id);
    } else {
      setActiveTab("");
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
      {units.length > 0 ? (
        <div className="space-y-6">
          {/* Header */}
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
              <Button
                onClick={addUnit}
                size="sm"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </div>
          </div>

          {/* Units Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <TabsList className="w-full justify-start mb-6">
                {units.map((unit, index) => (
                  <TabsTrigger key={unit.id} value={unit.id} className="relative">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        unit.occupancyStatus === "occupied" ? "bg-green-400" : "bg-gray-300"
                      }`} />
                      {unit.unitNumber}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {units.map((unit) => (
                <TabsContent key={unit.id} value={unit.id} className="mt-0 space-y-6">
                  {/* Unit Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <h4 className="text-base font-semibold text-gray-600">Unit Details</h4>
                    </div>
                    {units.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUnit(unit.id)}
                        className="h-9 w-9 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Unit Basic Information */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={`unitNumber-${unit.id}`} className="text-sm font-medium text-gray-500">Unit Name</Label>
                      {editingUnitId === unit.id ? (
                        <Input
                          defaultValue={unit.unitNumber}
                          className="h-10 border-gray-100 focus:border-gray-300 focus:ring-1 focus:ring-gray-200"
                          placeholder="Enter unit name"
                          autoFocus
                          onBlur={(e) => handleUnitNameSubmit(unit.id, e.target.value)}
                          onKeyDown={(e) => handleUnitNameKeyDown(e, unit.id, e.currentTarget.value)}
                        />
                      ) : (
                        <div 
                          onClick={() => setEditingUnitId(unit.id)}
                          className="px-3 py-2.5 text-sm bg-gray-25 border border-gray-100 rounded-lg cursor-pointer transition-all hover:border-gray-200 hover:bg-gray-50 flex items-center justify-between group h-10"
                        >
                          <span className="text-gray-700 font-medium">{unit.unitNumber}</span>
                          <Edit3 className="h-3 w-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-500">Property Category</Label>
                      <Select
                        value={unit.category}
                        onValueChange={(value) => updateUnit(unit.id, { category: value })}
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

                  {/* Occupancy Status */}
                  {shouldShowOccupancyStatus() && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <h4 className="text-base font-semibold text-gray-600">Occupancy Status</h4>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-25 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                        <div className="flex items-center gap-3">
                          {unit.occupancyStatus === "occupied" ? (
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
                          onClick={() => toggleOccupancyStatus(unit.id)}
                          className="text-sm border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
                        >
                          Switch to {unit.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Tenant Information */}
                  {shouldShowTenantInfo() && unit.occupancyStatus === "occupied" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <h4 className="text-base font-semibold text-gray-600">Tenant Information</h4>
                      </div>
                      
                      <div className="bg-gray-25 border border-gray-100 rounded-xl p-5 space-y-4">
                        {/* Name Field with Tenant Type Toggle */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`tenantName-${unit.id}`} className="text-sm font-medium text-gray-500">
                              {unit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                            </Label>
                            
                            {/* Tenant Type Toggle */}
                            <div className="flex bg-gray-50 border border-gray-100 rounded-md p-0.5">
                              <button
                                type="button"
                                onClick={() => updateUnitTenant(unit.id, { type: "individual" })}
                                className={`px-2 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1.5 ${
                                  unit.tenant?.type === "individual"
                                    ? "bg-white text-gray-700 shadow-sm border border-gray-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <User className="h-3 w-3" />
                                Individual
                              </button>
                              <button
                                type="button"
                                onClick={() => updateUnitTenant(unit.id, { type: "company" })}
                                className={`px-2 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1.5 ${
                                  unit.tenant?.type === "company"
                                    ? "bg-white text-gray-700 shadow-sm border border-gray-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <Building2 className="h-3 w-3" />
                                Company
                              </button>
                            </div>
                          </div>
                          <Input
                            id={`tenantName-${unit.id}`}
                            value={unit.tenant?.name || ""}
                            onChange={(e) => updateUnitTenant(unit.id, { name: e.target.value })}
                            placeholder={unit.tenant?.type === "individual" ? "Enter tenant's full name" : "Enter company name"}
                            className="bg-white border-gray-100 focus:border-gray-300 focus:ring-1 focus:ring-gray-200 h-10"
                          />
                        </div>
                        
                        {/* Contact Information */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`tenantPhone-${unit.id}`} className="text-sm font-medium text-gray-500">Phone Number</Label>
                            <Input
                              id={`tenantPhone-${unit.id}`}
                              value={unit.tenant?.phone || ""}
                              onChange={(e) => updateUnitTenant(unit.id, { phone: e.target.value })}
                              placeholder="Enter phone number"
                              className="bg-white border-gray-100 focus:border-gray-300 focus:ring-1 focus:ring-gray-200 h-10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`tenantEmail-${unit.id}`} className="text-sm font-medium text-gray-500">Email Address</Label>
                            <Input
                              id={`tenantEmail-${unit.id}`}
                              value={unit.tenant?.email || ""}
                              onChange={(e) => updateUnitTenant(unit.id, { email: e.target.value })}
                              placeholder="Enter email address"
                              className="bg-white border-gray-100 focus:border-gray-300 focus:ring-1 focus:ring-gray-200 h-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
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
