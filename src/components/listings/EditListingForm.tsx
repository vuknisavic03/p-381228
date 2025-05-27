
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { X, MapPin, Building, Hash, User, FileText, Users, UserX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
    <div className="h-full bg-white">
      {/* Clean Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Property</h1>
            <p className="text-gray-500 text-sm mt-1">Update your property information</p>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Location Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">Location</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="h-11 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="h-11 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    className="h-11 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="h-11 text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Property Type Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-medium text-gray-900">Property Details</h2>
            </div>
            
            <div className="space-y-6">
              {/* Unit Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Property Structure</h3>
                  <p className="text-gray-500 text-sm">Choose between single unit or multiple units</p>
                </div>
                <Button
                  type="button"
                  variant={useUnitsMode ? "default" : "outline"}
                  onClick={() => setUseUnitsMode(!useUnitsMode)}
                  className="h-10"
                >
                  {useUnitsMode ? "Multiple Units" : "Single Unit"}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
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
                    <SelectTrigger className="h-11 text-base">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {getPropertyTypeIcon(type.value)}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {!useUnitsMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
                      <SelectTrigger className="h-11 text-base">
                        <SelectValue placeholder={formData.type ? "Select category" : "Select type first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableCategories().map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span>{cat.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Occupancy Status for single unit */}
              {!useUnitsMode && shouldShowOccupancyStatus() && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Occupancy Status</h3>
                    <p className="text-gray-500 text-sm">Current occupancy status</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      occupancyStatus: prev.occupancyStatus === "occupied" ? "vacant" : "occupied",
                      tenantName: prev.occupancyStatus === "occupied" ? "" : prev.tenantName,
                      tenantPhone: prev.occupancyStatus === "occupied" ? "" : prev.tenantPhone,
                      tenantEmail: prev.occupancyStatus === "occupied" ? "" : prev.tenantEmail,
                    }))}
                    className="h-10"
                  >
                    {formData.occupancyStatus === "occupied" ? (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span>Occupied</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserX className="h-4 w-4 text-orange-600" />
                        <span>Vacant</span>
                      </div>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Units Manager */}
          {useUnitsMode && formData.type && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Hash className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-medium text-gray-900">Units Management</h2>
              </div>
              <UnitsManager
                propertyType={formData.type as PropertyType}
                units={units}
                onUnitsChange={setUnits}
              />
            </div>
          )}

          {/* Tenant Information */}
          {!useUnitsMode && shouldShowTenantInfo() && formData.occupancyStatus === "occupied" && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-orange-600" />
                  <h2 className="text-lg font-medium text-gray-900">Tenant Information</h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    tenantType: prev.tenantType === "individual" ? "company" : "individual"
                  }))}
                  className="h-10"
                >
                  {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                  </label>
                  <Input
                    name="tenantName"
                    value={formData.tenantName}
                    onChange={handleChange}
                    placeholder={formData.tenantType === "individual" ? "John Doe" : "ABC Corp"}
                    className="h-11 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    name="tenantPhone"
                    value={formData.tenantPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="h-11 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    name="tenantEmail"
                    value={formData.tenantEmail}
                    onChange={handleChange}
                    placeholder="tenant@example.com"
                    className="h-11 text-base"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Additional Notes</h2>
            </div>
            
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes, special features, or important details about this property..."
              className="min-h-[120px] text-base resize-none"
            />
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="border-t border-gray-100 p-6">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Button 
            onClick={handleSubmit} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 text-base font-medium"
          >
            Save Changes
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 h-11 text-base font-medium"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
