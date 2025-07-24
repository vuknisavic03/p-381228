import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MapPin, Loader2, AlertCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationSuggestion {
  description: string;
  place_id: string;
  types: string[];
  main_text: string;
  secondary_text: string;
}

interface LocationAutofillProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  type: "address" | "city" | "country";
  className?: string;
  onLocationSelect?: (locationData: { city?: string; country?: string; address?: string }) => void;
}

export function LocationAutofill({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  type,
  className,
  onLocationSelect
}: LocationAutofillProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  const getSearchConfig = () => {
    switch (type) {
      case "address":
        return {
          types: ["address"],
          componentRestrictions: undefined
        };
      case "city":
        return {
          types: ["(cities)"],
          componentRestrictions: undefined
        };
      case "country":
        return {
          types: ["country"],
          componentRestrictions: undefined
        };
      default:
        return {
          types: ["geocode"],
          componentRestrictions: undefined
        };
    }
  };

  // Initialize Google Maps API
  useEffect(() => {
    const initializeServices = () => {
      if (typeof window === 'undefined' || !window.google?.maps?.places) {
        setTimeout(initializeServices, 500);
        return;
      }
      
      try {
        autocompleteService.current = new google.maps.places.AutocompleteService();
        const mapDiv = document.createElement('div');
        const map = new google.maps.Map(mapDiv);
        placesService.current = new google.maps.places.PlacesService(map);
        setIsApiReady(true);
        setApiError(null);
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
        setApiError("Maps service unavailable");
        setTimeout(initializeServices, 1000);
      }
    };

    initializeServices();
  }, []);

  const formatSuggestion = (prediction: google.maps.places.AutocompletePrediction): LocationSuggestion => {
    const mainText = prediction.structured_formatting?.main_text || prediction.description;
    const secondaryText = prediction.structured_formatting?.secondary_text || '';
    
    return {
      description: prediction.description,
      place_id: prediction.place_id,
      types: prediction.types,
      main_text: mainText,
      secondary_text: secondaryText
    };
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2 || !isApiReady || !autocompleteService.current) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setApiError(null);
    
    try {
      const config = getSearchConfig();
      const request: google.maps.places.AutocompletionRequest = {
        input: query,
        ...config
      };

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        setIsLoading(false);
        
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          const formattedSuggestions = predictions.slice(0, 6).map(formatSuggestion);
          setSuggestions(formattedSuggestions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
          if (status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setApiError("Search failed");
          }
        }
      });
    } catch (error) {
      setIsLoading(false);
      setSuggestions([]);
      setShowSuggestions(false);
      setApiError("Search error");
    }
  };

  // Debounced search
  useEffect(() => {
    if (!isApiReady) return;
    
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, isApiReady]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const extractLocationData = (suggestion: LocationSuggestion): Promise<{city?: string; country?: string; address?: string}> => {
    return new Promise((resolve) => {
      if (!placesService.current) {
        resolve({});
        return;
      }

      const request = {
        placeId: suggestion.place_id,
        fields: ['address_components', 'name', 'formatted_address']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.address_components) {
          let city = '';
          let country = '';
          let address = '';

          place.address_components.forEach(component => {
            const types = component.types;
            
            if (types.includes('locality')) {
              city = component.long_name;
            } else if (types.includes('administrative_area_level_1') && !city) {
              city = component.long_name;
            } else if (types.includes('country')) {
              country = component.long_name;
            } else if (types.includes('street_number') || types.includes('route')) {
              address = address ? `${address} ${component.long_name}` : component.long_name;
            }
          });

          // Fallback to place name or formatted address
          if (!city && place.name) {
            city = place.name;
          }
          if (!address && place.formatted_address) {
            address = place.formatted_address;
          }

          resolve({ city, country, address });
        } else {
          resolve({});
        }
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSelectedIndex(-1);
    setApiError(null);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionSelect = async (suggestion: LocationSuggestion) => {
    if (type === "city") {
      // For city, just use the main text (city name)
      onChange(suggestion.main_text);
      
      if (onLocationSelect) {
        const locationData = await extractLocationData(suggestion);
        onLocationSelect({
          city: suggestion.main_text,
          country: locationData.country
        });
      }
    } else if (type === "country") {
      // For country, use the main text
      onChange(suggestion.main_text);
      
      if (onLocationSelect) {
        onLocationSelect({
          country: suggestion.main_text
        });
      }
    } else {
      // For address, use the full description
      onChange(suggestion.description);
      
      if (onLocationSelect) {
        const locationData = await extractLocationData(suggestion);
        onLocationSelect(locationData);
      }
    }
    
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn("pl-10 pr-10", className)}
        />
        
        {apiError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        )}
      </div>
      
      {apiError && (
        <div className="mt-1 text-sm text-destructive">
          {apiError}
        </div>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-hidden">
          <Command className="border-0">
            <CommandList>
              <CommandGroup>
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={suggestion.place_id}
                    onSelect={() => handleSuggestionSelect(suggestion)}
                    className={cn(
                      "flex items-start gap-3 px-3 py-3 cursor-pointer transition-colors",
                      index === selectedIndex && "bg-accent"
                    )}
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">
                        {suggestion.main_text}
                      </div>
                      {suggestion.secondary_text && (
                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                          {suggestion.secondary_text}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {suggestions.length === 0 && (
                <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">
                  No locations found
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
