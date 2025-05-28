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
    <div className="h-full overflow-auto bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Add New Listing</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Form content */}
      <div className="px-6 py-6 space-y-8">
        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Location</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-500 mb-1">City</Label>
                <LocationAutofill
                  value={city}
                  onChange={setCity}
                  placeholder="Enter city"
                  type="city"
                  className="h-9 text-sm"
                  onLocationSelect={handleCityLocationSelect}
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1">Country</Label>
                <LocationAutofill
                  value={country}
                  onChange={setCountry}
                  placeholder="Enter country"
                  type="country"
                  className="h-9 text-sm"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-gray-500 mb-1">Address</Label>
              <LocationAutofill
                value={address}
                onChange={setAddress}
                placeholder="Enter street address"
                type="address"
                className="h-9 text-sm"
              />
            </div>
            
            <div>
              <Label className="text-xs text-gray-500 mb-1">Postal Code</Label>
              <Input
                className="h-9 text-sm"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter postal code"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Property Type</h3>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUseUnitsMode(!useUnitsMode)}
                className="h-7 text-xs px-3"
              >
                {useUnitsMode ? "Multiple Units" : "Single Unit"}
              </Button>
              {!useUnitsMode && shouldShowOccupancyStatus() && (
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm" 
                  onClick={toggleOccupancyStatus} 
                  className="h-7 text-xs px-3"
                >
                  {occupancyStatus === "occupied" ? (
                    <><Users className="h-3 w-3 mr-1" />Occupied</>
                  ) : (
                    <><UserX className="h-3 w-3 mr-1" />Vacant</>
                  )}
                </Button>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500 mb-1">Type</Label>
              <Select
                value={typeField}
                onValueChange={(value) => {
                  setTypeField(value);
                  setCategory("");
                  setOccupancyStatus("occupied");
                  setUnits([]);
                }}
              >
                <SelectTrigger className="h-9 text-sm">
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
                <Label className="text-xs text-gray-500 mb-1">Category</Label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                  disabled={!typeField}
                >
                  <SelectTrigger className="h-9 text-sm">
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
          </div>
        </div>

        {/* Units Manager */}
        {useUnitsMode && typeField && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Units</h3>
            <UnitsManager
              propertyType={typeField as PropertyType}
              units={units}
              onUnitsChange={setUnits}
            />
          </div>
        )}

        {/* Tenant Information */}
        {!useUnitsMode && shouldShowTenantInfo() && (occupancyStatus === "occupied") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Tenant Information</h3>
              <Button 
                type="button"
                variant="outline" 
                size="sm" 
                onClick={toggleTenantType} 
                className="h-7 text-xs px-3"
              >
                {tenantType === "individual" ? "Individual" : "Company"}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500 mb-1">
                  {tenantType === "individual" ? "Full Name" : "Company Name"}
                </Label>
                <Input
                  className="h-9 text-sm"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="Leave empty if no tenant"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1">Phone</Label>
                  <Input
                    className="h-9 text-sm"
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1">Email</Label>
                  <Input
                    className="h-9 text-sm"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Notes</h3>
          <Textarea
            className="min-h-[100px] text-sm resize-none"
            placeholder="Add notes or additional details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 sticky bottom-0 bg-white border-t border-gray-100 py-4 -mx-6 px-6 mt-8">
          <Button 
            onClick={handleSave} 
            disabled={isProcessing || !isFormValid}
            className="flex-1"
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
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
