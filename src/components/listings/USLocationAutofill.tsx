import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2, AlertCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationSuggestion {
  description: string;
  place_id: string;
  main_text: string;
  secondary_text: string;
  city?: string;
  state?: string;
  country?: string;
  formatted_address?: string;
}

interface USLocationAutofillProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  type: "address" | "city";
  className?: string;
  onLocationSelect?: (locationData: { 
    city?: string; 
    state?: string;
    country?: string; 
    address?: string;
    formatted_address?: string;
  }) => void;
}

export function USLocationAutofill({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  type,
  className,
  onLocationSelect
}: USLocationAutofillProps) {
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

  const getSearchConfig = () => {
    const baseConfig = {
      componentRestrictions: { country: 'us' }, // Restrict to US only
    };

    switch (type) {
      case "address":
        return {
          ...baseConfig,
          types: ['address', 'establishment']
        };
      case "city":
        return {
          ...baseConfig,
          types: ['(cities)']
        };
      default:
        return {
          ...baseConfig,
          types: ['geocode']
        };
    }
  };

  const formatSuggestion = (prediction: google.maps.places.AutocompletePrediction): LocationSuggestion => {
    const mainText = prediction.structured_formatting?.main_text || prediction.description;
    const secondaryText = prediction.structured_formatting?.secondary_text || '';
    
    return {
      description: prediction.description,
      place_id: prediction.place_id,
      main_text: mainText,
      secondary_text: secondaryText
    };
  };

  const fetchSuggestions = async (inputValue: string) => {
    if (!autocompleteService.current || inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const config = getSearchConfig();
      
      autocompleteService.current.getPlacePredictions(
        {
          input: inputValue,
          ...config
        },
        (predictions, status) => {
          setIsLoading(false);
          
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const formattedSuggestions = predictions
              .slice(0, 5) // Limit to 5 suggestions
              .map(formatSuggestion);
            setSuggestions(formattedSuggestions);
            setShowSuggestions(true);
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setSuggestions([]);
            setShowSuggestions(false);
          } else {
            console.error('Places API error:', status);
            setApiError('Unable to fetch suggestions');
            setSuggestions([]);
          }
        }
      );
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setIsLoading(false);
      setApiError('Search unavailable');
      setSuggestions([]);
    }
  };

  const extractLocationData = async (placeId: string): Promise<{
    city?: string;
    state?: string;
    country?: string;
    address?: string;
    formatted_address?: string;
  }> => {
    return new Promise((resolve) => {
      if (!placesService.current) {
        resolve({});
        return;
      }

      placesService.current.getDetails(
        {
          placeId: placeId,
          fields: ['address_components', 'formatted_address', 'name']
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const components = place.address_components || [];
            let city = '';
            let state = '';
            let country = 'United States'; // Default for US-only search
            let streetNumber = '';
            let route = '';

            components.forEach((component) => {
              const types = component.types;
              
              if (types.includes('locality')) {
                city = component.long_name;
              } else if (types.includes('administrative_area_level_1')) {
                state = component.short_name; // Use short name for state (e.g., "CA", "TX")
              } else if (types.includes('country')) {
                country = component.long_name;
              } else if (types.includes('street_number')) {
                streetNumber = component.long_name;
              } else if (types.includes('route')) {
                route = component.long_name;
              }
            });

            const address = type === 'address' && streetNumber && route 
              ? `${streetNumber} ${route}` 
              : '';

            resolve({
              city,
              state,
              country,
              address,
              formatted_address: place.formatted_address
            });
          } else {
            resolve({});
          }
        }
      );
    });
  };

  const handleSuggestionSelect = async (suggestion: LocationSuggestion) => {
    onChange(suggestion.main_text);
    setShowSuggestions(false);
    setSelectedIndex(-1);

    if (onLocationSelect) {
      const locationData = await extractLocationData(suggestion.place_id);
      
      // For city type, automatically set country to US
      if (type === 'city') {
        onLocationSelect({
          city: locationData.city || suggestion.main_text,
          state: locationData.state,
          country: 'United States',
          formatted_address: locationData.formatted_address
        });
      } else {
        onLocationSelect({
          ...locationData,
          country: 'United States' // Always set to US since we're restricting to US
        });
      }
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (!isApiReady) return;

    const timeoutId = setTimeout(() => {
      if (value && value.length >= 2) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, isApiReady, type]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setSelectedIndex(-1);
    
    if (newValue.length < 2) {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
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
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 && value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <Label htmlFor={`location-${type}`} className="text-sm font-medium text-foreground mb-1.5 block">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>
        <Input
          ref={inputRef}
          id={`location-${type}`}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn("pl-10", className)}
          autoComplete="off"
        />
        
        {apiError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              className={cn(
                "px-3 py-2 cursor-pointer border-b border-border/50 last:border-b-0",
                selectedIndex === index 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-muted"
              )}
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">
                    {suggestion.main_text}
                  </div>
                  {suggestion.secondary_text && (
                    <div className="text-xs text-muted-foreground truncate">
                      {suggestion.secondary_text}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {apiError && (
        <div className="mt-1 text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {apiError}
        </div>
      )}
      
      {/* No API message */}
      {!isApiReady && !apiError && (
        <div className="mt-1 text-xs text-muted-foreground">
          Initializing location services...
        </div>
      )}
    </div>
  );
}