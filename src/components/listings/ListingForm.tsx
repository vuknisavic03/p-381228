
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Upload, User, Users, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function ListingForm() {
  // Helper for rendering the blue dot/timeline part for each section
  const StepDot = ({ last }: { last?: boolean }) => (
    <div className="flex flex-col items-center">
      <div className="w-2 h-2 rounded-full bg-[#1EAEDB] mb-0.5" />
      {!last && <div className="flex-1 w-[2px] bg-[#E4E5EA]" />}
    </div>
  );

  // Render a section header with dot and title
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

  // A simple required star
  const Required = () => <span className="text-[#1EAEDB] ml-1">*</span>;

  // --- NEW (toggle for Individual/Company) ---
  const [tenantType, setTenantType] = React.useState<"individual" | "company">("individual");
  const handleToggleTenantType = () => {
    setTenantType((prev) => (prev === "individual" ? "company" : "individual"));
  };

  // -- ADJUST container to fit height without scrolling --
  return (
    <div className="flex flex-col h-full w-full px-4 py-4 bg-white rounded-2xl shadow-sm border border-[#edeefa]">
      {/* Listing details top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center bg-[#F3F6F9] shadow-sm rounded w-7 h-7"><span className="w-2 h-2 bg-[#1EAEDB] rounded-full" /></span>
          <h2 className="text-lg font-semibold text-[#222]">Listing details</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs font-semibold text-[#403E43] border-[#edeefa] bg-[#f8f9fa] hover:bg-[#f5f6f7] h-8 px-6 rounded"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add listing
        </Button>
      </div>

      {/* Timeline/content - We'll use overflow-y-auto only if content is too long */}
      <div className="flex-1 flex flex-col gap-8 min-h-0 overflow-y-auto">
        {/* Step 1 - Listing Info */}
        <div>
          <SectionHeader>Listing details</SectionHeader>
          <div className="mt-3 mb-1 border border-[#E7E8EC] rounded-lg overflow-hidden bg-[#FAFAFB]">
            <div className="flex justify-between items-center px-4 py-2 border-b border-[#E7E8EC]">
              <span className="text-xs text-[#A0A8B5]">Listing ID</span>
              <span className="text-xs font-bold text-[#222]">#1</span>
            </div>
            <div className="flex flex-col gap-[1px]">
              <div className="bg-white px-4 py-2 flex items-center">
                <Input
                  placeholder="City"
                  className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
                />
                <Required />
              </div>
              <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                <Input
                  placeholder="Address"
                  className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
                />
                <Required />
              </div>
              <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                {/* Remove black border specifically for Country input */}
                <Input
                  placeholder="Country"
                  className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1 focus:ring-0 focus-visible:ring-0"
                />
              </div>
              <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
                <Input
                  placeholder="Postal Code"
                  className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 - Unit details */}
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
                className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
              />
              <Required />
            </div>
            <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
              <Input
                placeholder="Category"
                className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
              />
              <Required />
            </div>
          </div>
        </div>

        {/* Step 3 - Tenant details */}
        <div>
          <SectionHeader
            action={
              <Button
                variant="outline"
                size="sm"
                className={`text-xs gap-1 h-7 font-medium border-[#E7E8EC] bg-[#f8f9fa] text-[#555] hover:bg-[#f1f2f6] px-3 py-0 rounded`}
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
          <div className="mt-2 border border-[#E7E8EC] rounded-lg bg-[#FAFAFB] flex flex-col gap-[1px] overflow-hidden">
            <div className="bg-white px-4 py-2 flex items-center">
              <Input
                placeholder={tenantType === "individual" ? "Company" : "Company"}
                className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
              />
              <Required />
            </div>
            <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
              <Input
                placeholder="Phone"
                className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
              />
            </div>
            <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
              <Input
                placeholder="Mail"
                className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
              />
            </div>
          </div>
        </div>

        {/* Step 4 - Payment details */}
        <div>
          <SectionHeader>Add payment details</SectionHeader>
          <div className="mt-2 border border-[#E7E8EC] rounded-lg bg-[#FAFAFB] flex flex-col gap-[1px] overflow-hidden">
            <div className="bg-white px-4 py-2 flex items-center">
              <Input
                placeholder="Revenue"
                className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
              />
            </div>
            <div className="bg-white px-4 py-2 flex items-center border-t border-[#F4F4F8]">
              <Input
                placeholder="Expenses"
                className="border-0 rounded-none text-sm text-[#222] placeholder-[#A0A8B5] p-0 h-auto bg-transparent flex-1"
              />
            </div>
          </div>
        </div>

        {/* Step 5 - Additional details */}
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
  );
}
