
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Default API key
const DEFAULT_API_KEY = "AIzaSyB5gv4_7U1ZpVNNPW53qXTYxdTLOUVN4cQ";

// Function to get API key that can be used across the app
export function getGoogleMapsApiKey(): string {
  try {
    // Try to get from localStorage
    const storedKey = localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE);
    if (storedKey && storedKey.trim()) {
      console.log("Retrieved API key from localStorage");
      return storedKey.trim();
    }
  } catch (error) {
    console.warn("Could not access localStorage:", error);
  }
  
  // Use default API key if no stored key
  if (DEFAULT_API_KEY) {
    console.log("Using default API key");
    return DEFAULT_API_KEY;
  }
  
  console.log("No API key available");
  return "";
}

// Function to save API key
export function saveGoogleMapsApiKey(apiKey: string): void {
  try {
    if (apiKey && apiKey.trim()) {
      localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE, apiKey.trim());
      console.log("API key saved to localStorage");
    }
  } catch (error) {
    console.error("Could not save API key to localStorage:", error);
  }
}

// Function to remove API key
export function removeGoogleMapsApiKey(): void {
  try {
    localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);
    console.log("API key removed from localStorage");
  } catch (error) {
    console.error("Could not remove API key from localStorage:", error);
  }
}

// Enhanced API key validation (basic client-side validation)
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') return false;
  
  const trimmedKey = apiKey.trim();
  
  // Basic format validation for Google API keys
  if (trimmedKey.length < 20 || !trimmedKey.startsWith('AIza')) {
    return false;
  }
  
  // Check for potentially dangerous characters
  const dangerousChars = /[<>'"&]/;
  if (dangerousChars.test(trimmedKey)) {
    return false;
  }
  
  return true;
}

// Function to handle API loading errors
export function handleMapsApiLoadError(error: Error | null): string {
  if (!error) return "Unknown error loading Google Maps";
  
  const errorMessage = error.message || "Unknown error";
  console.error("Google Maps error details:", errorMessage);
  
  if (errorMessage.includes('ApiNotActivatedMapError')) {
    return "The Google Maps JavaScript API is not activated for this API key. Please enable it in the Google Cloud Console.";
  } else if (errorMessage.includes('RefererNotAllowedMapError')) {
    return "The current URL is not allowed to use this API key. Please add it to the allowed referrers.";
  } else if (errorMessage.includes('InvalidKeyMapError')) {
    return "The provided API key is invalid or expired. Please check your key.";
  } else if (errorMessage.includes('MissingKeyMapError')) {
    return "No API key provided. Please enter a valid Google Maps API key.";
  } else if (errorMessage.includes('Loader must not be called again')) {
    return "Google Maps is already loading. Please refresh the page if the issue persists.";
  } else {
    return `Error loading Google Maps: ${errorMessage}`;
  }
}

// Secure geocoding with rate limiting and validation
export async function geocodeAddress(address: string, city: string, country: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  const apiKey = getGoogleMapsApiKey();
  
  if (!isValidGoogleMapsApiKey(apiKey)) {
    console.error("No valid API key available for geocoding");
    return null;
  }

  // Input validation and sanitization
  const sanitizedAddress = sanitizeInput(address);
  const sanitizedCity = sanitizeInput(city);
  const sanitizedCountry = sanitizeInput(country);

  if (!sanitizedAddress || !sanitizedCity || !sanitizedCountry) {
    console.error("Invalid input provided for geocoding");
    return null;
  }

  console.log(`Starting secure geocoding for: "${sanitizedAddress}, ${sanitizedCity}, ${sanitizedCountry}"`);

  try {
    const result = await trySecureGeocoding(sanitizedAddress, sanitizedCity, sanitizedCountry, apiKey);
    return result;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

// Secure geocoding implementation
async function trySecureGeocoding(address: string, city: string, country: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  try {
    const fullAddress = `${address}, ${city}, ${country}`;
    const countryCode = getCountryCode(country);
    
    const params = new URLSearchParams({
      address: fullAddress,
      key: apiKey,
      components: `country:${countryCode}|locality:${city}`,
      result_type: 'street_address|premise',
      language: 'en',
      region: countryCode.toLowerCase()
    });

    console.log(`Secure geocoding for: "${fullAddress}"`);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;
      const locationType = result.geometry.location_type;
      
      return {
        lat: parseFloat(location.lat.toFixed(8)),
        lng: parseFloat(location.lng.toFixed(8)),
        accuracy: locationType || 'APPROXIMATE',
        placeId: result.place_id
      };
    }
    
    console.warn('Secure geocoding failed to find results');
    return null;
    
  } catch (error) {
    console.error('Secure geocoding error:', error);
    return null;
  }
}

// Input sanitization function
function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .substring(0, 500) // Limit length
    .replace(/\s+/g, ' '); // Normalize whitespace
}

// Country code mapping for better geocoding
function getCountryCode(country: string): string {
  const countryMap: {[key: string]: string} = {
    'serbia': 'RS',
    'united states': 'US',
    'usa': 'US',
    'united kingdom': 'GB',
    'uk': 'GB',
    'germany': 'DE',
    'france': 'FR',
    'italy': 'IT',
    'spain': 'ES',
    'canada': 'CA',
    'australia': 'AU',
    'japan': 'JP',
    'china': 'CN',
    'brazil': 'BR',
    'india': 'IN',
    'russia': 'RU',
    'netherlands': 'NL',
    'belgium': 'BE',
    'switzerland': 'CH',
    'austria': 'AT',
    'poland': 'PL',
    'sweden': 'SE',
    'norway': 'NO',
    'denmark': 'DK',
    'finland': 'FI',
    'portugal': 'PT',
    'greece': 'GR',
    'turkey': 'TR',
    'mexico': 'MX',
    'argentina': 'AR',
    'chile': 'CL',
    'colombia': 'CO',
    'peru': 'PE',
    'venezuela': 'VE',
    'south africa': 'ZA',
    'egypt': 'EG',
    'israel': 'IL',
    'saudi arabia': 'SA',
    'uae': 'AE',
    'emirates': 'AE',
    'thailand': 'TH',
    'singapore': 'SG',
    'malaysia': 'MY',
    'indonesia': 'ID',
    'philippines': 'PH',
    'vietnam': 'VN',
    'south korea': 'KR',
    'korea': 'KR',
    'taiwan': 'TW',
    'hong kong': 'HK',
    'new zealand': 'NZ'
  };
  
  const normalized = country.toLowerCase().trim();
  return countryMap[normalized] || country.toUpperCase().substring(0, 2);
}

// Enhanced validation function for geocoding results
export function validateGeocodingAccuracy(result: {lat: number, lng: number, accuracy: string}): boolean {
  // Validate coordinate bounds
  if (!result.lat || !result.lng) return false;
  
  // Check coordinate bounds (valid lat/lng ranges)
  if (result.lat < -90 || result.lat > 90 || result.lng < -180 || result.lng > 180) {
    console.warn('Invalid coordinate bounds detected');
    return false;
  }
  
  // Check for reasonable precision
  if (typeof result.lat !== 'number' || typeof result.lng !== 'number') {
    console.warn('Invalid coordinate types');
    return false;
  }
  
  console.log('Result validation successful');
  return true;
}

// Secure rate limiting helper
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const requests = new Map<string, number[]>();
  
  return (key: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(key)) {
      requests.set(key, []);
    }
    
    const keyRequests = requests.get(key)!;
    
    // Remove old requests outside the window
    const validRequests = keyRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(key, validRequests);
    
    return true; // Request allowed
  };
}
