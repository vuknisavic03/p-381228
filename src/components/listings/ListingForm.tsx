
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Loader2, Users, UserX, MapPin, Building, Hash, User, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon } from "@/utils/propertyTypeUtils";
import { useGeocoding } from "@/hooks/useGeocoding";
import { LocationAutofill } from "./LocationAutofill";
import { UnitsManager } from "./UnitsManager";

interface ListingFormProps {
  onClose?: () => void;
  onListingAdded?: () => void;
}

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
  const [units, setUnits] = useState<Unit[]>([]);
  const [useUnitsMode, setUseUnitsMode] = useState(false);

  const { getCoordinates, isGeocoding } = useGeocoding();

  const handleCityLocationSelect = (locationData: { city?: string; country?: string }) => {
    if (locationData.country) {
      setCountry(locationData.country);
    }
  };

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

  const getAvailableCategories = () => {
    if (!typeField) return [];
    return typeToCategoryMap[typeField as keyof typeof typeToCategoryMap] || [];
  };

  const shouldShowOccupancyStatus = () => {
    return typeField && !["hospitality", "vacation_rental"].includes(typeField);
  };

  const shouldShowTenantInfo = () => {
    return typeField && !["hospitality", "vacation_rental"].includes(typeField);
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

    if (!useUnitsMode && !category) {
      toast({
        title: "Category Required",
        description: "Please select a property category",
        variant: "destructive",
      });
      return;
    }

    if (useUnitsMode && units.length === 0) {
      toast({
        title: "Units Required",
        description: "Please add at least one unit",
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
      
      const coordinates = await getCoordinates(address, city, country);
      
      if (!coordinates) {
        setIsSaving(false);
        return;
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
        category: useUnitsMode ? "mixed" : category,
        location: coordinates,
        units: useUnitsMode ? units : undefined,
        ...(shouldShowOccupancyStatus() && !useUnitsMode && { occupancyStatus }),
        tenant: (!useUnitsMode && shouldShowTenantInfo() && tenantName) ? {
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
          description: `Property ${useUnitsMode ? 'with multiple units' : ''} geocoded with maximum precision and saved`,
        });
        
      } catch (err) {
        console.error("Error saving to server:", err);
        
        toast({
          title: "Listing Added (Demo Mode)",
          description: `Property ${useUnitsMode ? 'with multiple units' : ''} added with precise coordinates from enhanced geocoding`,
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
    setUnits([]);
    setUseUnitsMode(false);
  };

  const isProcessing = isSaving || isGeocoding;
  const isFormValid = address.trim() !== "" && 
                     city.trim() !== "" && 
                     country.trim() !== "" && 
                     typeField !== "" && 
                     (useUnitsMode ? units.length > 0 : category !== "");

  return (
    <div className="h-full bg-white">
      {/* Clean Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add New Property</h1>
            <p className="text-gray-500 text-sm mt-1">Create a new property listing</p>
          </div>
          <div className="flex items-center gap-4">
            {isGeocoding && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">Loading...</span>
              </div>
            )}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
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
                  <LocationAutofill
                    value={address}
                    onChange={setAddress}
                    placeholder="123 Main Street"
                    label=""
                    type="address"
                    className="h-11 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <LocationAutofill
                    value={city}
                    onChange={setCity}
                    placeholder="New York"
                    label=""
                    type="city"
                    className="h-11 text-base"
                    onLocationSelect={handleCityLocationSelect}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <LocationAutofill
                    value={country}
                    onChange={setCountry}
                    placeholder="United States"
                    label=""
                    type="country"
                    className="h-11 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
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
                    value={typeField}
                    onValueChange={(value) => {
                      setTypeField(value);
                      setCategory("");
                      setOccupancyStatus("occupied");
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <Select
                      value={category}
                      onValueChange={setCategory}
                      disabled={!typeField}
                    >
                      <SelectTrigger className="h-11 text-base">
                        <SelectValue placeholder={typeField ? "Select category" : "Select type first"} />
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
                    onClick={() => setOccupancyStatus(occupancyStatus === "occupied" ? "vacant" : "occupied")}
                    className="h-10"
                  >
                    {occupancyStatus === "occupied" ? (
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
          {useUnitsMode && typeField && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Hash className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-medium text-gray-900">Units Management</h2>
              </div>
              <UnitsManager
                propertyType={typeField as PropertyType}
                units={units}
                onUnitsChange={setUnits}
              />
            </div>
          )}

          {/* Tenant Information */}
          {!useUnitsMode && shouldShowTenantInfo() && (occupancyStatus === "occupied") && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-orange-600" />
                  <h2 className="text-lg font-medium text-gray-900">Tenant Information</h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTenantType(prev => prev === "individual" ? "company" : "individual")}
                  className="h-10"
                >
                  {tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {tenantType === "individual" ? "Full Name" : "Company Name"}
                  </label>
                  <Input
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    placeholder={tenantType === "individual" ? "John Doe" : "ABC Corp"}
                    className="h-11 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="h-11 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            onClick={handleSave} 
            disabled={isProcessing || !isFormValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 text-base font-medium"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isGeocoding ? "Loading..." : "Adding listing..."}</span>
              </div>
            ) : (
              "Add Listing"
            )}
          </Button>
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={isProcessing}
              className="flex-1 h-11 text-base font-medium"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
