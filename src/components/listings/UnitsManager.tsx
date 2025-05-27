
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Users, UserX, Search, Filter, Edit3, Check, X, Mail, Phone, User, Eye, EyeOff } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "occupied" | "vacant">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUnit, setEditingUnit] = useState<string | null>(null);
  const [showTenantDetails, setShowTenantDetails] = useState(false);

  const itemsPerPage = 10;

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

  // Filtered and paginated units
  const filteredUnits = useMemo(() => {
    return units.filter(unit => {
      const matchesSearch = unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           unit.tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const matchesStatus = statusFilter === "all" || unit.occupancyStatus === statusFilter;
      const matchesCategory = categoryFilter === "all" || unit.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [units, searchTerm, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const occupiedUnits = units.filter(unit => unit.occupancyStatus === "occupied").length;
  const vacantUnits = units.filter(unit => unit.occupancyStatus === "vacant").length;

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

  const getCategoryLabel = (categoryValue: string) => {
    const category = getAvailableCategories().find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">Units Management</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-medium">{units.length} total units</span>
            {shouldShowOccupancyStatus() && (
              <>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium text-emerald-700">{occupiedUnits}</span> occupied
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="font-medium text-amber-700">{vacantUnits}</span> vacant
                </span>
              </>
            )}
          </div>
        </div>
        
        <Button
          type="button"
          onClick={addUnit}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 rounded-lg border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search units or tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        
        {shouldShowOccupancyStatus() && (
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-40 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="vacant">Vacant</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {getAvailableCategories().map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {shouldShowTenantInfo() && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTenantDetails(!showTenantDetails)}
            className="whitespace-nowrap"
          >
            {showTenantDetails ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showTenantDetails ? "Hide" : "Show"} Tenant Details
          </Button>
        )}
      </div>

      {/* Units Table */}
      {units.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <ScrollArea className="h-[600px]">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div className="col-span-2">Unit</div>
                <div className="col-span-3">Category</div>
                {shouldShowOccupancyStatus() && <div className="col-span-2">Status</div>}
                {shouldShowTenantInfo() && showTenantDetails && (
                  <>
                    <div className="col-span-2">Tenant</div>
                    <div className="col-span-2">Contact</div>
                  </>
                )}
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {paginatedUnits.map((unit) => (
                  <div key={unit.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
                    {/* Unit Number */}
                    <div className="col-span-2 flex items-center">
                      {editingUnit === unit.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={unit.unitNumber}
                            onChange={(e) => updateUnit(unit.id, { unitNumber: e.target.value })}
                            className="h-8 text-sm"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingUnit(null)}
                            className="h-6 w-6 p-0"
                          >
                            <Check className="h-3 w-3 text-emerald-600" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{unit.unitNumber}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingUnit(unit.id)}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          >
                            <Edit3 className="h-3 w-3 text-gray-500" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div className="col-span-3 flex items-center">
                      <Select
                        value={unit.category}
                        onValueChange={(value) => updateUnit(unit.id, { category: value })}
                      >
                        <SelectTrigger className="h-8 text-sm border-none bg-transparent hover:bg-gray-100">
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

                    {/* Status */}
                    {shouldShowOccupancyStatus() && (
                      <div className="col-span-2 flex items-center">
                        <Badge
                          variant="outline"
                          className={`cursor-pointer border-0 ${
                            unit.occupancyStatus === "occupied" 
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          }`}
                          onClick={() => toggleOccupancyStatus(unit.id)}
                        >
                          {unit.occupancyStatus === "occupied" ? (
                            <><Users className="h-3 w-3 mr-1" />Occupied</>
                          ) : (
                            <><UserX className="h-3 w-3 mr-1" />Vacant</>
                          )}
                        </Badge>
                      </div>
                    )}

                    {/* Tenant Details */}
                    {shouldShowTenantInfo() && showTenantDetails && (
                      <>
                        <div className="col-span-2 flex items-center">
                          {unit.occupancyStatus === "occupied" ? (
                            <Input
                              value={unit.tenant?.name || ""}
                              onChange={(e) => updateUnit(unit.id, { 
                                tenant: { 
                                  ...unit.tenant,
                                  name: e.target.value,
                                  phone: unit.tenant?.phone || "",
                                  email: unit.tenant?.email || "",
                                  type: unit.tenant?.type || "individual"
                                }
                              })}
                              placeholder="Tenant name"
                              className="h-8 text-sm border-none bg-transparent hover:bg-gray-100"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">No tenant</span>
                          )}
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          {unit.occupancyStatus === "occupied" && (
                            <>
                              <Input
                                value={unit.tenant?.phone || ""}
                                onChange={(e) => updateUnit(unit.id, { 
                                  tenant: { 
                                    ...unit.tenant,
                                    phone: e.target.value,
                                    name: unit.tenant?.name || "",
                                    email: unit.tenant?.email || "",
                                    type: unit.tenant?.type || "individual"
                                  }
                                })}
                                placeholder="Phone"
                                className="h-8 text-sm border-none bg-transparent hover:bg-gray-100 flex-1"
                              />
                            </>
                          )}
                        </div>
                      </>
                    )}

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeUnit(unit.id)}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No units added yet</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Create your first unit to start managing this property's rental spaces and tenants.
          </p>
          <Button
            onClick={addUnit}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Unit
          </Button>
        </div>
      )}
    </div>
  );
}
