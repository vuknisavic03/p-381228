
import { useState, useEffect, useMemo } from 'react';
import {
  getGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  GOOGLE_MAPS_SCRIPT_ID,
  cleanupGoogleMapsObjects,
  removeExistingGoogleMapsScript
} from '@/utils/googleMapsUtils';
import { useLoadScript } from '@react-google-maps/api';

export function useGoogleMapsApi() {
  const [apiKey, setApiKey] = useState<string>(() => {
    return getGoogleMapsApiKey();
  });

  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(() => {
    return isValidGoogleMapsApiKey(getGoogleMapsApiKey());
  });

  // Use React.useMemo for libraries to prevent rerendering
  const libraries = useMemo(() => GOOGLE_MAPS_LIBRARIES, []);

  // Reset script when API key changes
  useEffect(() => {
    // Remove existing script first to ensure clean reload
    removeExistingGoogleMapsScript();
    // Update validity state when API key changes
    setIsApiKeyValid(isValidGoogleMapsApiKey(apiKey));
  }, [apiKey]);

  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: isApiKeyValid ? apiKey : '',
    libraries,
    id: GOOGLE_MAPS_SCRIPT_ID,
    language: "en",
    region: "US"
  });

  // Clean up function
  useEffect(() => {
    return () => {
      cleanupGoogleMapsObjects();
    };
  }, []);

  // Log any errors for debugging
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps load error:", loadError);
    }
  }, [loadError]);

  return {
    apiKey,
    isLoaded,
    loadError,
    isApiKeyValid,
    setApiKey
  };
}
