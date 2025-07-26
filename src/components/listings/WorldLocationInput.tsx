import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationData {
  city?: string;
  state?: string;
  country?: string;
  address?: string;
}

interface WorldLocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  type: "address" | "city";
  className?: string;
  onLocationSelect?: (locationData: LocationData) => void;
}

// Major cities worldwide with their countries and states/regions
const WORLD_CITIES = [
  // United States
  { city: "New York", state: "NY", country: "United States" },
  { city: "Los Angeles", state: "CA", country: "United States" },
  { city: "Chicago", state: "IL", country: "United States" },
  { city: "Houston", state: "TX", country: "United States" },
  { city: "Phoenix", state: "AZ", country: "United States" },
  { city: "Philadelphia", state: "PA", country: "United States" },
  { city: "San Antonio", state: "TX", country: "United States" },
  { city: "San Diego", state: "CA", country: "United States" },
  { city: "Dallas", state: "TX", country: "United States" },
  { city: "San Francisco", state: "CA", country: "United States" },
  { city: "Austin", state: "TX", country: "United States" },
  { city: "Seattle", state: "WA", country: "United States" },
  { city: "Denver", state: "CO", country: "United States" },
  { city: "Washington", state: "DC", country: "United States" },
  { city: "Boston", state: "MA", country: "United States" },
  { city: "Las Vegas", state: "NV", country: "United States" },
  { city: "Miami", state: "FL", country: "United States" },
  { city: "Atlanta", state: "GA", country: "United States" },
  
  // Canada
  { city: "Toronto", state: "ON", country: "Canada" },
  { city: "Montreal", state: "QC", country: "Canada" },
  { city: "Vancouver", state: "BC", country: "Canada" },
  { city: "Calgary", state: "AB", country: "Canada" },
  { city: "Edmonton", state: "AB", country: "Canada" },
  { city: "Ottawa", state: "ON", country: "Canada" },
  { city: "Winnipeg", state: "MB", country: "Canada" },
  
  // United Kingdom
  { city: "London", state: "England", country: "United Kingdom" },
  { city: "Manchester", state: "England", country: "United Kingdom" },
  { city: "Birmingham", state: "England", country: "United Kingdom" },
  { city: "Liverpool", state: "England", country: "United Kingdom" },
  { city: "Edinburgh", state: "Scotland", country: "United Kingdom" },
  { city: "Glasgow", state: "Scotland", country: "United Kingdom" },
  { city: "Cardiff", state: "Wales", country: "United Kingdom" },
  
  // Germany
  { city: "Berlin", state: "Berlin", country: "Germany" },
  { city: "Munich", state: "Bavaria", country: "Germany" },
  { city: "Hamburg", state: "Hamburg", country: "Germany" },
  { city: "Cologne", state: "North Rhine-Westphalia", country: "Germany" },
  { city: "Frankfurt", state: "Hesse", country: "Germany" },
  { city: "Stuttgart", state: "Baden-Württemberg", country: "Germany" },
  
  // France
  { city: "Paris", state: "Île-de-France", country: "France" },
  { city: "Marseille", state: "Provence-Alpes-Côte d'Azur", country: "France" },
  { city: "Lyon", state: "Auvergne-Rhône-Alpes", country: "France" },
  { city: "Toulouse", state: "Occitanie", country: "France" },
  { city: "Nice", state: "Provence-Alpes-Côte d'Azur", country: "France" },
  
  // Spain
  { city: "Madrid", state: "Community of Madrid", country: "Spain" },
  { city: "Barcelona", state: "Catalonia", country: "Spain" },
  { city: "Valencia", state: "Valencia", country: "Spain" },
  { city: "Seville", state: "Andalusia", country: "Spain" },
  { city: "Bilbao", state: "Basque Country", country: "Spain" },
  
  // Italy
  { city: "Rome", state: "Lazio", country: "Italy" },
  { city: "Milan", state: "Lombardy", country: "Italy" },
  { city: "Naples", state: "Campania", country: "Italy" },
  { city: "Turin", state: "Piedmont", country: "Italy" },
  { city: "Florence", state: "Tuscany", country: "Italy" },
  { city: "Venice", state: "Veneto", country: "Italy" },
  
  // Netherlands
  { city: "Amsterdam", state: "North Holland", country: "Netherlands" },
  { city: "Rotterdam", state: "South Holland", country: "Netherlands" },
  { city: "The Hague", state: "South Holland", country: "Netherlands" },
  { city: "Utrecht", state: "Utrecht", country: "Netherlands" },
  
  // Australia
  { city: "Sydney", state: "NSW", country: "Australia" },
  { city: "Melbourne", state: "VIC", country: "Australia" },
  { city: "Brisbane", state: "QLD", country: "Australia" },
  { city: "Perth", state: "WA", country: "Australia" },
  { city: "Adelaide", state: "SA", country: "Australia" },
  { city: "Canberra", state: "ACT", country: "Australia" },
  
  // Japan
  { city: "Tokyo", state: "Tokyo", country: "Japan" },
  { city: "Osaka", state: "Osaka", country: "Japan" },
  { city: "Kyoto", state: "Kyoto", country: "Japan" },
  { city: "Yokohama", state: "Kanagawa", country: "Japan" },
  { city: "Nagoya", state: "Aichi", country: "Japan" },
  
  // China
  { city: "Beijing", state: "Beijing", country: "China" },
  { city: "Shanghai", state: "Shanghai", country: "China" },
  { city: "Guangzhou", state: "Guangdong", country: "China" },
  { city: "Shenzhen", state: "Guangdong", country: "China" },
  { city: "Chengdu", state: "Sichuan", country: "China" },
  
  // India
  { city: "Mumbai", state: "Maharashtra", country: "India" },
  { city: "Delhi", state: "Delhi", country: "India" },
  { city: "Bangalore", state: "Karnataka", country: "India" },
  { city: "Hyderabad", state: "Telangana", country: "India" },
  { city: "Chennai", state: "Tamil Nadu", country: "India" },
  { city: "Kolkata", state: "West Bengal", country: "India" },
  
  // Brazil
  { city: "São Paulo", state: "São Paulo", country: "Brazil" },
  { city: "Rio de Janeiro", state: "Rio de Janeiro", country: "Brazil" },
  { city: "Brasília", state: "Federal District", country: "Brazil" },
  { city: "Salvador", state: "Bahia", country: "Brazil" },
  { city: "Fortaleza", state: "Ceará", country: "Brazil" },
  
  // Mexico
  { city: "Mexico City", state: "Mexico City", country: "Mexico" },
  { city: "Guadalajara", state: "Jalisco", country: "Mexico" },
  { city: "Monterrey", state: "Nuevo León", country: "Mexico" },
  { city: "Puebla", state: "Puebla", country: "Mexico" },
  { city: "Tijuana", state: "Baja California", country: "Mexico" },
  
  // Russia
  { city: "Moscow", state: "Moscow", country: "Russia" },
  { city: "Saint Petersburg", state: "Saint Petersburg", country: "Russia" },
  { city: "Novosibirsk", state: "Novosibirsk Oblast", country: "Russia" },
  { city: "Yekaterinburg", state: "Sverdlovsk Oblast", country: "Russia" },
  
  // South Korea
  { city: "Seoul", state: "Seoul", country: "South Korea" },
  { city: "Busan", state: "Busan", country: "South Korea" },
  { city: "Incheon", state: "Incheon", country: "South Korea" },
  
  // South Africa
  { city: "Cape Town", state: "Western Cape", country: "South Africa" },
  { city: "Johannesburg", state: "Gauteng", country: "South Africa" },
  { city: "Durban", state: "KwaZulu-Natal", country: "South Africa" },
  { city: "Pretoria", state: "Gauteng", country: "South Africa" },
  
  // Argentina
  { city: "Buenos Aires", state: "Buenos Aires", country: "Argentina" },
  { city: "Córdoba", state: "Córdoba", country: "Argentina" },
  { city: "Rosario", state: "Santa Fe", country: "Argentina" },
  
  // Other major cities
  { city: "Singapore", state: "Singapore", country: "Singapore" },
  { city: "Dubai", state: "Dubai", country: "United Arab Emirates" },
  { city: "Istanbul", state: "Istanbul", country: "Turkey" },
  { city: "Cairo", state: "Cairo", country: "Egypt" },
  { city: "Bangkok", state: "Bangkok", country: "Thailand" },
  { city: "Manila", state: "Metro Manila", country: "Philippines" },
  { city: "Jakarta", state: "Jakarta", country: "Indonesia" },
  { city: "Kuala Lumpur", state: "Kuala Lumpur", country: "Malaysia" },
  { city: "Tel Aviv", state: "Tel Aviv", country: "Israel" },
  { city: "Zurich", state: "Zurich", country: "Switzerland" },
  { city: "Vienna", state: "Vienna", country: "Austria" },
  { city: "Stockholm", state: "Stockholm", country: "Sweden" },
  { city: "Copenhagen", state: "Capital Region", country: "Denmark" },
  { city: "Oslo", state: "Oslo", country: "Norway" },
  { city: "Helsinki", state: "Uusimaa", country: "Finland" },
  { city: "Warsaw", state: "Masovian", country: "Poland" },
  { city: "Prague", state: "Prague", country: "Czech Republic" },
  { city: "Budapest", state: "Budapest", country: "Hungary" },
  { city: "Athens", state: "Attica", country: "Greece" },
  { city: "Lisbon", state: "Lisbon", country: "Portugal" },
  { city: "Brussels", state: "Brussels", country: "Belgium" },
];

