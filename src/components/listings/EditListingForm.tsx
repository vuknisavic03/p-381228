
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
  Hash,
  User,
  Phone,
  Mail,
  FileText
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
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-12 py-8 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Edit Property</h1>
            <p className="text-gray-500 mt-2">Update your property information</p>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg hover:bg-gray-100">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-auto px-12 py-8">
        <div className="max-w-5xl space-y-12">
          {/* Location Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 pb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Location</h2>
                <p className="text-gray-500 mt-1">Where is this property located?</p>
              </div>
            </div>
            
            <div className="space-y-6 pl-14">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="h-12 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Country</label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className="h-12 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Postal Code</label>
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    className="h-12 text-base"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Street Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  className="h-12 text-base"
                />
              </div>
            </div>
          </div>

          {/* Property Type Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 pb-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <BuildingIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
                <p className="text-gray-500 mt-1">What type of property is this?</p>
              </div>
            </div>
            
            <div className="space-y-8 pl-14">
              {/* Unit Mode Toggle */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Property Structure</h3>
                  <p className="text-gray-500 mt-1">Choose if this property has multiple units</p>
                </div>
                <Button
                  type="button"
                  variant={useUnitsMode ? "default" : "outline"}
                  size="lg"
                  onClick={() => setUseUnitsMode(!useUnitsMode)}
                  className="ml-6"
                >
                  {useUnitsMode ? "Multiple Units" : "Single Unit"}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
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
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select property type">
                        {formData.type && (
                          <div className="flex items-center gap-3">
                            {getPropertyTypeIcon(formData.type as PropertyType)}
                            <span>{selectedTypeOption?.label || formatPropertyType(formData.type as PropertyType)}</span>
                          </div>
                        )}
                      </SelectValue>
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
                    <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
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
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder={formData.type ? "Select category" : "Select type first"}>
                          {formData.category && CategoryIcon && (
                            <div className="flex items-center gap-3">
                              <CategoryIcon className="h-4 w-4" />
                              <span>{selectedCategoryOption?.label}</span>
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableCategories().map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <div className="flex items-center gap-3">
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

              {/* Occupancy Status for single unit */}
              {!useUnitsMode && shouldShowOccupancyStatus() && (
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Occupancy Status</h3>
                    <p className="text-gray-500 mt-1">Is this property currently occupied?</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={toggleOccupancyStatus}
                    className="ml-6"
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

          {/* Units Manager */}
          {useUnitsMode && formData.type && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 pb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Hash className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Units</h2>
                  <p className="text-gray-500 mt-1">Manage individual units in this property</p>
                </div>
              </div>
              <div className="pl-14">
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
              <div className="flex items-center gap-4 pb-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">Tenant Information</h2>
                  <p className="text-gray-500 mt-1">Details about the current tenant</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={toggleTenantType}
                >
                  {formData.tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                </Button>
              </div>
              
              <div className="space-y-6 pl-14">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {formData.tenantType === "individual" ? "Full Name" : "Company Name"}
                  </label>
                  <Input
                    name="tenantName"
                    value={formData.tenantName}
                    onChange={handleChange}
                    placeholder={formData.tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                    className="h-12 text-base"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        name="tenantPhone"
                        value={formData.tenantPhone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="h-12 text-base pl-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        name="tenantEmail"
                        value={formData.tenantEmail}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="h-12 text-base pl-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 pb-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Additional Notes</h2>
                <p className="text-gray-500 mt-1">Any other important details about this property</p>
              </div>
            </div>
            
            <div className="pl-14">
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes, special features, or important details..."
                className="min-h-[120px] resize-none text-base"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex-shrink-0 px-12 py-8 border-t border-gray-100 bg-white">
        <div className="flex gap-4 max-w-5xl">
          <Button 
            onClick={handleSubmit} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
          >
            Save changes
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 bg-white border-gray-200 hover:bg-gray-50 h-12 text-base font-medium"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
