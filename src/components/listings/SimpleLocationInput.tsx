import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationData {
  city?: string;
  state?: string;
  country?: string;
  address?: string;
}

interface SimpleLocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  type: "address" | "city";
  className?: string;
  onLocationSelect?: (locationData: LocationData) => void;
}

// Common US cities with their states for quick suggestions
const US_CITIES = [
  { city: "New York", state: "NY" },
  { city: "Los Angeles", state: "CA" },
  { city: "Chicago", state: "IL" },
  { city: "Houston", state: "TX" },
  { city: "Phoenix", state: "AZ" },
  { city: "Philadelphia", state: "PA" },
  { city: "San Antonio", state: "TX" },
  { city: "San Diego", state: "CA" },
  { city: "Dallas", state: "TX" },
  { city: "San Jose", state: "CA" },
  { city: "Austin", state: "TX" },
  { city: "Jacksonville", state: "FL" },
  { city: "Fort Worth", state: "TX" },
  { city: "Columbus", state: "OH" },
  { city: "Charlotte", state: "NC" },
  { city: "San Francisco", state: "CA" },
  { city: "Indianapolis", state: "IN" },
  { city: "Seattle", state: "WA" },
  { city: "Denver", state: "CO" },
  { city: "Washington", state: "DC" },
  { city: "Boston", state: "MA" },
  { city: "Nashville", state: "TN" },
  { city: "Oklahoma City", state: "OK" },
  { city: "Las Vegas", state: "NV" },
  { city: "Portland", state: "OR" },
  { city: "Memphis", state: "TN" },
  { city: "Louisville", state: "KY" },
  { city: "Miami", state: "FL" },
  { city: "Atlanta", state: "GA" },
  { city: "Baltimore", state: "MD" },
  { city: "Milwaukee", state: "WI" },
  { city: "Albuquerque", state: "NM" },
  { city: "Tucson", state: "AZ" },
  { city: "Mesa", state: "AZ" },
  { city: "Kansas City", state: "MO" },
  { city: "Colorado Springs", state: "CO" },
  { city: "Raleigh", state: "NC" },
  { city: "Omaha", state: "NE" },
  { city: "Long Beach", state: "CA" },
  { city: "Virginia Beach", state: "VA" },
];

export function SimpleLocationInput({
  value,
  onChange,
  placeholder,
  label,
  type,
  className,
  onLocationSelect
}: SimpleLocationInputProps) {
  const [suggestions, setSuggestions] = useState<Array<{ city: string; state: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (type === "city" && inputValue.length >= 2) {
      // Filter cities based on input
      const filtered = US_CITIES.filter(city =>
        city.city.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: { city: string; state: string }) => {
    onChange(suggestion.city);
    setSuggestions([]);
    setShowSuggestions(false);

    if (onLocationSelect) {
      onLocationSelect({
        city: suggestion.city,
        state: suggestion.state,
        country: "United States"
      });
    }
  };

  const handleManualEntry = () => {
    if (type === "address" && onLocationSelect) {
      onLocationSelect({
        address: value,
        country: "United States"
      });
    } else if (type === "city" && onLocationSelect) {
      onLocationSelect({
        city: value,
        country: "United States"
      });
    }
  };

  return (
    <div className="relative w-full">
      <Label htmlFor={`location-${type}`} className="text-sm font-medium text-foreground mb-1.5 block">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <Input
          id={`location-${type}`}
          value={value}
          onChange={handleInputChange}
          onBlur={() => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className={cn("pl-10", className)}
          autoComplete="off"
        />
        
        {type === "address" && value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs"
            onClick={handleManualEntry}
          >
            Use
          </Button>
        )}
      </div>

      {/* Suggestions dropdown for cities */}
      {showSuggestions && suggestions.length > 0 && type === "city" && (
        <div className="absolute z-[100] w-full mt-1 bg-white dark:bg-gray-800 border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.city}-${suggestion.state}`}
              className="px-3 py-2 cursor-pointer border-b border-border/50 last:border-b-0 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">
                    {suggestion.city}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {suggestion.state}, United States
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {type === "city" && (
        <div className="mt-1 text-xs text-muted-foreground">
          Start typing a US city name for suggestions
        </div>
      )}
      
      {type === "address" && (
        <div className="mt-1 text-xs text-muted-foreground">
          Enter the street address (Google Maps autofill not available)
        </div>
      )}
    </div>
  );
}