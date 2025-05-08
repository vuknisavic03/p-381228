
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar as CalendarIcon, TrendingDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function TransactionActivity() {
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
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
          <div className="flex items-center gap-2">
            {/* Calendar Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <CalendarIcon className="h-3 w-3" />
                  {date ? format(date, "MMM d, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
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
