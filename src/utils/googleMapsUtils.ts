
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Script ID for Google Maps
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  // Try to get from localStorage
  const storedKey = localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE);
  if (storedKey) {
    return storedKey;
  }
  
  // Fallback to environment variable or demo key
  return "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"; // Default to a restricted demo key
}

// Function to save API key
export function saveGoogleMapsApiKey(apiKey: string): void {
  if (apiKey && apiKey.trim()) {
    localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, apiKey.trim());
    console.log("API key saved to localStorage");
  }
}

// Function to remove API key
export function removeGoogleMapsApiKey(): void {
  localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);
}

// Check if the API key is valid (simple client-side validation)
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  return Boolean(apiKey && apiKey.trim().length > 0);
}

// Function to handle API loading errors
export function handleMapsApiLoadError(error: Error | null): string {
  if (!error) return "Unknown error loading Google Maps";
  
  const errorMessage = error.message || "Unknown error";
  
  if (errorMessage.includes('ApiNotActivatedMapError')) {
    return "The Google Maps JavaScript API is not activated for this API key. Please enable it in the Google Cloud Console.";
  } else if (errorMessage.includes('RefererNotAllowedMapError')) {
    return "The current URL is not allowed to use this API key. Please add it to the allowed referrers.";
  } else if (errorMessage.includes('InvalidKeyMapError')) {
    return "The provided API key is invalid or expired. Please check your key.";
  } else if (errorMessage.includes('MissingKeyMapError')) {
    return "No API key provided. Please enter a valid Google Maps API key.";
  } else if (errorMessage.includes('Loader must not be called again with different options')) {
    return "Error with Google Maps configuration. Please refresh the page and try again.";
  } else {
    return `Error loading Google Maps: ${errorMessage}`;
  }
}

// Check if Google Maps is already loaded
export function isGoogleMapsLoaded(): boolean {
  // @ts-ignore
  return typeof window !== 'undefined' && Boolean(window.google && window.google.maps);
}

// Reload the page (used after API key changes)
export function reloadPage(): void {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}
