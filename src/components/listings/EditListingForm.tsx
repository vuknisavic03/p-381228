
import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

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
    notes: listing.notes || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
        }
      };

      // Try to update via API first
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
      
      // Show demo mode notification
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
        }
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-lg font-semibold">Edit listing #{listing.id}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <Input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <Input
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <Input
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
          />
          <Input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <h3 className="font-medium text-sm">Tenant details</h3>
            <div className="space-y-4">
              <Input
                name="tenantName"
                placeholder="Tenant Name"
                value={formData.tenantName}
                onChange={handleChange}
              />
              <Input
                name="tenantPhone"
                placeholder="Phone"
                value={formData.tenantPhone}
                onChange={handleChange}
              />
              <Input
                name="tenantEmail"
                placeholder="Email"
                value={formData.tenantEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm">Additional details</h3>
            <Textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="border-t p-6">
        <Button className="w-full" onClick={handleSubmit}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
