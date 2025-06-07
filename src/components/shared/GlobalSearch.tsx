
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Search, Building, Receipt, User, MapPin, Calendar, DollarSign, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalSearchService, GlobalSearchResult } from "@/services/globalSearchService";

interface GlobalSearchProps {
  properties: any[];
  transactions: any[];
  tenants?: any[];
  onResultSelect?: (result: GlobalSearchResult) => void;
  placeholder?: string;
  className?: string;
  showQuickFilters?: boolean;
  enableFuzzySearch?: boolean;
}

export function GlobalSearch({
  properties = [],
  transactions = [],
  tenants = [],
  onResultSelect,
  placeholder = "Search properties, transactions, tenants...",
  className,
  showQuickFilters = true,
  enableFuzzySearch = true
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickFilters = [
    { id: 'properties', label: 'Properties', icon: Building },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'tenants', label: 'Tenants', icon: User },
  ];

  useEffect(() => {
    if (query.trim()) {
      const searchOptions = {
        includeProperties: selectedFilters.length === 0 || selectedFilters.includes('properties'),
        includeTransactions: selectedFilters.length === 0 || selectedFilters.includes('transactions'),
        includeTenants: selectedFilters.length === 0 || selectedFilters.includes('tenants'),
        fuzzy: enableFuzzySearch,
        maxResults: 20
      };

      const searchResults = GlobalSearchService.search(
        query,
        properties,
        transactions,
        tenants,
        searchOptions
      );

      setResults(searchResults);

      // Get suggestions
      const newSuggestions = GlobalSearchService.getSuggestions(
        query,
        properties,
        transactions,
        tenants
      );
      setSuggestions(newSuggestions);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query, properties, transactions, tenants, selectedFilters, enableFuzzySearch]);

  const handleResultSelect = (result: GlobalSearchResult) => {
    setIsOpen(false);
    setQuery(result.title);
    onResultSelect?.(result);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const getResultIcon = (type: GlobalSearchResult['type']) => {
    switch (type) {
      case 'property': return Building;
      case 'transaction': return Receipt;
      case 'tenant': return User;
      default: return Search;
    }
  };

  const formatAmount = (amount: number, type: string) => {
    if (type !== 'transaction' || !amount) return null;
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="pl-10 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white rounded-lg shadow-sm"
            />
            {enableFuzzySearch && query && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Zap className="h-3 w-3 text-blue-500" title="Fuzzy search enabled" />
              </div>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0 shadow-lg border bg-white z-50" align="start">
          <Command className="rounded-lg border-0">
            <CommandList className="max-h-80">
              {/* Quick Filters */}
              {showQuickFilters && (
                <CommandGroup heading="Search in">
                  <div className="flex flex-wrap gap-1 p-2">
                    {quickFilters.map((filter) => {
                      const Icon = filter.icon;
                      const isActive = selectedFilters.includes(filter.id);
                      return (
                        <Button
                          key={filter.id}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter(filter.id)}
                          className={cn(
                            "h-7 text-xs gap-1",
                            isActive && "bg-blue-100 text-blue-700 border-blue-300"
                          )}
                        >
                          <Icon className="h-3 w-3" />
                          {filter.label}
                        </Button>
                      );
                    })}
                  </div>
                </CommandGroup>
              )}

              {/* Search Results */}
              {results.length > 0 && (
                <CommandGroup heading="Results">
                  {results.map((result) => {
                    const Icon = getResultIcon(result.type);
                    return (
                      <CommandItem
                        key={`${result.type}-${result.id}`}
                        onSelect={() => handleResultSelect(result)}
                        className="flex items-center gap-3 p-3 cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 truncate">{result.title}</span>
                            <Badge variant="secondary" className="text-xs">
                              {result.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 truncate">{result.subtitle}</div>
                          {result.description && (
                            <div className="text-xs text-gray-500 truncate mt-0.5">{result.description}</div>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          {result.amount && (
                            <div className="font-medium text-gray-900">
                              {formatAmount(result.amount, result.type)}
                            </div>
                          )}
                          {result.date && (
                            <div className="text-xs">{formatDate(result.date)}</div>
                          )}
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && !results.length && query && (
                <CommandGroup heading="Suggestions">
                  {suggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion}
                      onSelect={() => setQuery(suggestion)}
                      className="flex items-center gap-2 p-2 cursor-pointer"
                    >
                      <Search className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{suggestion}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Empty State */}
              {query && !results.length && !suggestions.length && (
                <CommandEmpty className="py-6 text-center">
                  <div className="space-y-2">
                    <Search className="h-8 w-8 text-gray-300 mx-auto" />
                    <div className="text-sm text-gray-500">
                      No results found for "{query}"
                    </div>
                    {enableFuzzySearch && (
                      <div className="text-xs text-gray-400">
                        Try different keywords or check for typos
                      </div>
                    )}
                  </div>
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
