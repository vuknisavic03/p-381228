
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Activity</h2>
          <div className="flex items-center border border-[#E7E8EC] rounded-md px-3 py-2 bg-white shadow-sm">
            <Euro className="h-4 w-4 mr-2 text-gray-700" />
            <span className="text-sm font-medium">Revenue</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search transactions" 
              className="pl-10" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-3 w-3" />
              Filters
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1"
            >
              <Calendar className="h-3 w-3" />
              Last 30 days
            </Button>
          </div>
        </div>
      </div>
      
      {filterOpen && (
        <div className="m-4 p-3 border border-[#E7E8EC] rounded-md bg-[#F8F9FB] space-y-3">
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
      
      <div className="flex-1 flex flex-col items-center justify-center m-4 p-6 bg-[#F8F9FB] rounded-lg border border-dashed border-[#E7E8EC]">
        <div className="w-14 h-14 rounded-full bg-[#EBF5FF] flex items-center justify-center mb-4">
          <Euro className="h-7 w-7 text-[#006FB5]" />
        </div>
        <span className="text-[#727980] font-medium text-sm mb-2">No activity yet</span>
        <p className="text-xs text-center text-[#9EA3AD] max-w-[220px]">
          Transactions will appear here once they're created or imported from your connected accounts.
        </p>
      </div>
    </div>
  );
}
