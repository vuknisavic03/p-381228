import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MapPin, Loader2, AlertCircle } from "lucide-react";

interface LocationSuggestion {
  description: string;
  place_id: string;
  types: string[];
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

  const getPlaceTypes = () => {
    switch (type) {
      case "address":
        return ["address"];
      case "city":
        return ["(cities)"];
      case "country":
        return ["country"];
      default:
        return ["geocode"];
    }
  };

  // Check for Google Maps API availability
  useEffect(() => {
    const checkApiAvailability = () => {
      console.log(`🔍 Checking Google Maps API availability for ${type}...`);
      
      if (typeof window === 'undefined') {
        console.log("❌ Window is undefined");
        setApiError("Browser environment not ready");
        return false;
      }
      
      if (!window.google) {
        console.log("❌ window.google is not available");
        setApiError("Google Maps API not loaded");
        return false;
      }
      
      if (!window.google.maps) {
        console.log("❌ window.google.maps is not available");
        setApiError("Google Maps core not loaded");
        return false;
      }
      
      if (!window.google.maps.places) {
        console.log("❌ window.google.maps.places is not available");
        setApiError("Google Places API not loaded");
        return false;
      }
      
      if (!window.google.maps.places.AutocompleteService) {
        console.log("❌ AutocompleteService not available");
        setApiError("Autocomplete service not available");
        return false;
      }
      
      console.log("✅ Google Maps API is fully available");
      setApiError(null);
      return true;
    };

    const initializeServices = () => {
      if (!checkApiAvailability()) {
        // Retry after a delay
        setTimeout(initializeServices, 1000);
        return;
      }
      
      try {
        console.log(`🔧 Initializing LocationAutofill services for ${type}...`);
        
        autocompleteService.current = new google.maps.places.AutocompleteService();
        console.log("✅ AutocompleteService initialized");
        
        // Create a temporary div for PlacesService
        const mapDiv = document.createElement('div');
        const map = new google.maps.Map(mapDiv);
        placesService.current = new google.maps.places.PlacesService(map);
        console.log("✅ PlacesService initialized");
        
        setIsApiReady(true);
        setApiError(null);
      } catch (error) {
        console.error("❌ Error initializing Google Maps services:", error);
        setApiError("Failed to initialize Google Maps services");
        // Retry after a delay
        setTimeout(initializeServices, 2000);
      }
    };

    initializeServices();
  }, [type]);

  const parseLocationComponents = (placeDetails: google.maps.places.PlaceResult) => {
    const components = placeDetails.address_components || [];
    let city = '';
    let country = '';
    let address = '';

    components.forEach(component => {
      const types = component.types;
      
      if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        city = component.long_name;
      } else if (types.includes('country')) {
        country = component.long_name;
      } else if (types.includes('street_number') || types.includes('route')) {
        if (address) {
          address += ' ' + component.long_name;
        } else {
          address = component.long_name;
        }
      }
    });

    return { city, country, address };
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (!isApiReady || !autocompleteService.current) {
      console.warn("❌ Google Places AutocompleteService not ready");
      setApiError("Google Maps API not ready");
      return;
    }

    console.log(`🔍 Fetching suggestions for "${query}" (type: ${type})`);
    setIsLoading(true);
    setApiError(null);
    
    try {
      const request: google.maps.places.AutocompletionRequest = {
        input: query,
        types: getPlaceTypes()
      };

      autocompleteService.current.getPlacePredictions(
        request,
        (predictions, status) => {
          setIsLoading(false);
          console.log(`📍 Received ${predictions?.length || 0} predictions with status: ${status}`);
          
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const formattedSuggestions = predictions.map(prediction => ({
              description: prediction.description,
              place_id: prediction.place_id,
              types: prediction.types
            }));
            setSuggestions(formattedSuggestions);
            setShowSuggestions(true);
            setApiError(null);
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            console.log('No results found');
            setSuggestions([]);
            setShowSuggestions(false);
            setApiError(null);
          } else {
            console.warn('Places API error:', status);
            setSuggestions([]);
            setShowSuggestions(false);
            setApiError(`Search failed: ${status}`);
          }
        }
      );
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setIsLoading(false);
      setShowSuggestions(false);
      setApiError("Search failed");
    }
  };

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
  }, [value, type, isApiReady]);

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
    console.log(`📝 Input changed to: "${newValue}"`);
    onChange(newValue);
    setShowSuggestions(true);
    setSelectedIndex(-1);
    setApiError(null);
  };

  const handleInputFocus = () => {
    console.log(`🎯 Input focused for ${type}`);
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    console.log(`✅ Selected suggestion: ${suggestion.description} (type: ${type})`);
    
    // For city type, we want to extract just the city name and auto-populate country
    if (type === "city" && placesService.current && onLocationSelect) {
      const request = {
        placeId: suggestion.place_id,
        fields: ['address_components', 'name']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const locationData = parseLocationComponents(place);
          
          // Set just the city name in the current field
          const cityName = locationData.city || place.name || suggestion.description.split(',')[0];
          onChange(cityName);
          
          // Notify parent to auto-populate other fields
          onLocationSelect({
            city: cityName,
            country: locationData.country
          });
          
          console.log(`🏙️ Auto-populated city: ${cityName}, country: ${locationData.country}`);
        } else {
          // Fallback: just use the first part of the description
          const cityName = suggestion.description.split(',')[0];
          onChange(cityName);
          
          // Try to extract country from description
          const parts = suggestion.description.split(',').map(s => s.trim());
          if (parts.length > 1 && onLocationSelect) {
            onLocationSelect({
              city: cityName,
              country: parts[parts.length - 1]
            });
          }
        }
      });
    } else {
      // For other types, just use the full description
      onChange(suggestion.description);
    }
    
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  function handleKeyDown(e: React.KeyboardEvent) {
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
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
        {label}
      </label>
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
        {apiError && !isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-red-400" />
          </div>
        )}
      </div>
      
      {apiError && (
        <div className="mt-1 text-xs text-red-600 ml-0.5">
          {apiError}
        </div>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <Command className="border-0">
            <CommandList>
              <CommandGroup>
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={suggestion.place_id}
                    onSelect={() => handleSuggestionSelect(suggestion)}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                      index === selectedIndex ? 'bg-blue-50' : ''
                    }`}
                  >
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-900 truncate">
                      {suggestion.description}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {suggestions.length === 0 && (
                <CommandEmpty className="py-3 text-center text-sm text-gray-500">
                  No suggestions found.
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
