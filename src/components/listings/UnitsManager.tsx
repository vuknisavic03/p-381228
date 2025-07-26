import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trash2, Plus, Users, UserX, Building, Edit3, User, Building2, ChevronLeft, ChevronRight } from "lucide-react";
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
export function UnitsManager({
  propertyType,
  units,
  onUnitsChange
}: UnitsManagerProps) {
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(units.length > 0 ? units[0].id : "");

  // Category maps based on property type
  const typeToCategoryMap = {
    residential_rental: [{
      value: "single_family",
      label: "Single-family Home"
    }, {
      value: "multi_family",
      label: "Multi-family"
    }, {
      value: "apartment_condo",
      label: "Apartment/Condo"
    }],
    commercial_rental: [{
      value: "office",
      label: "Office Space"
    }, {
      value: "retail",
      label: "Retail Store"
    }, {
      value: "medical",
      label: "Medical/Professional"
    }],
    industrial: [{
      value: "warehouse",
      label: "Warehouse"
    }, {
      value: "distribution",
      label: "Distribution Facility"
    }, {
      value: "manufacturing",
      label: "Manufacturing"
    }],
    hospitality: [{
      value: "hotel",
      label: "Hotel"
    }, {
      value: "motel",
      label: "Motel"
    }, {
      value: "bed_breakfast",
      label: "Bed & Breakfast"
    }],
    vacation_rental: [{
      value: "short_term",
      label: "Short-term Rental"
    }, {
      value: "serviced_apartment",
      label: "Serviced Apartment"
    }, {
      value: "holiday_home",
      label: "Holiday Home"
    }],
    mixed_use: [{
      value: "residential_commercial",
      label: "Residential-Commercial"
    }, {
      value: "live_work",
      label: "Live-Work Space"
    }, {
      value: "multi_purpose",
      label: "Multi-Purpose"
    }]
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
      occupancyStatus: "vacant"
    };
    onUnitsChange([...units, newUnit]);
    setSelectedUnitId(newUnit.id);
  };
  const removeUnit = (unitId: string) => {
    const updatedUnits = units.filter(unit => unit.id !== unitId);
    onUnitsChange(updatedUnits);

    // Set selected unit to first remaining unit or empty string if no units left
    if (updatedUnits.length > 0) {
      setSelectedUnitId(updatedUnits[0].id);
    } else {
      setSelectedUnitId("");
    }
  };
  const updateUnit = (unitId: string, updates: Partial<Unit>) => {
    onUnitsChange(units.map(unit => unit.id === unitId ? {
      ...unit,
      ...updates
    } : unit));
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
        tenant: unit.tenant ? {
          ...unit.tenant,
          ...tenantData
        } : {
          name: tenantData.name || "",
          phone: tenantData.phone || "",
          email: tenantData.email || "",
          type: tenantData.type || "individual"
        }
      });
    }
  };
  const handleUnitNameSubmit = (unitId: string, newName: string) => {
    updateUnit(unitId, {
      unitNumber: newName.trim() || `Unit ${units.findIndex(u => u.id === unitId) + 1}`
    });
    setEditingUnitId(null);
  };
  const handleUnitNameKeyDown = (e: React.KeyboardEvent, unitId: string, value: string) => {
    if (e.key === 'Enter') {
      handleUnitNameSubmit(unitId, value);
    } else if (e.key === 'Escape') {
      setEditingUnitId(null);
    }
  };
  const selectedUnit = units.find(unit => unit.id === selectedUnitId);
  return <div className="space-y-3">
      {units.length > 0 ? <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Property Units</h3>
                <p className="text-xs text-gray-500">Manage units and tenant information</p>
              </div>
            </div>
            <Button onClick={addUnit} size="sm" variant="outline" className="text-xs px-2 py-1 h-7">
              <Plus className="h-3 w-3 mr-1" />
              Add Unit
            </Button>
          </div>

          {/* Unit Carousel Slider */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="max-w-2xl relative">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {units.map(unit => <CarouselItem key={unit.id} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4">
                      <div onClick={() => setSelectedUnitId(unit.id)} className={`p-2 border rounded-lg cursor-pointer transition-all ${selectedUnitId === unit.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${unit.occupancyStatus === "occupied" ? "bg-green-400" : "bg-gray-300"}`} />
                          <span className="text-xs font-medium text-gray-700 truncate">
                            {unit.unitNumber}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {getAvailableCategories().find(cat => cat.value === unit.category)?.label || unit.category}
                        </div>
                      </div>
                    </CarouselItem>)}
                </CarouselContent>
                
                <CarouselPrevious className="-left-6 top-1/2 -translate-y-1/2 h-6 w-6 border-gray-200 bg-white hover:bg-gray-50">
                  <ChevronLeft className="h-3 w-3" />
                </CarouselPrevious>
                <CarouselNext className="-right-6 top-1/2 -translate-y-1/2 h-6 w-6 border-gray-200 bg-white hover:bg-gray-50">
                  <ChevronRight className="h-3 w-3" />
                </CarouselNext>
              </Carousel>
            </div>
          </div>

          {/* Selected Unit Details */}
          {selectedUnit && <div className="rounded-lg border border-gray-200 p-3 space-y-3 bg-white">
              {/* Unit Actions */}
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-900">Unit Details</h4>
                {units.length > 1 && <Button variant="ghost" size="sm" onClick={() => removeUnit(selectedUnit.id)} className="h-7 w-7 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3 w-3" />
                  </Button>}
              </div>

              {/* Unit Basic Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor={`unitNumber-${selectedUnit.id}`} className="text-xs font-medium text-gray-700">Unit Name</Label>
                  {editingUnitId === selectedUnit.id ? <Input defaultValue={selectedUnit.unitNumber} className="h-9 text-sm" placeholder="Enter unit name" autoFocus onBlur={e => handleUnitNameSubmit(selectedUnit.id, e.target.value)} onKeyDown={e => handleUnitNameKeyDown(e, selectedUnit.id, e.currentTarget.value)} /> : <div onClick={() => setEditingUnitId(selectedUnit.id)} className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer transition-all hover:border-gray-300 hover:bg-gray-50 flex items-center justify-between group h-9">
                      <span className="text-gray-700">{selectedUnit.unitNumber}</span>
                      <Edit3 className="h-3 w-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">Property Category</Label>
                  <Select value={selectedUnit.category} onValueChange={value => updateUnit(selectedUnit.id, {
              category: value
            })}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCategories().map(cat => <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Occupancy Status */}
              {shouldShowOccupancyStatus() && <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-700">Occupancy Status</h4>
                  
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      {selectedUnit.occupancyStatus === "occupied" ? <>
                          <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                            <Users className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">Occupied</p>
                            <p className="text-xs text-gray-500">Unit has tenants</p>
                          </div>
                        </> : <>
                          <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                            <UserX className="h-3 w-3 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">Vacant</p>
                            <p className="text-xs text-gray-500">Unit is available</p>
                          </div>
                        </>}
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => toggleOccupancyStatus(selectedUnit.id)} className="text-xs px-2 py-1 h-7">
                      Switch to {selectedUnit.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                    </Button>
                  </div>
                </div>}

              {/* Tenant Information */}
              {shouldShowTenantInfo() && selectedUnit.occupancyStatus === "occupied" && <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-foreground">Tenant Information</Label>
                    
                    {/* Tenant Type Toggle */}
                    <div className="flex bg-muted rounded-lg p-1">
                      <button 
                        type="button" 
                        onClick={() => updateUnitTenant(selectedUnit.id, { type: "individual" })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                          selectedUnit.tenant?.type === "individual" 
                            ? "bg-card text-foreground shadow-sm" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <User className="h-3.5 w-3.5" />
                        Individual
                      </button>
                      <button 
                        type="button" 
                        onClick={() => updateUnitTenant(selectedUnit.id, { type: "company" })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                          selectedUnit.tenant?.type === "company" 
                            ? "bg-card text-foreground shadow-sm" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Building2 className="h-3.5 w-3.5" />
                        Company
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor={`tenantName-${selectedUnit.id}`} className="text-sm font-medium text-foreground">
                        {selectedUnit.tenant?.type === "individual" ? "Full Name" : "Company Name"}
                      </Label>
                      <Input 
                        id={`tenantName-${selectedUnit.id}`} 
                        value={selectedUnit.tenant?.name || ""} 
                        onChange={e => updateUnitTenant(selectedUnit.id, { name: e.target.value })} 
                        placeholder={selectedUnit.tenant?.type === "individual" ? "Enter tenant's full name" : "Enter company name"} 
                        className="h-10"
                      />
                    </div>
                    
                    {/* Contact Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`tenantEmail-${selectedUnit.id}`} className="text-sm font-medium text-foreground">Email</Label>
                        <Input 
                          id={`tenantEmail-${selectedUnit.id}`} 
                          type="email"
                          value={selectedUnit.tenant?.email || ""} 
                          onChange={e => updateUnitTenant(selectedUnit.id, { email: e.target.value })} 
                          placeholder="Enter email address" 
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`tenantPhone-${selectedUnit.id}`} className="text-sm font-medium text-foreground">Phone</Label>
                        <Input 
                          id={`tenantPhone-${selectedUnit.id}`} 
                          type="tel"
                          value={selectedUnit.tenant?.phone || ""} 
                          onChange={e => updateUnitTenant(selectedUnit.id, { phone: e.target.value })} 
                          placeholder="Enter phone number" 
                          className="h-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>}
            </div>}
        </div> : (/* Empty State */
    <div className="text-center py-8 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg mx-auto mb-3 shadow-sm">
            <Building className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">No units configured</h3>
          <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
            Start by adding units to manage this property effectively
          </p>
          <Button onClick={addUnit} size="sm" variant="outline" className="text-xs px-3 py-1.5 h-8">
            <Plus className="h-3 w-3 mr-1" />
            Add Your First Unit
          </Button>
        </div>)}
    </div>;
}
