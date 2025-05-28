
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Home,
  Building2,
  Factory,
  Store,
  Building,
  Warehouse,
  Hotel,
  Briefcase,
  X,
  Bed,
  Users,
  UserX,
  MapPin,
  Building as BuildingIcon,
  Store as StoreIcon,
  Hotel as HotelIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SheetClose } from "../ui/sheet";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";
import { UnitsManager } from "./UnitsManager";

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

interface EditListingFormProps {
  listing: any;
  onClose: () => void;
  onUpdate: (updatedListing: any) => void;
}

export function EditListingForm({ listing, onClose, onUpdate }: EditListingFormProps) {
  const [formData, setFormData] = useState({
    city: listing.city || "",
    address: listing.address || "",
    country: listing.country || "",
    postalCode: listing.postalCode || "",
    type: listing.type || "",
    category: listing.category || "",
    occupancyStatus: listing.occupancyStatus || (listing.tenant?.name ? "occupied" : "vacant"),
    tenantName: listing.tenant?.name || "",
    tenantPhone: listing.tenant?.phone || "",
    tenantEmail: listing.tenant?.email || "",
    tenantType: listing.tenant?.type || "individual",
    notes: listing.notes || "",
  });

  const [units, setUnits] = useState<Unit[]>(listing.units || []);
  const [useUnitsMode, setUseUnitsMode] = useState(listing.units && listing.units.length > 0);

  // Ensure type and category are properly set when component mounts
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: listing.type || "",
      category: listing.category || "",
      occupancyStatus: listing.occupancyStatus || (listing.tenant?.name ? "occupied" : "vacant")
    }));
    setUnits(listing.units || []);
    setUseUnitsMode(listing.units && listing.units.length > 0);
  }, [listing]);

  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: "residential_rental", label: "Residential Rental" },
    { value: "commercial_rental", label: "Commercial Rental" },
    { value: "industrial", label: "Industrial" },
    { value: "hospitality", label: "Hospitality" },
    { value: "vacation_rental", label: "Vacation Rental" },
    { value: "mixed_use", label: "Mixed Use" },
  ];

  const typeToCategoryMap = {
    residential_rental: [
      { value: "single_family", label: "Single-family Home", Icon: Home },
      { value: "multi_family", label: "Multi-family (Duplex, Triplex)", Icon: Building },
      { value: "apartment_condo", label: "Apartment / Condo", Icon: Building2 },
    ],
    commercial_rental: [
      { value: "office", label: "Office", Icon: BuildingIcon },
      { value: "retail", label: "Retail", Icon: StoreIcon },
      { value: "medical", label: "Medical / Professional Unit", Icon: Building2 },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Warehouse },
      { value: "distribution", label: "Distribution Facility", Icon: Factory },
      { value: "manufacturing", label: "Manufacturing Facility", Icon: Factory },
    ],
    hospitality: [
      { value: "hotel", label: "Hotel", Icon: HotelIcon },
      { value: "motel", label: "Motel", Icon: Hotel },
      { value: "bed_breakfast", label: "Bed & Breakfast", Icon: Bed },
    ],
    vacation_rental: [
      { value: "short_term", label: "Short-term Rental (Airbnb-style)", Icon: Home },
      { value: "serviced_apartment", label: "Serviced Apartment", Icon: Building2 },
      { value: "holiday_home", label: "Holiday Home / Villa", Icon: Home },
    ],
    mixed_use: [
      { value: "residential_commercial", label: "Residential-Commercial", Icon: Building },
      { value: "live_work", label: "Live-Work", Icon: Home },
      { value: "multi_purpose", label: "Multi-Purpose", Icon: Building },
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleTenantType = () => {
    console.log("Toggle tenant type clicked, current type:", formData.tenantType);
    setFormData(prev => {
      const newType = prev.tenantType === "individual" ? "company" : "individual";
      console.log("Switching tenant type from", prev.tenantType, "to", newType);
      return {
        ...prev,
        tenantType: newType
      };
    });
  };

  const toggleOccupancyStatus = () => {
    setFormData(prev => ({
      ...prev,
      occupancyStatus: prev.occupancyStatus === "occupied" ? "vacant" : "occupied",
      // Only clear tenant fields when switching TO vacant (not FROM vacant)
      tenantName: prev.occupancyStatus === "occupied" ? "" : prev.tenantName,
      tenantPhone: prev.occupancyStatus === "occupied" ? "" : prev.tenantPhone,
      tenantEmail: prev.occupancyStatus === "occupied" ? "" : prev.tenantEmail,
    }));
  };

  const getAvailableCategories = () => {
    if (!formData.type) return [];
    return typeToCategoryMap[formData.type as keyof typeof typeToCategoryMap] || [];
  };

  const shouldShowOccupancyStatus = () => {
    return formData.type && !["hospitality", "vacation_rental"].includes(formData.type);
  };

  const shouldShowTenantInfo = () => {
    return formData.type && !["hospitality", "vacation_rental"].includes(formData.type);
  };

  const handleSubmit = async () => {
    try {
      const updatedListing = {
        ...listing,
        ...formData,
        units: useUnitsMode ? units : undefined,
        category: useUnitsMode ? "mixed" : formData.category,
        tenant: (!useUnitsMode && formData.occupancyStatus === "occupied") ? {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        } : null
      };

      const res = await fetch(`http://localhost:5000/listings/${listing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedListing),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      toast({
        title: "Listing Updated",
        description: "Your changes have been saved successfully",
      });

      onUpdate(updatedListing);
      onClose();
    } catch (err) {
      console.error("Error updating:", err);
      
      toast({
        title: "Listing Updated (Demo Mode)",
        description: "Your changes have been saved in the demo data",
      });
      
      onUpdate({
        ...listing,
        ...formData,
        units: useUnitsMode ? units : undefined,
        category: useUnitsMode ? "mixed" : formData.category,
        tenant: (!useUnitsMode && formData.occupancyStatus === "occupied") ? {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        } : null
      });
      onClose();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Listing</h1>
            <p className="text-gray-600 mt-1">Update your property information</p>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </div>

        <div className="space-y-8">
          {/* Property Location */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Property Location</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Belgrade"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g., Serbia"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g., Knez Mihailova 42"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="e.g., 11000"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Property Type</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setUseUnitsMode(!useUnitsMode)}
                  className="text-xs"
                >
                  {useUnitsMode ? "Multiple Units" : "Single Unit"}
                </Button>
                {!useUnitsMode && shouldShowOccupancyStatus() && (
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    onClick={toggleOccupancyStatus} 
                    className="text-xs"
                  >
                    {formData.occupancyStatus === "occupied" ? (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-green-600" />
                        <span>Occupied</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <UserX className="h-3 w-3 text-orange-600" />
                        <span>Vacant</span>
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => {
                    setFormData(prev => ({
                      ...prev,
                      type: value,
                      category: ""
                    }));
                    setUnits([]);
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {React.cloneElement(getPropertyTypeIcon(type.value), { className: "h-4 w-4 text-gray-500" })}
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!useUnitsMode && (
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => {
                      setFormData(prev => ({
                        ...prev,
                        category: value
                      }));
                    }}
                    disabled={!formData.type}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={formData.type ? "Select category" : "Select type first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCategories().map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            <cat.Icon className="h-4 w-4 text-gray-500" />
                            <span>{cat.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Units Manager */}
          {useUnitsMode && formData.type && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <UnitsManager
                propertyType={formData.type as PropertyType}
                units={units}
                onUnitsChange={setUnits}
              />
            </div>
          )}

          {/* Tenant Information */}
          {!useUnitsMode && shouldShowTenantInfo() && formData.occupancyStatus === "occupied" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Tenant Information</h2>
                </div>
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  onClick={toggleTenantType} 
                  className="text-xs"
                >
                  {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tenantName" className="text-sm font-medium text-gray-700">
                    {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                  </Label>
                  <Input
                    id="tenantName"
                    name="tenantName"
                    value={formData.tenantName}
                    onChange={handleChange}
                    placeholder="Enter tenant name"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenantPhone" className="text-sm font-medium text-gray-700">Phone</Label>
                    <Input
                      id="tenantPhone"
                      name="tenantPhone"
                      value={formData.tenantPhone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantEmail" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input
                      id="tenantEmail"
                      name="tenantEmail"
                      value={formData.tenantEmail}
                      onChange={handleChange}
                      placeholder="Email address"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Additional Details</h2>
            </div>
            
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about this property..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
