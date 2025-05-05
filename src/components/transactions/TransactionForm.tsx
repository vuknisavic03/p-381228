
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Euro, Search, Upload } from "lucide-react";

export function TransactionForm() {
  return (
    <div className="p-7 max-w-4xl mx-auto">
      <div className="bg-white border border-[#E7E8EC] rounded-lg p-7 mb-10 shadow-sm">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-7 h-7 border border-[#E4E5EA] rounded bg-white">
              <Search className="h-4.5 w-4.5 text-gray-700" />
            </div>
            <h2 className="text-xl font-medium">Where to move this transaction?</h2>
          </div>
          
          <div className="flex gap-6">
            <div className="flex items-center border border-[#E7E8EC] rounded-md px-2.5 py-2">
              <Euro className="h-3.5 w-3.5 mr-2.5 text-gray-700" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            
            <Button className="bg-[#E7E8EB] hover:bg-gray-300 text-black text-sm font-medium py-2 px-4 rounded-md">
              Confirm
            </Button>
          </div>
        </div>
        
        <div className="ml-11 mb-5">
          <div className="border border-[#E7E8EC] rounded-lg p-2 mb-5">
            <div className="text-right text-[#9EA3AD] text-xs">*</div>
            <div className="px-3 mb-2">
              <label className="text-[#9EA3AD] text-sm font-medium">Listing</label>
            </div>
            <hr className="border-t border-[#E7E8EC]" />
            
            <div className="text-right text-[#9EA3AD] text-xs">*</div>
            <div className="px-3 mb-2">
              <label className="text-[#9EA3AD] text-sm font-medium">Category</label>
            </div>
            <hr className="border-t border-[#E7E8EC]" />
            
            <div className="text-right text-[#9EA3AD] text-xs">*</div>
            <div className="px-3">
              <label className="text-[#9EA3AD] text-sm font-medium">Relationship</label>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
              <span className="text-base font-medium">Confirm these payer details</span>
            </div>
            
            <div className="flex items-center border border-[#E7E8EC] rounded-md px-2.5 py-2">
              <Euro className="h-3.5 w-3.5 mr-2 text-gray-700" />
              <span className="text-sm font-medium">Individual</span>
            </div>
          </div>
          
          <div className="border border-[#E7E8EC] rounded-lg p-2 mb-5">
            <div className="text-right text-[#9EA3AD] text-xs">*</div>
            <div className="px-3 mb-3">
              <label className="text-[#9EA3AD] text-sm font-medium">Name</label>
            </div>
            <hr className="border-t border-[#E7E8EC]" />
            
            <div className="px-3 mb-3 mt-3">
              <label className="text-[#9EA3AD] text-sm font-medium">Phone</label>
            </div>
            <hr className="border-t border-[#E7E8EC]" />
            
            <div className="px-3 mt-3">
              <label className="text-[#9EA3AD] text-sm font-medium">Mail</label>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mb-6 mt-12">
            <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
            <span className="text-base font-medium">Confirm these transaction details</span>
          </div>
          
          <div className="border border-[#E7E8EC] rounded-lg p-2 mb-5">
            <div className="text-right text-[#9EA3AD] text-xs">*</div>
            <div className="px-3 mb-2.5">
              <label className="text-[#9EA3AD] text-sm font-medium">Amount</label>
            </div>
            <hr className="border-t border-[#E7E8EC]" />
            
            <div className="text-right text-[#9EA3AD] text-xs">*</div>
            <div className="px-3 mb-2.5 mt-2">
              <label className="text-[#9EA3AD] text-sm font-medium">Date</label>
            </div>
            <hr className="border-t border-[#E7E8EC]" />
            
            <div className="text-right text-[#9EA3AD] text-xs mt-2">*</div>
            <div className="px-3 mt-2">
              <label className="text-[#9EA3AD] text-sm font-medium">Payment</label>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-5 mt-12">
            <div className="flex items-center gap-6">
              <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
              <span className="text-base font-medium">Add some additional details</span>
            </div>
            
            <Button 
              variant="outline"
              className="border-[#E7E8EC] hover:bg-gray-50 text-sm font-medium py-2 px-2"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload documents
            </Button>
          </div>
          
          <div className="border border-[#E7E8EC] rounded-lg p-4 mb-5">
            <Textarea 
              placeholder="Type here..." 
              className="border-0 focus-visible:ring-0 p-0 placeholder:text-[#9EA3AD]"
              rows={4}
            />
          </div>
          
          <div className="flex items-center justify-between mb-5 mt-12">
            <div className="flex items-center gap-6">
              <div className="w-2 h-2 rounded-full bg-[#006FB5]"></div>
              <span className="text-base font-medium">Create a rule for next time?</span>
            </div>
            
            <div className="flex items-center gap-3.5">
              <Switch />
              <span className="text-base font-medium">No</span>
            </div>
          </div>
          
          <div className="border border-[#E7E8EC] bg-[#FAFAFC] rounded-lg p-4 ml-1 mt-6">
            <div className="text-[#9EA3AD] text-sm font-medium">Action</div>
          </div>
        </div>
      </div>
    </div>
  );
}
