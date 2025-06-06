
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
  X,
  Bed,
  Users,
  UserX,
  Building as BuildingIcon,
  Store as StoreIcon,
  Hotel as HotelIcon,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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

  const propertyTypes: { value: PropertyType; label: string; description: string }[] = [
    { value: "residential_rental", label: "Residential", description: "Homes, apartments, condos for rent" },
    { value: "commercial_rental", label: "Commercial", description: "Office, retail, medical spaces" },
    { value: "industrial", label: "Industrial", description: "Warehouses, factories, distribution" },
    { value: "hospitality", label: "Hospitality", description: "Hotels, motels, B&Bs" },
    { value: "vacation_rental", label: "Vacation Rental", description: "Short-term, Airbnb-style" },
    { value: "mixed_use", label: "Mixed Use", description: "Multi-purpose properties" },
  ];

  const typeToCategoryMap = {
    residential_rental: [
      { value: "single_family", label: "Single-family Home", Icon: Home, description: "Standalone house for one family" },
      { value: "multi_family", label: "Multi-family", Icon: Building, description: "Duplex, triplex, fourplex" },
      { value: "apartment_condo", label: "Apartment/Condo", Icon: Building2, description: "Unit in larger building" },
    ],
    commercial_rental: [
      { value: "office", label: "Office Space", Icon: BuildingIcon, description: "Professional workspace" },
      { value: "retail", label: "Retail Store", Icon: StoreIcon, description: "Shop or storefront" },
      { value: "medical", label: "Medical/Professional", Icon: Building2, description: "Clinic, professional office" },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Warehouse, description: "Storage and distribution" },
      { value: "distribution", label: "Distribution Facility", Icon: Factory, description: "Logistics hub" },
      { value: "manufacturing", label: "Manufacturing", Icon: Factory, description: "Production facility" },
    ],
    hospitality: [
      { value: "hotel", label: "Hotel", Icon: HotelIcon, description: "Full-service accommodation" },
      { value: "motel", label: "Motel", Icon: Hotel, description: "Roadside accommodation" },
      { value: "bed_breakfast", label: "Bed & Breakfast", Icon: Bed, description: "Small hospitality business" },
    ],
    vacation_rental: [
      { value: "short_term", label: "Short-term Rental", Icon: Home, description: "Airbnb, VRBO style" },
      { value: "serviced_apartment", label: "Serviced Apartment", Icon: Building2, description: "Hotel-like apartment" },
      { value: "holiday_home", label: "Holiday Home", Icon: Home, description: "Vacation villa or cabin" },
    ],
    mixed_use: [
      { value: "residential_commercial", label: "Residential-Commercial", Icon: Building, description: "Live-work combination" },
      { value: "live_work", label: "Live-Work Space", Icon: Home, description: "Combined living and workspace" },
      { value: "multi_purpose", label: "Multi-Purpose", Icon: Building, description: "Various use combinations" },
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleTenantType = () => {
    setFormData(prev => ({
      ...prev,
      tenantType: prev.tenantType === "individual" ? "company" : "individual"
    }));
  };

  const toggleOccupancyStatus = () => {
    setFormData(prev => ({
      ...prev,
      occupancyStatus: prev.occupancyStatus === "occupied" ? "vacant" : "occupied",
      ...(prev.occupancyStatus === "occupied" ? {
        tenantName: "",
        tenantPhone: "",
        tenantEmail: "",
      } : {})
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

  const isFormValid = formData.city && formData.address && formData.country && formData.type && (useUnitsMode || formData.category);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Edit Listing</h1>
          <p className="text-sm text-gray-500 mt-1">Update the details of your listing</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-2xl space-y-8">
          
          {/* Location Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Location</h2>
              <p className="text-sm text-gray-600">Update the location details of your listing</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Belgrade"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700 mb-2 block">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g., Serbia"
                    className="h-11"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">Full Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g., Knez Mihailova 42"
                  className="h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700 mb-2 block">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="e.g., 11000"
                  className="h-11"
                />
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Property Type Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Listing Type</h2>
              <p className="text-sm text-gray-600">Update the type and structure of your listing</p>
            </div>

            {/* Units Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 text-sm">Property Structure</p>
                <p className="text-xs text-gray-500">Does this property have multiple units?</p>
              </div>
              <Button
                type="button"
                variant={useUnitsMode ? "default" : "outline"}
                size="sm"
                onClick={() => setUseUnitsMode(!useUnitsMode)}
                className="text-xs"
              >
                {useUnitsMode ? "Multiple Units" : "Single Unit"}
              </Button>
            </div>

            {/* Property Type Selection */}
            <div className="grid grid-cols-1 gap-3">
              {propertyTypes.map((type) => (
                <div
                  key={type.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.type === type.value
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, type: type.value, category: "" }));
                    setUnits([]);
                  }}
                >
                  <div className="flex items-start gap-3">
                    {React.cloneElement(getPropertyTypeIcon(type.value), { 
                      className: `h-5 w-5 mt-0.5 ${formData.type === type.value ? "text-blue-600" : "text-gray-500"}` 
                    })}
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${formData.type === type.value ? "text-blue-900" : "text-gray-900"}`}>
                        {type.label}
                      </h4>
                      <p className={`text-xs mt-1 ${formData.type === type.value ? "text-blue-700" : "text-gray-500"}`}>
                        {type.description}
                      </p>
                    </div>
                    {formData.type === type.value && (
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          {formData.type && (
            <>
              <Separator className="my-8" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Details</h2>
                  <p className="text-sm text-gray-600">Configure the specific details of your listing</p>
                </div>

                {/* Units Manager */}
                {useUnitsMode ? (
                  <UnitsManager
                    propertyType={formData.type as PropertyType}
                    units={units}
                    onUnitsChange={setUnits}
                  />
                ) : (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Specific Category</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {getAvailableCategories().map((cat) => (
                        <div
                          key={cat.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.category === cat.value
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                        >
                          <div className="flex items-start gap-3">
                            <cat.Icon className={`h-5 w-5 mt-0.5 ${formData.category === cat.value ? "text-blue-600" : "text-gray-500"}`} />
                            <div className="flex-1">
                              <h4 className={`font-medium text-sm ${formData.category === cat.value ? "text-blue-900" : "text-gray-900"}`}>
                                {cat.label}
                              </h4>
                              <p className={`text-xs mt-1 ${formData.category === cat.value ? "text-blue-700" : "text-gray-500"}`}>
                                {cat.description}
                              </p>
                            </div>
                            {formData.category === cat.value && (
                              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Occupancy and Tenant Info for Single Unit */}
                {!useUnitsMode && shouldShowTenantInfo() && formData.category && (
                  <>
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Occupancy Status</Label>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {formData.occupancyStatus === "occupied" ? (
                              <>
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                                  <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">Occupied</p>
                                  <p className="text-xs text-gray-500">Property has tenants</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                  <UserX className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">Vacant</p>
                                  <p className="text-xs text-gray-500">Property is available</p>
                                </div>
                              </>
                            )}
                          </div>
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm" 
                            onClick={toggleOccupancyStatus}
                            className="text-xs"
                          >
                            Switch to {formData.occupancyStatus === "occupied" ? "Vacant" : "Occupied"}
                          </Button>
                        </div>
                      </div>

                      {/* Tenant Information */}
                      {formData.occupancyStatus === "occupied" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-gray-700">Tenant Information</Label>
                            
                            {/* Tenant Type Toggle - Smaller and More Elegant */}
                            <div className="flex bg-gray-50 border border-gray-100 rounded-md p-0.5">
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, tenantType: "individual" }))}
                                className={`px-2 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1.5 ${
                                  formData.tenantType === "individual"
                                    ? "bg-white text-gray-700 shadow-sm border border-gray-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <Users className="h-3 w-3" />
                                Individual
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, tenantType: "company" }))}
                                className={`px-2 py-1 text-xs font-medium rounded-sm transition-all flex items-center gap-1.5 ${
                                  formData.tenantType === "company"
                                    ? "bg-white text-gray-700 shadow-sm border border-gray-200"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <Building2 className="h-3 w-3" />
                                Company
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="tenantName" className="text-sm font-medium text-gray-700 mb-2 block">
                                {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                              </Label>
                              <Input
                                id="tenantName"
                                name="tenantName"
                                value={formData.tenantName}
                                onChange={handleChange}
                                placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                                className="h-11"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="tenantPhone" className="text-sm font-medium text-gray-700 mb-2 block">Phone</Label>
                                <Input
                                  id="tenantPhone"
                                  name="tenantPhone"
                                  value={formData.tenantPhone}
                                  onChange={handleChange}
                                  placeholder="Phone number"
                                  className="h-11"
                                />
                              </div>
                              <div>
                                <Label htmlFor="tenantEmail" className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                                <Input
                                  id="tenantEmail"
                                  name="tenantEmail"
                                  value={formData.tenantEmail}
                                  onChange={handleChange}
                                  placeholder="Email address"
                                  className="h-11"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* Notes Section */}
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Notes</h2>
              <p className="text-sm text-gray-600">Update any additional information about this listing</p>
            </div>
            
            <div>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes, special features, maintenance requirements, or important details..."
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-8 py-4">
        <div className="flex gap-3">
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Update Listing
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 h-11"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
