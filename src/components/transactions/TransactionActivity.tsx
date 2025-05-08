
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Search, Calendar as CalendarIcon, ChevronDown, Filter, TrendingDown, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

// Mock transaction categories and payment methods for filter options
const transactionCategories = {
  revenue: ["Rent", "Deposit", "Fee", "Other Income"],
  expense: ["Maintenance", "Utilities", "Insurance", "Tax", "Other Expense"]
};

const paymentMethods = ["Credit Card", "Bank Transfer", "Cash", "Check", "Cryptocurrency"];

export function TransactionActivity() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<string>("last30");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[];
    paymentMethods: string[];
    dateRange: string;
  }>({
    categories: [],
    paymentMethods: [],
    dateRange: "last30"
  });
  
  // Date range options
  const dateRangeOptions = {
    today: "Today",
    yesterday: "Yesterday",
    last7: "Last 7 days",
    last30: "Last 30 days",
    thisMonth: "This month",
    lastMonth: "Last month", 
    custom: "Custom"
  };

  // Local toggle function that only affects the activity center
  const toggleTransactionType = () => {
    setTransactionType(prevType => prevType === 'revenue' ? 'expense' : 'revenue');
    setSelectedCategory(undefined); // Reset category when type changes
    setActiveFilters(prev => ({ ...prev, categories: [] }));
  };

  // Format the displayed date range
  const getDateRangeDisplay = () => {
    switch(dateRange) {
      case "custom":
        return date ? format(date, "MMM d, yyyy") : "Select date";
      default:
        return dateRangeOptions[dateRange as keyof typeof dateRangeOptions];
    }
  };

  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setActiveFilters(prev => {
      const newCategories = prev.categories.includes(category) 
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  // Toggle payment method filter
  const togglePaymentMethodFilter = (method: string) => {
    setActiveFilters(prev => {
      const newMethods = prev.paymentMethods.includes(method) 
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method];
      return { ...prev, paymentMethods: newMethods };
    });
  };

  // Set date range filter
  const setDateRangeFilter = (range: string) => {
    setDateRange(range);
    setActiveFilters(prev => ({ ...prev, dateRange: range }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      paymentMethods: [],
      dateRange: "last30"
    });
    setDateRange("last30");
    setDate(new Date());
  };

  // Get total active filter count
  const getFilterCount = () => {
    return activeFilters.categories.length + activeFilters.paymentMethods.length + (activeFilters.dateRange !== "last30" ? 1 : 0);
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
            {/* Main Filter Button with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="relative text-xs flex items-center gap-1 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-3 w-3" />
                  Filters
                  {getFilterCount() > 0 && (
                    <Badge className="h-4 min-w-4 px-1 ml-1 bg-gray-900 text-white text-[10px] flex items-center justify-center rounded-full">
                      {getFilterCount()}
                    </Badge>
                  )}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-2 bg-white">
                <DropdownMenuLabel>Filter Transactions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Categories */}
                <div className="px-2 py-1.5">
                  <h4 className="text-xs font-semibold text-gray-700 mb-1.5">Categories</h4>
                  <div className="space-y-1">
                    {transactionType === 'revenue' 
                      ? transactionCategories.revenue.map(cat => (
                          <DropdownMenuCheckboxItem 
                            key={cat.toLowerCase()} 
                            checked={activeFilters.categories.includes(cat.toLowerCase())}
                            onSelect={(e) => {
                              e.preventDefault();
                              toggleCategoryFilter(cat.toLowerCase());
                            }}
                          >
                            {cat}
                          </DropdownMenuCheckboxItem>
                        ))
                      : transactionCategories.expense.map(cat => (
                          <DropdownMenuCheckboxItem 
                            key={cat.toLowerCase()} 
                            checked={activeFilters.categories.includes(cat.toLowerCase())}
                            onSelect={(e) => {
                              e.preventDefault();
                              toggleCategoryFilter(cat.toLowerCase());
                            }}
                          >
                            {cat}
                          </DropdownMenuCheckboxItem>
                        ))
                    }
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                
                {/* Payment Methods */}
                <div className="px-2 py-1.5">
                  <h4 className="text-xs font-semibold text-gray-700 mb-1.5">Payment Methods</h4>
                  <div className="space-y-1">
                    {paymentMethods.map(method => (
                      <DropdownMenuCheckboxItem 
                        key={method.toLowerCase().replace(/\s/g, '-')} 
                        checked={activeFilters.paymentMethods.includes(method.toLowerCase().replace(/\s/g, '-'))}
                        onSelect={(e) => {
                          e.preventDefault();
                          togglePaymentMethodFilter(method.toLowerCase().replace(/\s/g, '-'));
                        }}
                      >
                        {method}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                
                {/* Date Range */}
                <div className="px-2 py-1.5">
                  <h4 className="text-xs font-semibold text-gray-700 mb-1.5">Time Period</h4>
                  <div className="space-y-1">
                    {Object.entries(dateRangeOptions).map(([key, label]) => (
                      <DropdownMenuCheckboxItem 
                        key={key}
                        checked={dateRange === key}
                        onSelect={(e) => {
                          e.preventDefault();
                          setDateRangeFilter(key);
                        }}
                      >
                        {label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                </div>
                
                {/* Custom Date Picker */}
                {dateRange === "custom" && (
                  <div className="p-2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                      }}
                      initialFocus
                      className="p-3 w-full pointer-events-auto border rounded-md"
                    />
                  </div>
                )}
                
                <DropdownMenuSeparator />
                
                {/* Action Buttons */}
                <div className="px-2 py-1.5 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-xs bg-gray-900 text-white hover:bg-gray-800"
                    onClick={() => setFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Active Filter Badges */}
            <div className="flex flex-wrap gap-1">
              {activeFilters.categories.map(category => (
                <Badge 
                  key={`category-${category}`} 
                  variant="outline"
                  className="bg-gray-50 text-gray-800 border-gray-200 text-xs py-0 px-2 h-6 flex items-center gap-1"
                >
                  {category}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleCategoryFilter(category)} 
                  />
                </Badge>
              ))}
              
              {activeFilters.paymentMethods.map(method => (
                <Badge 
                  key={`method-${method}`} 
                  variant="outline"
                  className="bg-gray-50 text-gray-800 border-gray-200 text-xs py-0 px-2 h-6 flex items-center gap-1"
                >
                  {method.replace(/-/g, ' ')}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => togglePaymentMethodFilter(method)} 
                  />
                </Badge>
              ))}
              
              {activeFilters.dateRange !== "last30" && (
                <Badge 
                  variant="outline"
                  className="bg-gray-50 text-gray-800 border-gray-200 text-xs py-0 px-2 h-6 flex items-center gap-1"
                >
                  {dateRange === "custom" ? format(date || new Date(), "MMM d, yyyy") : dateRangeOptions[dateRange as keyof typeof dateRangeOptions]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => {
                      setDateRangeFilter("last30");
                    }} 
                  />
                </Badge>
              )}
            </div>
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