export function WorldLocationInput({
  value,
  onChange,
  placeholder,
  label,
  type,
  className,
  onLocationSelect
}: WorldLocationInputProps) {
  const [suggestions, setSuggestions] = useState<Array<{ city: string; state: string; country: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (type === "city" && inputValue.length >= 2) {
      // Filter cities based on input - search both city name and country
      const filtered = WORLD_CITIES.filter(city =>
        city.city.toLowerCase().includes(inputValue.toLowerCase()) ||
        city.country.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 8); // Show more results for worldwide search
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: { city: string; state: string; country: string }) => {
    onChange(suggestion.city);
    setSuggestions([]);
    setShowSuggestions(false);

    if (onLocationSelect) {
      onLocationSelect({
        city: suggestion.city,
        state: suggestion.state,
        country: suggestion.country
      });
    }
  };

  const handleManualEntry = () => {
    if (type === "address" && onLocationSelect) {
      onLocationSelect({
        address: value
      });
    } else if (type === "city" && onLocationSelect) {
      onLocationSelect({
        city: value
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
          {type === "city" ? <Globe className="h-4 w-4" /> : <Search className="h-4 w-4" />}
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
              key={`${suggestion.city}-${suggestion.state}-${suggestion.country}`}
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
                    {suggestion.state}, {suggestion.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {type === "city" && (
        <div className="mt-1 text-xs text-muted-foreground">
          Start typing a city name or country for worldwide suggestions
        </div>
      )}
      
      {type === "address" && (
        <div className="mt-1 text-xs text-muted-foreground">
          Enter the street address
        </div>
      )}
    </div>
  );
}
