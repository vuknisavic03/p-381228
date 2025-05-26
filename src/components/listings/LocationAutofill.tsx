
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { MapPin, Loader2 } from "lucide-react";

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
}

export function LocationAutofill({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  type,
  className 
}: LocationAutofillProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);

  const getPlaceTypes = () => {
    switch (type) {
      case "address":
        return ["address"];
      case "city":
        return ["(cities)"];
      case "country":
        return ["(regions)"];
      default:
        return ["geocode"];
    }
  };

  // Initialize the autocomplete service when Google Maps is loaded
  useEffect(() => {
    if (window.google?.maps?.places?.AutocompleteService) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    if (!autocompleteService.current) {
      console.warn("Google Places AutocompleteService not available");
      return;
    }

    setIsLoading(true);
    
    try {
      const request: google.maps.places.AutocompletionRequest = {
        input: query,
        types: getPlaceTypes()
      };

      autocompleteService.current.getPlacePredictions(
        request,
        (predictions, status) => {
          setIsLoading(false);
          
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const formattedSuggestions = predictions.map(prediction => ({
              description: prediction.description,
              place_id: prediction.place_id,
              types: prediction.types
            }));
            setSuggestions(formattedSuggestions);
          } else {
            console.warn('Places API error:', status);
            setSuggestions([]);
          }
        }
      );
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, type]);

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
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    onChange(suggestion.description);
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
      <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-0.5">
        {label}
      </label>
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      
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
