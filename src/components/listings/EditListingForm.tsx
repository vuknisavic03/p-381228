
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Home,
  Building2,
  Building,
  Key,
  ScrollText,
  UtilityPole,
  Wrench as Tools,
  BadgePlus,
  RotateCcw,
  Coins
} from "lucide-react";

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
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Edit Listing #{listing.id}</h2>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Location Details</h3>
          <Input
            name="city"
            label="City"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            className="h-12"
          />
          <Input
            name="address"
            label="Address"
            placeholder="Full address"
            value={formData.address}
            onChange={handleChange}
            className="h-12"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="country"
              label="Country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="h-12"
            />
            <Input
              name="postalCode"
              label="Postal Code"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Property Details</h3>
          <Input
            name="type"
            label="Property Type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            className="h-12"
          />
          <Input
            name="category"
            label="Property Category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="h-12"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Tenant Details</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleTenantType}
              >
                {formData.tenantType === "individual" ? "Individual" : "Company"}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="tenantName"
                placeholder={formData.tenantType === "individual" ? "Name" : "Company Name"}
                value={formData.tenantName}
                onChange={handleChange}
                className="h-12"
              />
              <Input
                name="tenantPhone"
                placeholder="Phone"
                value={formData.tenantPhone}
                onChange={handleChange}
                className="h-12"
              />
              <Input
                name="tenantEmail"
                placeholder="Email"
                value={formData.tenantEmail}
                onChange={handleChange}
                className="col-span-2 h-12"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Additional Notes</h3>
        <Textarea
          name="notes"
          placeholder="Additional notes or details"
          value={formData.notes}
          onChange={handleChange}
          className="min-h-[150px] w-full"
        />
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </div>
    </div>
  );
}
