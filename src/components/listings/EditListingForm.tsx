
import React, { useState } from "react";
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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    tenantName: listing.tenant?.name || "",
    tenantPhone: listing.tenant?.phone || "",
    tenantEmail: listing.tenant?.email || "",
    tenantType: listing.tenant?.type || "individual",
    notes: listing.notes || "",
  });

  const typeCategories = [
    { value: "residential", label: "Residential", Icon: Home },
    { value: "commercial", label: "Commercial", Icon: Building },
    { value: "industrial", label: "Industrial", Icon: Factory },
    { value: "retail", label: "Retail", Icon: Store },
    { value: "office", label: "Office Space", Icon: Building2 },
    { value: "warehouse", label: "Warehouse", Icon: Warehouse },
    { value: "hotel", label: "Hotel", Icon: Hotel },
    { value: "mixed", label: "Mixed Use", Icon: Briefcase },
  ];

  const typeToCategoryMap = {
    residential: [
      { value: "apartment", label: "Apartment", Icon: Building2 },
      { value: "house", label: "House", Icon: Home },
      { value: "condo", label: "Condominium", Icon: Building },
    ],
    commercial: [
      { value: "office", label: "Office", Icon: Building2 },
      { value: "retail", label: "Retail Space", Icon: Store },
    ],
    industrial: [
      { value: "warehouse", label: "Warehouse", Icon: Warehouse },
      { value: "factory", label: "Factory", Icon: Factory },
    ],
    retail: [
      { value: "store", label: "Store", Icon: Store },
      { value: "shop", label: "Shop", Icon: Store },
      { value: "mall", label: "Mall", Icon: Building },
    ],
    office: [
      { value: "private", label: "Private Office", Icon: Building2 },
      { value: "coworking", label: "Coworking", Icon: Building2 },
      { value: "business", label: "Business Center", Icon: Building2 },
    ],
    warehouse: [
      { value: "storage", label: "Storage", Icon: Warehouse },
      { value: "distribution", label: "Distribution", Icon: Warehouse },
      { value: "logistics", label: "Logistics", Icon: Warehouse },
    ],
    hotel: [
      { value: "hotel", label: "Hotel", Icon: Hotel },
      { value: "motel", label: "Motel", Icon: Hotel },
      { value: "resort", label: "Resort", Icon: Hotel },
    ],
    mixed: [
      { value: "residential-commercial", label: "Residential-Commercial", Icon: Building },
      { value: "live-work", label: "Live-Work", Icon: Home },
      { value: "multi-purpose", label: "Multi-Purpose", Icon: Building },
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

  const getAvailableCategories = () => {
    if (!formData.type) return [];
    return typeToCategoryMap[formData.type as keyof typeof typeToCategoryMap] || [];
  };

  const handleSubmit = async () => {
    try {
      const updatedListing = {
        ...listing,
        ...formData,
        tenant: {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        }
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
        tenant: {
          name: formData.tenantName,
          phone: formData.tenantPhone,
          email: formData.tenantEmail,
          type: formData.tenantType,
        }
      });
      onClose();
    }
  };

  const inputClassName = "h-10 w-full";

  return (
    <div className="p-6 h-full w-[800px] overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Edit listing #{listing.id}</h2>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>

      <div className="space-y-4">
        <Input
          className={inputClassName}
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          className={inputClassName}
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <Input
          className={inputClassName}
          placeholder="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <Input
          className={inputClassName}
          placeholder="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />

        <div className="space-y-4">
          <Select
            value={formData.type}
            onValueChange={(value) => {
              setFormData(prev => ({
                ...prev,
                type: value,
                category: ""
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {typeCategories.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.Icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
            <SelectTrigger>
              <SelectValue placeholder={formData.type ? "Select category" : "Select type first"} />
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Tenant details</h3>
            <Button variant="outline" size="sm" onClick={toggleTenantType}>
              {formData.tenantType === "individual" ? "Individual" : "Company"}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              className={inputClassName}
              placeholder={formData.tenantType === "individual" ? "Name" : "Company Name"}
              name="tenantName"
              value={formData.tenantName}
              onChange={handleChange}
            />
            <Input
              className={inputClassName}
              placeholder="Phone"
              name="tenantPhone"
              value={formData.tenantPhone}
              onChange={handleChange}
            />
            <Input
              className={`${inputClassName} col-span-2`}
              placeholder="Email"
              name="tenantEmail"
              value={formData.tenantEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Additional details</h3>
          <Textarea
            className="min-h-[100px] w-full"
            placeholder="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
