import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  Building as BuildingIcon,
  Store as StoreIcon,
  Hotel as HotelIcon,
  MapPin,
  Loader2,
  Users,
  UserX,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";
import { useGeocoding } from "@/hooks/useGeocoding";
import { LocationAutofill } from "./LocationAutofill";

interface ListingFormProps {
  onClose?: () => void;
  onListingAdded?: () => void;
}

export function ListingForm({ onClose, onListingAdded }: ListingFormProps) {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [typeField, setTypeField] = useState<string>("");
  const [category, setCategory] = useState("");
  const [occupancyStatus, setOccupancyStatus] = useState<"occupied" | "vacant">("occupied");
  const [tenantName, setTenantName] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [tenantType, setTenantType] = useState("individual");
  const [isSaving, setIsSaving] = useState(false);

  const { getCoordinates, isGeocoding } = useGeocoding();

  // Handle location selection for auto-population
  const handleCityLocationSelect = (locationData: { city?: string; country?: string }) => {
    if (locationData.country) {
      setCountry(locationData.country);
    }
  };

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

  const getAvailableCategories = () => {
    if (!typeField) return [];
    return typeToCategoryMap[typeField as keyof typeof typeToCategoryMap] || [];
  };

  // Check if current property type should show occupancy status
  const shouldShowOccupancyStatus = () => {
    return typeField && !["hospitality", "vacation_rental"].includes(typeField);
  };

  // Check if current property type should show tenant/guest information
  const shouldShowTenantInfo = () => {
    return typeField && !["hospitality", "vacation_rental"].includes(typeField);
  };

  const toggleTenantType = () => {
    setTenantType(tenantType === "individual" ? "company" : "individual");
  };

  const toggleOccupancyStatus = () => {
    setOccupancyStatus(occupancyStatus === "occupied" ? "vacant" : "occupied");
  };

  const handleSave = async () => {
    if (!typeField) {
      toast({
        title: "Type Required",
        description: "Please select a property type",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "Category Required",
        description: "Please select a property category",
        variant: "destructive",
      });
      return;
    }

    if (!address || !city || !country) {
      toast({
        title: "Address Required",
        description: "Please provide complete address information",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      console.log(`Attempting maximum precision geocoding for: ${address}, ${city}, ${country}`);
      
      // Get high-precision coordinates for the address
      const coordinates = await getCoordinates(address, city, country);
      
      if (!coordinates) {
        setIsSaving(false);
        return; // Error already shown by useGeocoding hook
      }

      console.log(`High-precision coordinates obtained:`, coordinates);

      const randomId = Math.floor(Math.random() * 10000);
      
      const payload = {
        id: randomId,
        city,
        address,
        country,
        postalCode,
        type: typeField,
        category,
        location: coordinates, // High-precision geocoded coordinates
        ...(shouldShowOccupancyStatus() && { occupancyStatus }), // Only include if property type needs it
        tenant: (shouldShowTenantInfo() && tenantName) ? {
          name: tenantName,
          phone: tenantPhone,
          email: tenantEmail,
          type: tenantType,
        } : null,
        notes,
      };
      
      try {
        const res = await fetch("http://localhost:5000/listings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        await res.json();
        
        toast({
          title: "Listing Added Successfully",
          description: `Property geocoded with maximum precision and saved`,
        });
        
      } catch (err) {
        console.error("Error saving to server:", err);
        
        toast({
          title: "Listing Added (Demo Mode)",
          description: "Property added with precise coordinates from enhanced geocoding",
        });
      }
      
      resetForm();
      window.dispatchEvent(new CustomEvent('refresh-listings'));
      
      if (onClose) {
        onClose();
      }
      
      if (onListingAdded) {
        onListingAdded();
      }
      
    } catch (err) {
      console.error("Error during save:", err);
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const resetForm = () => {
    setCity("");
    setAddress("");
    setCountry("");
    setPostalCode("");
    setTypeField("");
    setCategory("");
    setOccupancyStatus("occupied");
    setTenantName("");
    setTenantPhone("");
    setTenantEmail("");
    setNotes("");
  };

  const isProcessing = isSaving || isGeocoding;

  // Check if required fields are filled
  const isFormValid = address.trim() !== "" && 
                     city.trim() !== "" && 
                     country.trim() !== "" && 
                     typeField !== "" && 
                     category !== "";

  return (
    <div className="h-full overflow-auto bg-white">
      {/* Header with close button */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium text-gray-900">Add New Listing</h2>
          {isGeocoding && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Loading...</span>
            </div>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Form content */}
      <div className="px-6 py-4 space-y-8">
        {/* Property Information Section */}
        <div className="space-y-4 group">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">Property Location</h3>
            <div className="ml-2 h-px bg-gray-100 flex-1"></div>
            <MapPin className="h-4 w-4 text-blue-500 ml-2" />
          </div>
          
          <div className="bg-blue-50/30 border border-blue-100 rounded-lg p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <LocationAutofill
                value={city}
                onChange={setCity}
                placeholder="e.g., Belgrade"
                label="City *"
                type="city"
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
                onLocationSelect={handleCityLocationSelect}
              />
              <LocationAutofill
                value={country}
                onChange={setCountry}
                placeholder="e.g., Serbia"
                label="Country *"
                type="country"
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
              />
            </div>
            
            <LocationAutofill
              value={address}
              onChange={setAddress}
              placeholder="e.g., Knez Mihailova 42"
              label="Address *"
              type="address"
              className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
            />
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Postal Code</label>
              <Input
                className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm rounded-md"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="e.g., 11000"
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
            {shouldShowOccupancyStatus() && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleOccupancyStatus} 
                className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-3"
              >
                {occupancyStatus === "occupied" ? (
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
          
          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Property Type</label>
              <Select
                value={typeField}
                onValueChange={(value) => {
                  setTypeField(value);
                  setCategory("");
                  setOccupancyStatus("occupied"); // Reset occupancy when type changes
                }}
              >
                <SelectTrigger className="border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md">
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

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Category</label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={!typeField}
              >
                <SelectTrigger className="border-gray-200 bg-white h-9 focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md">
                  <SelectValue placeholder={typeField ? "Select category" : "Select type first"} />
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
          </div>
        </div>

        {/* Tenant Details Section - only show if occupied AND not hospitality/vacation rental */}
        {shouldShowTenantInfo() && (occupancyStatus === "occupied") && (
          <div className="space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">
                  Tenant Information
                </h3>
                <div className="ml-2 h-px bg-gray-100 flex-1"></div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleTenantType} 
                className="h-7 text-xs bg-white hover:bg-gray-50 border-gray-200 rounded-full px-3"
              >
                {tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
              </Button>
            </div>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
                  {tenantType === "individual" ? "Full Name" : "Company Name"}
                </label>
                <Input
                  className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="Leave empty if no tenant"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Phone</label>
                  <Input
                    className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">Email</label>
                  <Input
                    className="h-9 w-full border-gray-200 bg-white focus:ring-2 focus:ring-gray-100 focus:border-gray-300 text-sm rounded-md"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
          <Button 
            onClick={handleSave} 
            disabled={isProcessing || !isFormValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isGeocoding ? "Loading..." : "Adding listing..."}</span>
              </div>
            ) : (
              "Add listing"
            )}
          </Button>
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={isProcessing}
              className="flex-1 bg-white border-gray-200 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
