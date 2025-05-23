
// Stable libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

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

// Check if the API key is valid
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  return apiKey !== undefined && apiKey !== null && apiKey.trim().length > 0;
}

// Create a script ID to prevent duplicate loading
export const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';
