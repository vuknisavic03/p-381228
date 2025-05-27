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
  MapPin
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  // Updated property types with corresponding icon components
  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: "residential_rental", label: "Residential Rental" },
    { value: "commercial_rental", label: "Commercial Rental" },
    { value: "industrial", label: "Industrial" },
    { value: "hospitality", label: "Hospitality" },
    { value: "vacation_rental", label: "Vacation Rental" },
    { value: "mixed_use", label: "Mixed Use" },
  ];

  // Updated category maps based on the new structure
  const typeToCategoryMap = {
    residential_rental: [
      { value: "single_family", label: "Single-family Home", Icon: Home },
      { value: "multi_family", label: "Multi-family (Duplex, Triplex)", Icon: Building },
      { value: "apartment_condo", label: "Apartment / Condo", Icon: Building2 },
    ],
    commercial_rental: [
      { value: "office", label: "Office", Icon: Building },
      { value: "retail", label: "Retail", Icon: Store },
      { value: "medical", label: "Medical / Professional Unit", Icon: Building2 },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Warehouse },
      { value: "distribution", label: "Distribution Facility", Icon: Factory },
      { value: "manufacturing", label: "Manufacturing Facility", Icon: Factory },
    ],
    hospitality: [
      { value: "hotel", label: "Hotel", Icon: Hotel },
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
      // Clear tenant info if switching to vacant
      tenantName: prev.occupancyStatus === "occupied" ? "" : prev.tenantName,
      tenantPhone: prev.occupancyStatus === "occupied" ? "" : prev.tenantPhone,
      tenantEmail: prev.occupancyStatus === "occupied" ? "" : prev.tenantEmail,
    }));
  };

  const getAvailableCategories = () => {
    if (!formData.type) return [];
    return typeToCategoryMap[formData.type as keyof typeof typeToCategoryMap] || [];
  };

  // Check if current property type should show occupancy status
  const shouldShowOccupancyStatus = () => {
    return formData.type && !["hospitality", "vacation_rental"].includes(formData.type);
  };

  // Check if current property type should show tenant information
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

  // Find the currently selected type option
  const selectedTypeOption = propertyTypes.find(type => type.value === formData.type);

  // Find the currently selected category option
  const selectedCategoryOptions = getAvailableCategories();
  const selectedCategoryOption = selectedCategoryOptions.find(cat => cat.value === formData.category);
  const CategoryIcon = selectedCategoryOption?.Icon;

  return (
    <div className="h-full overflow-auto bg-white">
      {/* Header with close button */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">Edit Listing</h2>
        <SheetClose asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
      </div>

      {/* Form content */}
      <div className="px-6 py-4 space-y-8">
        {/* Property Location Section */}
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Property Location</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
            <MapPin className="h-4 w-4 text-blue-500 ml-2" />
          </div>
          
          <div className="bg-blue-50/30 border border-blue-100 rounded-lg p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">City *</label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Country *</label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Address *</label>
              <Input
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Postal Code</label>
              <Input
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Property Type Section */}
        <div className="space-y-4 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Property Classification</h3>
              <div className="ml-2 h-px bg-gray-100 flex-1"></div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUseUnitsMode(!useUnitsMode)}
                className="h-7 text-xs bg-white hover:bg-blue-50 border-blue-200 rounded-full px-3"
              >
                {useUnitsMode ? "Multiple Units" : "Single Unit"}
              </Button>
              {!useUnitsMode && shouldShowOccupancyStatus() && (
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  onClick={toggleOccupancyStatus} 
                  className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-3"
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
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Property Type</label>
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
                <SelectTrigger className="border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md">
                  <SelectValue placeholder="Select property type">
                    {formData.type && (
                      <div className="flex items-center gap-2">
                        {getPropertyTypeIcon(formData.type as PropertyType)}
                        <span>{selectedTypeOption?.label || formatPropertyType(formData.type as PropertyType)}</span>
                      </div>
                    )}
                  </SelectValue>
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
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Category</label>
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
                  <SelectTrigger className="border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md">
                    <SelectValue placeholder={formData.type ? "Select category" : "Select type first"}>
                      {formData.category && CategoryIcon && (
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4" />
                          <span>{selectedCategoryOption?.label}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableCategories().map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.Icon className="h-4 w-4" />
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
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
            <UnitsManager
              propertyType={formData.type as PropertyType}
              units={units}
              onUnitsChange={setUnits}
            />
          </div>
        )}

        {/* Tenant Information - only show if single unit mode, occupied AND not hospitality/vacation rental */}
        {!useUnitsMode && shouldShowTenantInfo() && formData.occupancyStatus === "occupied" && (
          <div className="space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">
                  Tenant Information
                </h3>
                <div className="ml-2 h-px bg-gray-100 flex-1"></div>
              </div>
              <Button 
                type="button"
                variant="outline" 
                size="sm" 
                onClick={toggleTenantType} 
                className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-3"
              >
                {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
              </Button>
            </div>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                  {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                </label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Phone</label>
                  <Input
                    className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                    name="tenantPhone"
                    value={formData.tenantPhone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Email</label>
                  <Input
                    className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                    name="tenantEmail"
                    value={formData.tenantEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Details Section */}
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Additional Details</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
          </div>
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
            <Textarea
              className="min-h-[120px] w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 resize-none text-sm rounded-md"
              placeholder="Add notes or additional details about this property..."
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
        <Button 
          onClick={handleSubmit} 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
        >
          Save changes
        </Button>
        <Button 
          variant="outline" 
          onClick={onClose} 
          className="bg-white border-gray-200 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
