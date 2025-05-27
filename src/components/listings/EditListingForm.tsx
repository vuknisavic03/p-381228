
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
    <div className="h-full bg-white flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-16 py-8 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
              <p className="text-gray-600 mt-1">Update your property information</p>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="sm" className="h-12 w-12 p-0 rounded-xl hover:bg-gray-200">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto px-16 py-10">
          <div className="space-y-16 max-w-4xl">
            {/* Location Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Property Location</h2>
                  <p className="text-gray-600">Where is this property located?</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">City</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="h-14 text-lg border-gray-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Country</label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        className="h-14 text-lg border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Street Address</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter full address"
                      className="h-14 text-lg border-gray-300 rounded-xl"
                    />
                  </div>
                  
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Postal Code</label>
                    <Input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Enter postal code"
                      className="h-14 text-lg border-gray-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Type Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Property Type</h2>
                  <p className="text-gray-600">What type of property is this?</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="space-y-8">
                  {/* Unit Mode Toggle */}
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Property Structure</h3>
                      <p className="text-gray-600 mt-1">Single unit or multiple units?</p>
                    </div>
                    <Button
                      type="button"
                      variant={useUnitsMode ? "default" : "outline"}
                      size="lg"
                      onClick={() => setUseUnitsMode(!useUnitsMode)}
                      className="h-12 px-6 text-base font-semibold"
                    >
                      {useUnitsMode ? "Multiple Units" : "Single Unit"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Property Type</label>
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
                        <SelectTrigger className="h-14 text-lg border-gray-300 rounded-xl">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-3">
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
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Category</label>
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
                          <SelectTrigger className="h-14 text-lg border-gray-300 rounded-xl">
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
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Occupancy Status</h3>
                        <p className="text-gray-600 mt-1">Is this property currently occupied?</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          occupancyStatus: prev.occupancyStatus === "occupied" ? "vacant" : "occupied",
                          tenantName: prev.occupancyStatus === "occupied" ? "" : prev.tenantName,
                          tenantPhone: prev.occupancyStatus === "occupied" ? "" : prev.tenantPhone,
                          tenantEmail: prev.occupancyStatus === "occupied" ? "" : prev.tenantEmail,
                        }))}
                        className="h-12 px-6 text-base font-semibold"
                      >
                        {formData.occupancyStatus === "occupied" ? (
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-green-600" />
                            <span>Occupied</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <UserX className="h-5 w-5 text-orange-600" />
                            <span>Vacant</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Units Manager */}
            {useUnitsMode && formData.type && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Hash className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Units Management</h2>
                    <p className="text-gray-600">Manage individual units in this property</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                  <UnitsManager
                    propertyType={formData.type as PropertyType}
                    units={units}
                    onUnitsChange={setUnits}
                  />
                </div>
              </div>
            )}

            {/* Tenant Information */}
            {!useUnitsMode && shouldShowTenantInfo() && formData.occupancyStatus === "occupied" && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <User className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">Tenant Information</h2>
                    <p className="text-gray-600">Details about the current tenant</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      tenantType: prev.tenantType === "individual" ? "company" : "individual"
                    }))}
                    className="h-12 px-6 text-base font-semibold"
                  >
                    {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                  </Button>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                      </label>
                      <Input
                        name="tenantName"
                        value={formData.tenantName}
                        onChange={handleChange}
                        placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                        className="h-14 text-lg border-gray-300 rounded-xl"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Phone Number</label>
                        <Input
                          name="tenantPhone"
                          value={formData.tenantPhone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className="h-14 text-lg border-gray-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Email Address</label>
                        <Input
                          name="tenantEmail"
                          value={formData.tenantEmail}
                          onChange={handleChange}
                          placeholder="Enter email address"
                          className="h-14 text-lg border-gray-300 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Additional Notes</h2>
                  <p className="text-gray-600">Any other important details</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes, special features, or important details..."
                  className="min-h-[140px] resize-none text-lg border-gray-300 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex-shrink-0 px-16 py-8 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-6 max-w-4xl">
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-semibold rounded-xl"
            >
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 bg-white border-gray-300 hover:bg-gray-50 h-14 text-lg font-semibold rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
