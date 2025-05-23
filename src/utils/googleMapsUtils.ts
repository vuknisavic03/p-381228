
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Script ID for Google Maps
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

/**
 * Default API key - this is a working key used for development
 * Note: In production, you would want to use environmental variables or user-provided keys
 */
const DEFAULT_API_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"; // This is a functional demo key

// Function to get API key from storage or default
export function getGoogleMapsApiKey(): string {
  const storedKey = localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE);
  return storedKey || DEFAULT_API_KEY;
}

// Function to save API key
export function saveGoogleMapsApiKey(apiKey: string): void {
  localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, apiKey);
}

// Function to remove API key
export function removeGoogleMapsApiKey(): void {
  localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);
}

// Check if the API key is valid (simple client-side validation)
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  return Boolean(apiKey && apiKey.trim().length > 0);
}

// Remove existing Google Maps script tags
export function removeExistingGoogleMapsScript(): void {
  // Remove the script tag with our specific ID
  const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
  if (existingScript) {
    existingScript.remove();
  }

  // Also remove any other Google Maps scripts that might be present
  const allScripts = document.getElementsByTagName('script');
  for (let i = 0; i < allScripts.length; i++) {
    const src = allScripts[i].src;
    if (src && src.includes('maps.googleapis.com/maps/api/js')) {
      allScripts[i].remove();
      i--; // Adjust index after removal
    }
  }
  
  // Clean up any Google Maps global objects
  cleanupGoogleMapsObjects();
}

// Clean up Google global objects
export function cleanupGoogleMapsObjects(): void {
  if (window.google) {
    // Safely try to clean up Maps API objects
    try {
      // @ts-ignore
      if (window.google.maps && window.google.maps.event) {
        // @ts-ignore
        window.google.maps.event.clearInstanceListeners(window);
      }
      delete window.google;
    } catch (e) {
      console.error('Error cleaning up Google Maps objects:', e);
    }
  }
  
  // Clean up any callback handlers
  if (window.initMap) {
    delete window.initMap;
  }
}

// Function to handle API loading errors
export function handleMapsApiLoadError(error: Error): string {
  if (error.message.includes('ApiNotActivatedMapError')) {
    return "The Google Maps API is not activated for this key. Please check the Google Cloud Console.";
  } else if (error.message.includes('RefererNotAllowedMapError')) {
    return "This website is not allowed to use this API key.";
  } else if (error.message.includes('InvalidKeyMapError')) {
    return "The provided API key is invalid or expired.";
  } else if (error.message.includes('MissingKeyMapError')) {
    return "No API key provided. Please enter a valid Google Maps API key.";
  } else {
    return `Error loading Google Maps: ${error.message}`;
  }
}

// Manual script loading function - useful for more control
export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  console.log("Manually loading Google Maps with API key:", apiKey ? "Key provided" : "No key");
  
  // First ensure any existing scripts are cleaned up
  removeExistingGoogleMapsScript();
  
  return new Promise((resolve, reject) => {
    // Create a new script element
    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&v=weekly`;
    script.async = true;
    script.defer = true;
    
    // Define success handler
    script.onload = () => {
      console.log("Google Maps script loaded successfully via manual loader");
      resolve();
    };
    
    // Define error handler
    script.onerror = (error) => {
      console.error("Error loading Google Maps script:", error);
      reject(new Error('Google Maps script failed to load.'));
    };
    
    // Append the script to the document
    document.head.appendChild(script);
  });
}
