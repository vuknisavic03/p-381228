
import { useState, useEffect, useMemo } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import {
  getGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_SCRIPT_ID,
  removeExistingGoogleMapsScript,
  cleanupGoogleMapsObjects
} from '@/utils/googleMapsUtils';

export function useGoogleMapsApi() {
  const [apiKey, setApiKey] = useState<string>(() => getGoogleMapsApiKey());
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(() => isValidGoogleMapsApiKey(getGoogleMapsApiKey()));

  // Use memoized libraries array to prevent unnecessary re-renders
  const libraries = useMemo(() => GOOGLE_MAPS_LIBRARIES, []);

  // Effect to handle API key changes
  useEffect(() => {
    // Clean up existing script when API key changes
    removeExistingGoogleMapsScript();
    
    // Update validity state
    const isValid = isValidGoogleMapsApiKey(apiKey);
    setIsApiKeyValid(isValid);
    
    console.log("API key changed:", isValid ? "Valid key provided" : "No valid key");
  }, [apiKey]);

  // Load the script conditionally when we have a valid key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: isApiKeyValid ? apiKey : '',
    libraries,
    id: GOOGLE_MAPS_SCRIPT_ID,
    preventGoogleFontsLoading: false
  });

  // Debug logging
  useEffect(() => {
    if (isLoaded) {
      console.log("Google Maps script loaded successfully");
    }
    if (loadError) {
      console.error("Google Maps load error:", loadError);
    }
  }, [isLoaded, loadError]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupGoogleMapsObjects();
    };
  }, []);

  return {
    apiKey,
    setApiKey,
    isLoaded,
    loadError,
    isApiKeyValid
  };
}
