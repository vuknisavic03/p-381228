
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Search, Calendar, ChevronDown, Filter, TrendingDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TransactionActivity() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');

  // Local toggle function that only affects the activity center
  const toggleTransactionType = () => {
    setTransactionType(prevType => prevType === 'revenue' ? 'expense' : 'revenue');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white p-5 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Activity</h2>
          <button 
            onClick={toggleTransactionType}
            className={`flex items-center px-3 py-1.5 rounded-full font-medium transition-colors duration-200 ${
              transactionType === 'revenue' 
                ? 'bg-gray-100 text-gray-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {transactionType === 'revenue' ? (
              <>
                <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Revenue</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Expenses</span>
              </>
            )}
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search transactions" 
              className="pl-10 bg-white border-gray-200 hover:border-gray-300 transition-colors" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-3 w-3" />
              Filters
              <ChevronDown className={`h-3 w-3 ml-1 transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <Calendar className="h-3 w-3" />
              Last 30 days
            </Button>
          </div>
        </div>
      </div>
      
      {filterOpen && (
        <div className="mx-5 mt-4 mb-2 p-5 border border-gray-100 rounded-lg bg-gray-50 space-y-4 animate-fade-in shadow-sm">
          <Select>
            <SelectTrigger className="h-10 text-sm bg-white border-gray-200">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="h-10 text-sm bg-white border-gray-200">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="card">Credit Card</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="check">Check</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="flex-1 flex flex-col items-center justify-center m-5 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-200 min-h-[400px]">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
          transactionType === 'revenue' ? 'bg-gray-100' : 'bg-gray-100'
        }`}>
          {transactionType === 'revenue' ? (
            <DollarSign className="h-8 w-8 text-gray-500" />
          ) : (
            <TrendingDown className="h-8 w-8 text-gray-500" />
          )}
        </div>
        <span className="text-gray-800 font-semibold text-lg mb-2">No {transactionType} yet</span>
        <p className="text-sm text-center text-gray-500 max-w-[280px]">
          {transactionType === 'revenue' 
            ? "Revenue transactions will appear here once they're created or imported from your connected accounts."
            : "Expense transactions will appear here once they're created or imported from your connected accounts."}
        </p>
      </div>
    </div>
  );
}
