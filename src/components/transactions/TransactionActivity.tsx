
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Euro, Search, Calendar, ChevronDown, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TransactionActivity() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white p-4 border-b border-[#EBECED]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-[#1A1F2C]">Activity</h2>
          <div className="flex items-center px-3 py-2 rounded-full bg-[#F5EFFE] text-[#8B5CF6]">
            <Euro className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Revenue</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search transactions" 
              className="pl-10 bg-[#F8FAFF] border-[#E7E8EC]" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1 border-[#E7E8EC] bg-white hover:border-[#D6BCFA] hover:bg-[#F5EFFE]"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-3 w-3" />
              Filters
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1 border-[#E7E8EC] bg-white hover:border-[#D6BCFA] hover:bg-[#F5EFFE]"
            >
              <Calendar className="h-3 w-3" />
              Last 30 days
            </Button>
          </div>
        </div>
      </div>
      
      {filterOpen && (
        <div className="mx-4 mt-4 mb-2 p-4 border border-[#E7E8EC] rounded-lg bg-[#F8F9FB] space-y-3 animate-fade-in shadow-sm">
          <Select>
            <SelectTrigger className="h-10 text-sm">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="h-10 text-sm">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="card">Credit Card</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="flex-1 flex flex-col items-center justify-center m-4 p-6 bg-[#F8F9FB] rounded-lg border border-dashed border-[#E7E8EC] min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-[#F5EFFE] flex items-center justify-center mb-4">
          <Euro className="h-8 w-8 text-[#8B5CF6]" />
        </div>
        <span className="text-[#1A1F2C] font-semibold text-base mb-2">No activity yet</span>
        <p className="text-sm text-center text-[#8E9196] max-w-[240px]">
          Transactions will appear here once they're created or imported from your connected accounts.
        </p>
      </div>
    </div>
  );
}
