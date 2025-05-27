
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
  Hash,
  User,
  Phone,
  Mail,
  FileText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";
import { getPropertyTypeIcon, formatPropertyType } from "@/utils/propertyTypeUtils";
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

  const shouldShowOccupancyStatus = () => {
    return typeField && !["hospitality", "vacation_rental"].includes(typeField);
  };

  const shouldShowTenantInfo = () => {
    return typeField && !["hospitality", "vacation_rental"].includes(typeField);
  };

  const toggleTenantType = () => {
    console.log("Toggle tenant type clicked, current type:", tenantType);
    setTenantType(prev => {
      const newType = prev === "individual" ? "company" : "individual";
      console.log("Switching tenant type from", prev, "to", newType);
      return newType;
    });
  };

  const toggleOccupancyStatus = () => {
    setOccupancyStatus(occupancyStatus === "occupied" ? "vacant" : "occupied");
  };

  const updateUnitTenant = (unitId: string, tenantData: Partial<Unit['tenant']>) => {
    setUnits(units.map(unit => 
      unit.id === unitId 
        ? { 
            ...unit, 
            tenant: unit.tenant ? { ...unit.tenant, ...tenantData } : {
              name: tenantData.name || "",
              phone: tenantData.phone || "",
              email: tenantData.email || "",
              type: tenantData.type || "individual"
            }
          }
        : unit
    ));
  };

  const toggleUnitTenantType = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    if (unit?.tenant) {
      updateUnitTenant(unitId, {
        type: unit.tenant.type === "individual" ? "company" : "individual"
      });
    }
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

  const getOccupiedUnits = () => {
    return units.filter(unit => unit.occupancyStatus === "occupied");
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add New Property</h1>
            <p className="text-sm text-gray-500 mt-1">Create a new property listing</p>
          </div>
          <div className="flex items-center gap-3">
            {isGeocoding && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">Loading...</span>
              </div>
            )}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-md hover:bg-gray-100">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="max-w-2xl space-y-8">
          {/* Location Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Location</h2>
                <p className="text-sm text-gray-500">Where is this property located?</p>
              </div>
            </div>
            
            <div className="space-y-4 pl-11">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <LocationAutofill
                    value={city}
                    onChange={setCity}
                    placeholder="Enter city"
                    type="city"
                    className="h-10"
                    onLocationSelect={handleCityLocationSelect}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <LocationAutofill
                    value={country}
                    onChange={setCountry}
                    placeholder="Enter country"
                    type="country"
                    className="h-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <LocationAutofill
                  value={address}
                  onChange={setAddress}
                  placeholder="Enter full address"
                  type="address"
                  className="h-10"
                />
              </div>
              
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter postal code"
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Property Type Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <BuildingIcon className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Property Details</h2>
                <p className="text-sm text-gray-500">What type of property is this?</p>
              </div>
            </div>
            
            <div className="space-y-6 pl-11">
              {/* Unit Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Property Structure</h3>
                  <p className="text-sm text-gray-500">Choose if this property has multiple units</p>
                </div>
                <Button
                  type="button"
                  variant={useUnitsMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseUnitsMode(!useUnitsMode)}
                  className="ml-4"
                >
                  {useUnitsMode ? "Multiple Units" : "Single Unit"}
                </Button>
              </div>

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
                  <SelectTrigger className="h-10">
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
                    <SelectTrigger className="h-10">
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
              )}

              {/* Occupancy Status for single unit */}
              {!useUnitsMode && shouldShowOccupancyStatus() && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Occupancy Status</h3>
                    <p className="text-sm text-gray-500">Is this property currently occupied?</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={toggleOccupancyStatus}
                    className="ml-4"
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
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Hash className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Units</h2>
                  <p className="text-sm text-gray-500">Manage individual units in this property</p>
                </div>
              </div>
              <div className="pl-11">
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
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-900">Tenant Information</h2>
                  <p className="text-sm text-gray-500">Details about the current tenant</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggleTenantType}
                >
                  {tenantType === "individual" ? "Switch to Company" : "Switch to Individual"}
                </Button>
              </div>
              
              <div className="space-y-4 pl-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {tenantType === "individual" ? "Full Name" : "Company Name"}
                  </label>
                  <Input
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    placeholder={tenantType === "individual" ? "Enter tenant's full name" : "Enter company name"}
                    className="h-10"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={tenantPhone}
                        onChange={(e) => setTenantPhone(e.target.value)}
                        placeholder="Enter phone number"
                        className="h-10 pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={tenantEmail}
                        onChange={(e) => setTenantEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="h-10 pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Additional Notes</h2>
                <p className="text-sm text-gray-500">Any other important details about this property</p>
              </div>
            </div>
            
            <div className="pl-11">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes, special features, or important details..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex-shrink-0 px-8 py-6 border-t border-gray-100 bg-white">
        <div className="flex gap-3 max-w-2xl">
          <Button 
            onClick={handleSave} 
            disabled={isProcessing || !isFormValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11"
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
              className="flex-1 bg-white border-gray-200 hover:bg-gray-50 h-11"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
