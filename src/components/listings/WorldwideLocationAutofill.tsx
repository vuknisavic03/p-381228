import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Globe } from 'lucide-react';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';

interface LocationData {
  streetNumber?: string;
  streetName?: string;
  streetAddress?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  fullAddress?: string;
}

interface WorldwideLocationAutofillProps {
  onLocationSelect: (locationData: LocationData) => void;
  initialValues?: {
    city?: string;
    region?: string;
    country?: string;
    streetAddress?: string;
    streetNumber?: string;
    postalCode?: string;
  };
}

interface Suggestion {
  description: string;
  place_id: string;
  types: string[];
  structured_formatting?: {
    main_text: string;
    secondary_text: string;
  };
}

export function WorldwideLocationAutofill({ 
  onLocationSelect, 
  initialValues 
}: WorldwideLocationAutofillProps) {
  const [cityValue, setCityValue] = useState(initialValues?.city || '');
  const [streetValue, setStreetValue] = useState(initialValues?.streetAddress || '');
  const [streetNumberValue, setStreetNumberValue] = useState(initialValues?.streetNumber || '');
  
  const [citySuggestions, setCitySuggestions] = useState<Suggestion[]>([]);
  const [streetSuggestions, setStreetSuggestions] = useState<Suggestion[]>([]);
  
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showStreetSuggestions, setShowStreetSuggestions] = useState(false);
  
  const [selectedCityData, setSelectedCityData] = useState<LocationData | null>(null);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingStreet, setIsLoadingStreet] = useState(false);
  
  const cityInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const citySuggestionsRef = useRef<HTMLDivElement>(null);
  const streetSuggestionsRef = useRef<HTMLDivElement>(null);
  
  const { isLoaded } = useGoogleMapsApi();
  
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  // Initialize Google Maps services
  useEffect(() => {
    if (isLoaded && window.google?.maps?.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      
      // Create a dummy div for PlacesService
      const dummyDiv = document.createElement('div');
      placesService.current = new window.google.maps.places.PlacesService(dummyDiv);
    }
  }, [isLoaded]);

  // Fetch city suggestions (worldwide)
  const fetchCitySuggestions = async (input: string) => {
    if (!autocompleteService.current || input.length < 2) {
      setCitySuggestions([]);
      return;
    }

    setIsLoadingCity(true);
    
    try {
      const request = {
        input,
        types: ['(cities)'],
        language: 'en'
      };

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        setIsLoadingCity(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setCitySuggestions(predictions);
        } else {
          setCitySuggestions([]);
        }
      });
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setIsLoadingCity(false);
      setCitySuggestions([]);
    }
  };

  // Fetch street suggestions based on selected city
  const fetchStreetSuggestions = async (input: string) => {
    if (!autocompleteService.current || !selectedCityData || input.length < 2) {
      setStreetSuggestions([]);
      return;
    }

    setIsLoadingStreet(true);
    
    try {
      // Include city in the search to get relevant street suggestions
      const searchQuery = `${input}, ${selectedCityData.city}, ${selectedCityData.country}`;
      
      const request = {
        input: searchQuery,
        types: ['address'],
        language: 'en'
      };

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        setIsLoadingStreet(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setStreetSuggestions(predictions);
        } else {
          setStreetSuggestions([]);
        }
      });
    } catch (error) {
      console.error('Error fetching street suggestions:', error);
      setIsLoadingStreet(false);
      setStreetSuggestions([]);
    }
  };

  // Extract detailed location data from place
  const extractLocationData = (place: google.maps.places.PlaceResult): LocationData => {
    const components = place.address_components || [];
    const data: LocationData = {
      fullAddress: place.formatted_address
    };

    components.forEach(component => {
      const types = component.types;
      
      if (types.includes('street_number')) {
        data.streetNumber = component.long_name;
      } else if (types.includes('route')) {
        data.streetName = component.long_name;
      } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        data.city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        data.region = component.long_name;
      } else if (types.includes('country')) {
        data.country = component.long_name;
      } else if (types.includes('postal_code')) {
        data.postalCode = component.long_name;
      }
    });

    return data;
  };

  // Handle city selection
  const handleCitySelect = async (suggestion: Suggestion) => {
    if (!placesService.current) return;

    setCityValue(suggestion.structured_formatting?.main_text || suggestion.description);
    setShowCitySuggestions(false);

    try {
      const request = {
        placeId: suggestion.place_id,
        fields: ['address_components', 'formatted_address', 'geometry']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const locationData = extractLocationData(place);
          setSelectedCityData(locationData);
          
          // Auto-populate country field
          onLocationSelect({
            city: locationData.city,
            region: locationData.region,
            country: locationData.country,
            postalCode: locationData.postalCode
          });
        }
      });
    } catch (error) {
      console.error('Error getting place details:', error);
    }
  };

  // Handle street selection
  const handleStreetSelect = async (suggestion: Suggestion) => {
    if (!placesService.current) return;

    setStreetValue(suggestion.structured_formatting?.main_text || suggestion.description);
    setShowStreetSuggestions(false);

    try {
      const request = {
        placeId: suggestion.place_id,
        fields: ['address_components', 'formatted_address']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const locationData = extractLocationData(place);
          
          // Update street number if found
          if (locationData.streetNumber) {
            setStreetNumberValue(locationData.streetNumber);
          }
          
          // Send complete location data
          onLocationSelect({
            streetNumber: locationData.streetNumber,
            streetAddress: locationData.streetName,
            city: selectedCityData?.city,
            region: selectedCityData?.region,
            country: selectedCityData?.country,
            postalCode: locationData.postalCode || selectedCityData?.postalCode
          });
        }
      });
    } catch (error) {
      console.error('Error getting place details:', error);
    }
  };

  // Debounced search effects
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cityValue && isLoaded) {
        fetchCitySuggestions(cityValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [cityValue, isLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (streetValue && isLoaded && selectedCityData) {
        fetchStreetSuggestions(streetValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [streetValue, isLoaded, selectedCityData]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (citySuggestionsRef.current && !citySuggestionsRef.current.contains(event.target as Node) &&
          cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowCitySuggestions(false);
      }
      
      if (streetSuggestionsRef.current && !streetSuggestionsRef.current.contains(event.target as Node) &&
          streetInputRef.current && !streetInputRef.current.contains(event.target as Node)) {
        setShowStreetSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoaded) {
    return (
      <div className="space-y-4 opacity-50">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm font-medium text-foreground mb-1.5 block">City</Label>
            <Input placeholder="Loading Google Maps..." disabled className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium text-foreground mb-1.5 block">State/Region</Label>
            <Input placeholder="Auto-filled from city" disabled className="h-10" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Label className="text-sm font-medium text-foreground mb-1.5 block">Street Address</Label>
            <Input placeholder="Loading..." disabled className="h-10" />
          </div>
          <div>
            <Label className="text-sm font-medium text-foreground mb-1.5 block">Street Number</Label>
            <Input placeholder="Auto-filled" disabled className="h-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* City and Region Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* City Input with Autocomplete */}
        <div className="relative">
          <Label className="text-sm font-medium text-foreground mb-1.5 block">
            <Globe className="h-3 w-3 inline mr-1" />
            City
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={cityInputRef}
              value={cityValue}
              onChange={(e) => {
                setCityValue(e.target.value);
                setShowCitySuggestions(true);
                // Reset dependent fields when city changes
                if (selectedCityData) {
                  setSelectedCityData(null);
                  setStreetValue('');
                  setStreetNumberValue('');
                }
              }}
              onFocus={() => setShowCitySuggestions(true)}
              placeholder="e.g., Belgrade, New York, London"
              className="h-10 pl-10"
            />
          </div>
          
          {/* City Suggestions Dropdown */}
          {showCitySuggestions && citySuggestions.length > 0 && (
            <div
              ref={citySuggestionsRef}
              className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {citySuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.place_id}
                  className="px-3 py-2 hover:bg-muted cursor-pointer border-b border-border/50 last:border-b-0"
                  onClick={() => handleCitySelect(suggestion)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">
                        {suggestion.structured_formatting?.main_text || suggestion.description}
                      </div>
                      {suggestion.structured_formatting?.secondary_text && (
                        <div className="text-xs text-muted-foreground">
                          {suggestion.structured_formatting.secondary_text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Region (Auto-filled) */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-1.5 block">State/Region</Label>
          <Input
            value={selectedCityData?.region || ''}
            placeholder="Auto-filled from city"
            disabled
            className="h-10 bg-muted/50"
          />
        </div>
      </div>

      {/* Street Address and Number Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Street Address with Autocomplete */}
        <div className="col-span-2 relative">
          <Label className="text-sm font-medium text-foreground mb-1.5 block">Street Address</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={streetInputRef}
              value={streetValue}
              onChange={(e) => {
                setStreetValue(e.target.value);
                setShowStreetSuggestions(true);
              }}
              onFocus={() => setShowStreetSuggestions(true)}
              placeholder={selectedCityData ? "e.g., Main Street, Oxford Street" : "Select city first"}
              disabled={!selectedCityData}
              className="h-10 pl-10"
            />
          </div>
          
          {/* Street Suggestions Dropdown */}
          {showStreetSuggestions && streetSuggestions.length > 0 && (
            <div
              ref={streetSuggestionsRef}
              className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {streetSuggestions.map((suggestion, index) => (
                <div
                  key={suggestion.place_id}
                  className="px-3 py-2 hover:bg-muted cursor-pointer border-b border-border/50 last:border-b-0"
                  onClick={() => handleStreetSelect(suggestion)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">
                        {suggestion.structured_formatting?.main_text || suggestion.description}
                      </div>
                      {suggestion.structured_formatting?.secondary_text && (
                        <div className="text-xs text-muted-foreground">
                          {suggestion.structured_formatting.secondary_text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Street Number (Auto-filled) */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-1.5 block">Street Number</Label>
          <Input
            value={streetNumberValue}
            onChange={(e) => {
              setStreetNumberValue(e.target.value);
              // Update parent with manual street number change
              onLocationSelect({
                streetNumber: e.target.value,
                streetAddress: streetValue,
                city: selectedCityData?.city,
                region: selectedCityData?.region,
                country: selectedCityData?.country
              });
            }}
            placeholder="e.g., 123"
            className="h-10"
          />
        </div>
      </div>

      {/* Country (Auto-filled, now read-only) */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-1.5 block">Country</Label>
        <Input
          value={selectedCityData?.country || ''}
          placeholder="Auto-filled from city"
          disabled
          className="h-10 bg-muted/50"
        />
      </div>
    </div>
  );
}