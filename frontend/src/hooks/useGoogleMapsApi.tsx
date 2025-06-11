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

// Device and browser detection
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMobile = /Mobi|Android/i.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isChrome = /Chrome/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  
  return {
    isIOS,
    isAndroid,
    isMobile,
    isSafari,
    isChrome,
    isFirefox,
    userAgent: userAgent.substring(0, 100) // Truncate for logging
  };
};

export function useGoogleMapsApi() {
  // Use a ref to store the initial API key to prevent re-renders
  const initialApiKeyRef = useRef<string>(getGoogleMapsApiKey());
  const [apiKey, setApiKeyState] = useState<string>(initialApiKeyRef.current);
  const [deviceInfo] = useState(getDeviceInfo());
  const { toast } = useToast();
  
  // Enhanced loading options for better device compatibility
  const loadScriptOptions = {
    googleMapsApiKey: initialApiKeyRef.current || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
    preventGoogleFontsLoading: true,
    // Add retry and timeout options for better reliability
    nonce: undefined,
    retries: 3,
    // Use different loading strategy for different devices
    loadingElement: deviceInfo.isMobile ? undefined : document.createElement('div'),
  };

  // Load script with enhanced options
  const { isLoaded, loadError } = useLoadScript(loadScriptOptions);

  // Log device info for debugging
  useEffect(() => {
    console.log('Device info:', deviceInfo);
    console.log('API key available:', !!initialApiKeyRef.current);
    console.log('Is mobile device:', deviceInfo.isMobile);
  }, [deviceInfo]);

  // Enhanced error handling with device-specific messages
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps load error details:", {
        error: loadError.message,
        stack: loadError.stack,
        deviceInfo,
        apiKeyPresent: !!apiKey,
        timestamp: new Date().toISOString()
      });
      
      secureLog("Google Maps load error", { 
        error: loadError.message,
        deviceType: deviceInfo.isMobile ? 'mobile' : 'desktop',
        browser: deviceInfo.isChrome ? 'chrome' : deviceInfo.isSafari ? 'safari' : deviceInfo.isFirefox ? 'firefox' : 'other'
      });
      
      let errorMessage = handleMapsApiLoadError(loadError);
      
      // Add device-specific guidance
      if (deviceInfo.isMobile) {
        errorMessage += " If you're on a mobile device, try refreshing the page or switching to a different network.";
      }
      
      if (deviceInfo.isSafari) {
        errorMessage += " Safari users: Please ensure JavaScript and location services are enabled.";
      }
      
      toast({
        title: "Google Maps Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [loadError, toast, deviceInfo, apiKey]);

  // Check for common device/browser issues
  useEffect(() => {
    // Check if we're in a supported environment
    if (typeof window === 'undefined') {
      console.warn('Google Maps: Window object not available');
      return;
    }

    // Check for network connectivity
    if (!navigator.onLine) {
      console.warn('Google Maps: Device appears to be offline');
      toast({
        title: "Network Issue",
        description: "Please check your internet connection and try again.",
        variant: "destructive"
      });
      return;
    }

    // Check for JavaScript support
    if (typeof Promise === 'undefined') {
      console.error('Google Maps: Promise not supported in this browser');
      toast({
        title: "Browser Compatibility Issue",
        description: "Please use a more recent browser version.",
        variant: "destructive"
      });
      return;
    }

    // iOS-specific checks
    if (deviceInfo.isIOS) {
      // Check iOS version for compatibility
      const iosVersion = navigator.userAgent.match(/OS (\d+)_/);
      if (iosVersion && parseInt(iosVersion[1]) < 12) {
        console.warn('Google Maps: Old iOS version detected');
        toast({
          title: "iOS Compatibility",
          description: "Maps may not work properly on older iOS versions. Please update your device if possible.",
          variant: "destructive"
        });
      }
    }
  }, [deviceInfo, toast]);

  // Secure API key setter with enhanced validation
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

    console.log("Setting new API key for device:", deviceInfo.isMobile ? 'mobile' : 'desktop');
    secureLog("Setting new API key", { deviceType: deviceInfo.isMobile ? 'mobile' : 'desktop' });
    
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
    isApiKeyValid,
    deviceInfo // Expose device info for components that need it
  };
}
