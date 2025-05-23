
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Script ID for Google Maps
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  return localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE) || "";
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

  // Clean up any Google Maps global objects
  cleanupGoogleMapsObjects();
}

// Clean up Google global objects
export function cleanupGoogleMapsObjects(): void {
  if (window.google) {
    delete window.google;
  }
  
  // Clean up any callback handlers
  if (window.initMap) {
    delete window.initMap;
  }
}
