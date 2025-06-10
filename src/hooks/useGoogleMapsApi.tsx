
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  getGoogleMapsApiKey,
  saveGoogleMapsApiKey,
  isValidGoogleMapsApiKey,
  GOOGLE_MAPS_LIBRARIES,
  handleMapsApiLoadError
} from '@/utils/googleMapsUtils';
import { validateApiKey } from '@/utils/validationSchemas';
import { secureLog, RateLimiter } from '@/utils/securityConfig';
import { useLoadScript } from '@react-google-maps/api';

// Rate limiter for API key attempts
const rateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes

export function useGoogleMapsApi() {
  // Use a ref to store the initial API key to prevent re-renders
  const initialApiKeyRef = useRef<string>(getGoogleMapsApiKey());
  const [apiKey, setApiKeyState] = useState<string>(initialApiKeyRef.current);
  const { toast } = useToast();
  
  // Load script just once with the initial API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: initialApiKeyRef.current || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
    preventGoogleFontsLoading: true,
  });

  // Handle load errors
  useEffect(() => {
    if (loadError) {
      secureLog("Google Maps load error", { error: loadError.message });
      
      const errorMessage = handleMapsApiLoadError(loadError);
      toast({
        title: "Google Maps Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [loadError, toast]);

  // Secure API key setter with validation and rate limiting
  const setApiKey = (newKey: string) => {
    const clientId = 'maps-user'; // Simple client identifier
    
    // Rate limiting check
    if (!rateLimiter.check(clientId)) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait before trying again.",
        variant: "destructive"
      });
      return;
    }

    secureLog("Setting new API key");
    
    if (newKey !== apiKey) {
      // Validate the API key format
      const validation = validateApiKey(newKey);
      if (!validation.success) {
        toast({
          title: "Invalid API Key",
          description: "Please enter a valid Google Maps API key.",
          variant: "destructive"
        });
        return;
      }

      // Additional security validation
      if (isValidGoogleMapsApiKey(newKey)) {
        saveGoogleMapsApiKey(newKey);
        secureLog("API key validation successful");
      } else {
        toast({
          title: "API Key Validation Failed",
          description: "The provided API key format is invalid.",
          variant: "destructive"
        });
        return;
      }
      
      // If changing to a different key, we need a page reload
      if (isLoaded && apiKey !== newKey) {
        toast({
          title: "API Key Updated",
          description: "Refreshing page to apply new API key...",
        });
        
        // Use a timeout to ensure the toast is shown before reload
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return;
      }
      
      setApiKeyState(newKey);
    }
  };

  const isApiKeyValid = isValidGoogleMapsApiKey(apiKey);

  return {
    apiKey,
    setApiKey,
    isLoaded,
    loadError,
    isLoading: !isLoaded && !loadError && isApiKeyValid,
    isApiKeyValid
  };
}
