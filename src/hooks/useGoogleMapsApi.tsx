
import { useState, useEffect, useMemo } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import {
  getGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_SCRIPT_ID,
  removeExistingGoogleMapsScript,
  cleanupGoogleMapsObjects,
  handleMapsApiLoadError
} from '@/utils/googleMapsUtils';
import { useToast } from '@/hooks/use-toast';

export function useGoogleMapsApi() {
  const [apiKey, setApiKey] = useState<string>(() => getGoogleMapsApiKey());
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(() => isValidGoogleMapsApiKey(getGoogleMapsApiKey()));
  const { toast } = useToast();

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

  // Handle load errors and provide user feedback
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps load error:", loadError);
      
      // Show toast with user-friendly error message
      const errorMessage = handleMapsApiLoadError(loadError);
      toast({
        title: "Google Maps Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [loadError, toast]);

  // Debug logging
  useEffect(() => {
    if (isLoaded) {
      console.log("Google Maps script loaded successfully");
    }
  }, [isLoaded]);

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
