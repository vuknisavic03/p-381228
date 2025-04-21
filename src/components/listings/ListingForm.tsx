
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Upload, User, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ListingFormProps {
  isEditing?: boolean;
  listingId?: number;
}

export function ListingForm({ isEditing = false, listingId }: ListingFormProps) {
  const [tenantType, setTenantType] = useState<"individual" | "company">("individual");
  const handleToggleTenantType = () => {
    setTenantType((prev) => (prev === "individual" ? "company" : "individual"));
  };

  const StepDot = ({ last }: { last?: boolean }) => (
    <div className="flex flex-col items-center">
      <div className="w-2 h-2 rounded-full bg-[#1EAEDB] mb-0.5" />
      {!last && <div className="flex-1 w-[2px] bg-[#E4E5EA]" />}
    </div>
  );

  const SectionHeader = ({
    children,
    action,
    last,
  }: {
    children: React.ReactNode;
    action?: React.ReactNode;
    last?: boolean;
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 mr-2">
        <StepDot last={last} />
        <span className="text-[15px] font-medium text-[#1A1A1A]">{children}</span>
      </div>
      {action && <div>{action}</div>}
    </div>
  );

  const Required = () => <span className="text-[#1EAEDB] ml-1">*</span>;

  const inputClassName = "h-11 text-sm text-[#222] bg-transparent border-0 rounded-none focus-visible:ring-0 placeholder:text-[#A0A8B5]";

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <SectionHeader>Listing details</SectionHeader>
            <div className="mt-3 mb-1 border border-[#E7E8EC] rounded-lg overflow-hidden bg-[#FAFAFB]">
              <div className="flex justify-between items-center px-4 py-3 border-b border-[#E7E8EC]">
                <span className="text-xs text-[#A0A8B5]">Listing ID</span>
                <span className="text-xs font-bold text-[#222]">#{listingId || 1}</span>
              </div>
              <div className="flex flex-col gap-[1px]">
                <div className="bg-white px-4 py-2 flex items-center">
                  <Input
                    placeholder="City"
                    className={inputClassName}
                  />
                  <Required />
                </div>
                <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                  <Input
                    placeholder="Address"
                    className={inputClassName}
                  />
                  <Required />
                </div>
                <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                  <Input
                    placeholder="Country"
                    className={inputClassName}
                  />
                </div>
                <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                  <Input
                    placeholder="Postal Code"
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              action={
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-[#F3F6F9] text-[#A0A8B5]">
                    <ChevronLeft className="w-3 h-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-[#F3F6F9] text-[#A0A8B5]">
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6 hover:bg-[#E6F2FA] text-[#1EAEDB]">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              }
            >
              Add unit details
            </SectionHeader>
            <div className="mt-2 border border-[#E7E8EC] rounded-lg bg-[#FAFAFB] flex flex-col gap-[1px] overflow-hidden">
              <div className="bg-white px-4 py-2 flex items-center">
                <Input
                  placeholder="Type"
                  className={inputClassName}
                />
                <Required />
              </div>
              <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                <Input
                  placeholder="Category"
                  className={inputClassName}
                />
                <Required />
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              action={
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1 h-7 font-medium border-[#E7E8EC] bg-[#f8f9fa] text-[#555] hover:bg-[#f1f2f6] px-3 py-0 rounded"
                  onClick={handleToggleTenantType}
                >
                  {tenantType === "individual" ? (
                    <>
                      <User className="h-3 w-3" /> Individual
                    </>
                  ) : (
                    <>
                      <Users className="h-3 w-3" /> Company
                    </>
                  )}
                </Button>
              }
            >
              Add tenant details
            </SectionHeader>
            <div className="mt-2 border border-[#E7E8EC] rounded-lg bg-[#FAFBFC] flex flex-col gap-[1px] overflow-hidden">
              {tenantType === "individual" ? (
                <>
                  <div className="bg-white px-4 py-2 flex items-center">
                    <Input
                      placeholder="Name"
                      className={inputClassName}
                    />
                    <Required />
                  </div>
                  <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                    <Input
                      placeholder="Surname"
                      className={inputClassName}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white px-4 py-2 flex items-center">
                    <Input
                      placeholder="Company Name"
                      className={inputClassName}
                    />
                    <Required />
                  </div>
                  <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                    <Input
                      placeholder="Registration Number"
                      className={inputClassName}
                    />
                  </div>
                </>
              )}
              <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                <Input
                  placeholder="Phone"
                  className={inputClassName}
                />
              </div>
              <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                <Input
                  placeholder="Email"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionHeader>Add payment details</SectionHeader>
            <div className="mt-2 border border-[#E7E8EC] rounded-lg bg-[#FAFAFB] flex flex-col gap-[1px] overflow-hidden">
              <div className="bg-white px-4 py-2 flex items-center">
                <Input
                  placeholder="Revenue"
                  className={inputClassName}
                />
              </div>
              <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                <Input
                  placeholder="Expenses"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              action={
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1 h-7 font-medium border-[#E7E8EC] bg-[#f8f9fa] text-[#555] hover:bg-[#f1f2f6] px-3 py-0 rounded"
                >
                  <Upload className="h-3 w-3" /> Upload documents
                </Button>
              }
              last
            >
              Add some additional details
            </SectionHeader>
            <div className="mt-2 border border-[#E7E8EC] rounded-lg bg-[#FAFAFB] p-3">
              <Textarea
                placeholder="Type here..."
                className="border-0 bg-white shadow-none text-sm text-[#222] px-2 py-2 resize-none min-h-[80px] focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-[#E7E8EC] bg-white">
        <Button className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white">
          {isEditing ? "Save Changes" : "Create Listing"}
        </Button>
      </div>
    </div>
  );
}
