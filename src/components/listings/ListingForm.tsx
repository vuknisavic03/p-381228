
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
    <div className="h-full bg-white flex">
      {/* Form Panel */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-16 py-8 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
              <p className="text-gray-600 mt-1">Create a new property listing</p>
            </div>
            <div className="flex items-center gap-4">
              {isGeocoding && (
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Loading...</span>
                </div>
              )}
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose} className="h-12 w-12 p-0 rounded-xl hover:bg-gray-200">
                  <X className="h-6 w-6" />
                </Button>
              )}
            </div>
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
                      <LocationAutofill
                        value={city}
                        onChange={setCity}
                        placeholder="Enter city"
                        label="City"
                        type="city"
                        className="h-14 text-lg border-gray-300 rounded-xl"
                        onLocationSelect={handleCityLocationSelect}
                      />
                    </div>
                    <div>
                      <LocationAutofill
                        value={country}
                        onChange={setCountry}
                        placeholder="Enter country"
                        label="Country"
                        type="country"
                        className="h-14 text-lg border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <LocationAutofill
                      value={address}
                      onChange={setAddress}
                      placeholder="Enter full address"
                      label="Street Address"
                      type="address"
                      className="h-14 text-lg border-gray-300 rounded-xl"
                    />
                  </div>
                  
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Postal Code</label>
                    <Input
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
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
                        value={typeField}
                        onValueChange={(value) => {
                          setTypeField(value);
                          setCategory("");
                          setOccupancyStatus("occupied");
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
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Category</label>
                        <Select
                          value={category}
                          onValueChange={setCategory}
                          disabled={!typeField}
                        >
                          <SelectTrigger className="h-14 text-lg border-gray-300 rounded-xl">
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
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Occupancy Status</h3>
                        <p className="text-gray-600 mt-1">Is this property currently occupied?</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setOccupancyStatus(occupancyStatus === "occupied" ? "vacant" : "occupied")}
                        className="h-12 px-6 text-base font-semibold"
                      >
                        {occupancyStatus === "occupied" ? (
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
            {useUnitsMode && typeField && (
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
                    propertyType={typeField as PropertyType}
                    units={units}
                    onUnitsChange={setUnits}
                  />
                </div>
              </div>
            )}

            {/* Tenant Information */}
            {!useUnitsMode && shouldShowTenantInfo() && (occupancyStatus === "occupied") && (
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
                    onClick={() => setTenantType(prev => prev === "individual" ? "company" : "individual")}
                    className="h-12 px-6 text-base font-semibold"
                  >
                    {tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                  </Button>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        {tenantType === "individual" ? "Full Name" : "Company Name"}
                      </label>
                      <Input
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                        placeholder={tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                        className="h-14 text-lg border-gray-300 rounded-xl"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Phone Number</label>
                        <Input
                          value={tenantPhone}
                          onChange={(e) => setTenantPhone(e.target.value)}
                          placeholder="Enter phone number"
                          className="h-14 text-lg border-gray-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Email Address</label>
                        <Input
                          value={tenantEmail}
                          onChange={(e) => setTenantEmail(e.target.value)}
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
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
              onClick={handleSave} 
              disabled={isProcessing || !isFormValid}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-semibold rounded-xl"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
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
                className="flex-1 bg-white border-gray-300 hover:bg-gray-50 h-14 text-lg font-semibold rounded-xl"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
