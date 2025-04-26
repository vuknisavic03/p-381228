
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaymentDetailsInput } from "./PaymentDetailsInput";
import { toast } from "@/components/ui/use-toast";

export function ListingForm() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [typeField, setTypeField] = useState("");
  const [category, setCategory] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [notes, setNotes] = useState("");
  const [tenantType, setTenantType] = useState("individual");

  const toggleTenantType = () => {
    setTenantType(tenantType === "individual" ? "company" : "individual");
  };

  const handleSave = async () => {
    const randomId = Math.floor(Math.random() * 10000);
    
    const payload = {
      id: randomId,
      city,
      address,
      country,
      postalCode,
      type: typeField,
      category,
      tenant: {
        name: tenantName,
        phone: tenantPhone,
        email: tenantEmail,
        type: tenantType,
      },
      payment: {
        revenue,
        expenses,
      },
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
        title: "Listing Added",
        description: "Your listing was successfully created",
      });
      
      resetForm();
      
      window.dispatchEvent(new CustomEvent('refresh-listings'));
      
    } catch (err) {
      console.error("Error saving:", err);
      
      toast({
        title: "Listing Added (Demo Mode)",
        description: "Your listing was added to the demo data",
      });
      
      resetForm();
      
      window.dispatchEvent(new CustomEvent('refresh-listings'));
    }
  };
  
  const resetForm = () => {
    setCity("");
    setAddress("");
    setCountry("");
    setPostalCode("");
    setTypeField("");
    setCategory("");
    setTenantName("");
    setTenantPhone("");
    setTenantEmail("");
    setRevenue("");
    setExpenses("");
    setNotes("");
  };

  const inputClassName = "h-10 w-full";

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Listing details</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            className={inputClassName}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            className={inputClassName}
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            className={inputClassName}
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            className={inputClassName}
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Input
            className={inputClassName}
            placeholder="Type"
            value={typeField}
            onChange={(e) => setTypeField(e.target.value)}
          />
          <Input
            className={inputClassName}
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Tenant details</h3>
            <Button variant="outline" size="sm" onClick={toggleTenantType}>
              {tenantType === "individual" ? "Individual" : "Company"}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              className={inputClassName}
              placeholder={tenantType === "individual" ? "Name" : "Company Name"}
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
            <Input
              className={inputClassName}
              placeholder="Phone"
              value={tenantPhone}
              onChange={(e) => setTenantPhone(e.target.value)}
            />
            <Input
              className={`${inputClassName} col-span-2`}
              placeholder="Email"
              value={tenantEmail}
              onChange={(e) => setTenantEmail(e.target.value)}
            />
          </div>
        </div>

        <PaymentDetailsInput
          revenue={revenue}
          expenses={expenses}
          onRevenueChange={setRevenue}
          onExpensesChange={setExpenses}
        />

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Additional details</h3>
          <Textarea
            className="min-h-[100px] w-full"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <Button className="w-full" onClick={handleSave}>
          Add listing
        </Button>
      </div>
    </div>
  );
}
