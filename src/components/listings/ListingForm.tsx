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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ListingForm() {
  const [listingId, setListingId] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [typeField, setTypeField] = useState("");
  const [category, setCategory] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [revenue, setRevenue] = useState<number | "">("");
  const [expenses, setExpenses] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [tenantType, setTenantType] = useState("individual");
  const [revenueCategory, setRevenueCategory] = useState("");

  const toggleTenantType = () => {
    setTenantType(tenantType === "individual" ? "company" : "individual");
  };

  const handleSave = async () => {
    const payload = {
      listingId,
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
        revenue: revenue === "" ? null : revenue,
        expenses: expenses === "" ? null : expenses,
        revenueCategory,
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
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const inputClassName = "h-10 w-full";

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Listing details</h2>
        <Button onClick={handleSave} variant="outline" size="sm">
          Save
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          className={inputClassName}
          placeholder="Listing ID"
          value={listingId}
          onChange={(e) => setListingId(e.target.value)}
        />
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

        <div className="space-y-2">
          <h3 className="font-medium text-sm">Payment details</h3>
          <div className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  className={inputClassName}
                  type="number"
                  placeholder="Revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value === "" ? "" : +e.target.value)}
                />
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <div className="grid gap-2 p-2">
                  <div className="grid gap-1">
                    {[
                      { value: "rent", label: "Rent" },
                      { value: "facility", label: "Facility Fees" },
                      { value: "maintenance", label: "Maintenance Fees" },
                      { value: "optional", label: "Optional Fees" },
                      { value: "lease", label: "Lease-Related Fees" },
                      { value: "utility", label: "Utility & Service Fees" },
                      { value: "refunds", label: "Refunds" },
                      { value: "condo", label: "Condo / HOA fees" },
                      { value: "key", label: "Key & Access Fees" },
                      { value: "misc", label: "Miscellaneous Fees" },
                    ].map((item) => (
                      <div
                        key={item.value}
                        className="flex items-center px-2 py-1 cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm"
                        onClick={() => setRevenueCategory(item.value)}
                      >
                        <div className="flex-1">{item.label}</div>
                        {revenueCategory === item.value && (
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Input
              className={inputClassName}
              type="number"
              placeholder="Expenses"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value === "" ? "" : +e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Additional details</h3>
            <Button variant="outline" size="sm">
              Upload documents
            </Button>
          </div>
          <Textarea
            className="min-h-[100px] w-full"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
