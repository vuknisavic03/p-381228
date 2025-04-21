import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Flag, SaveIcon, Upload, Euro } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ListingForm() {
  return (
    <ScrollArea className="h-full">
      <div className="px-3 py-2 h-full bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-1 bg-[#1A1A1A] rounded-full" />
            <h2 className="text-base font-semibold text-black">Listing details</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-semibold text-black border-[#E7E8EC] hover:bg-gray-50 h-7 px-4 py-1 rounded"
          >
            <SaveIcon className="h-3 w-3 mr-1" />
            Save
          </Button>
        </div>

        <div className="space-y-3">
          <div className="border border-[#E7E8EC] rounded-md overflow-hidden">
            <div className="flex justify-between px-3 py-2 bg-gray-50">
              <span className="text-xs text-[#9EA3AD]">Listing ID</span>
              <span className="text-xs font-bold">#1</span>
            </div>
            
            <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
              <Building className="h-3.5 w-3.5 text-[#9EA3AD] mr-2" />
              <Input 
                placeholder="City" 
                className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
              />
            </div>
            
            <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
              <MapPin className="h-3.5 w-3.5 text-[#9EA3AD] mr-2" />
              <Input 
                placeholder="Address" 
                className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
              />
            </div>
            
            <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
              <Flag className="h-3.5 w-3.5 text-[#9EA3AD] mr-2" />
              <Input 
                placeholder="Country" 
                className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
              />
            </div>
            
            <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
              <MapPin className="h-3.5 w-3.5 text-[#9EA3AD] mr-2" />
              <Input 
                placeholder="Postal Code" 
                className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
              />
            </div>
          </div>

          {/* Unit Details Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
              <span className="text-xs font-medium">Unit details</span>
            </div>
            <div className="border border-[#E7E8EC] rounded-md overflow-hidden">
              <div className="flex items-center px-3 py-2">
                <Input 
                  placeholder="Type" 
                  className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
                />
              </div>
              <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
                <Input 
                  placeholder="Category" 
                  className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
                />
              </div>
            </div>
          </div>

          {/* Tenant Details Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
                <span className="text-xs font-medium">Tenant details</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1 h-6 font-medium border-[#E7E8EC] hover:bg-gray-50 px-2 py-0 rounded"
              >
                <Euro className="h-3 w-3" /> Individual
              </Button>
            </div>
            <div className="border border-[#E7E8EC] rounded-md overflow-hidden">
              <div className="flex items-center px-3 py-2">
                <Input 
                  placeholder="Name" 
                  className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
                />
              </div>
              <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
                <Input 
                  placeholder="Phone" 
                  className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
                />
              </div>
              <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
                <Input 
                  placeholder="Email" 
                  className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
                />
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
              <span className="text-xs font-medium">Payment details</span>
            </div>
            <div className="border border-[#E7E8EC] rounded-md overflow-hidden">
              <div className="flex items-center px-3 py-2">
                <Input 
                  placeholder="Revenue" 
                  className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
                />
              </div>
              <div className="flex items-center border-t border-[#E7E8EC] px-3 py-2">
                <Input 
                  placeholder="Expenses" 
                  className="border-0 shadow-none p-0 h-auto text-xs focus-visible:ring-0" 
                />
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="space-y-2 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#006FB5] rounded-full" />
                <span className="text-xs font-medium">Additional details</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1 h-6 font-medium border-[#E7E8EC] hover:bg-gray-50 px-2 py-0 rounded"
              >
                <Upload className="h-3 w-3" /> Upload docs
              </Button>
            </div>
            <div className="border border-[#E7E8EC] rounded-md p-2">
              <Input 
                placeholder="Type here..." 
                className="border-0 shadow-none px-0 text-xs focus-visible:ring-0" 
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
