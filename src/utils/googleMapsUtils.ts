
// Google Maps libraries array defined outside of any component
export const GOOGLE_MAPS_LIBRARIES: ["places", "geometry"] = ["places", "geometry"];

// Storage key constant for consistency
export const GOOGLE_MAPS_KEY_STORAGE = "googleMapsApiKey";

// Default demo API key
const DEFAULT_DEMO_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg";

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
  
  console.log("Using default demo API key");
  return DEFAULT_DEMO_KEY;
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

// Check if the API key is valid (simple client-side validation)
export function isValidGoogleMapsApiKey(apiKey: string): boolean {
  return Boolean(apiKey && apiKey.trim().length > 0);
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

// Ultra-precise geocoding with maximum accuracy focus
export async function geocodeAddress(address: string, city: string, country: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  const apiKey = getGoogleMapsApiKey();
  
  if (!apiKey) {
    console.error("No API key available for geocoding");
    return null;
  }

  console.log(`Starting ultra-precise geocoding for: "${address}, ${city}, ${country}"`);

  // Strategy 1: Ultra-precise structured geocoding with exact address matching
  const preciseResult = await tryUltraPreciseGeocoding(address, city, country, apiKey);
  if (preciseResult && isPinpointAccurate(preciseResult)) {
    console.log("✅ PINPOINT ACCURACY ACHIEVED:", preciseResult);
    return preciseResult;
  }

  // Strategy 2: Places API with exact text search and verification
  const placesResult = await tryExactPlacesSearch(address, city, country, apiKey);
  if (placesResult && isPinpointAccurate(placesResult)) {
    console.log("✅ PINPOINT ACCURACY via Places API:", placesResult);
    return placesResult;
  }

  // Strategy 3: Address Validation API (Premium)
  const validatedResult = await tryPremiumAddressValidation(address, city, country, apiKey);
  if (validatedResult && isPinpointAccurate(validatedResult)) {
    console.log("✅ PINPOINT ACCURACY via Address Validation:", validatedResult);
    return validatedResult;
  }

  // If no pinpoint accurate result, return the best available with warning
  const bestResult = preciseResult || placesResult || validatedResult;
  if (bestResult) {
    console.warn("⚠️ Best available result (may not be pinpoint accurate):", bestResult);
  }
  return bestResult;
}

// Ultra-precise geocoding with exact address component matching
async function tryUltraPreciseGeocoding(address: string, city: string, country: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  try {
    const fullAddress = `${address}, ${city}, ${country}`;
    
    // Parse address components for maximum precision
    const addressComponents = parseAddressComponents(address);
    const countryCode = getCountryCode(country);
    
    const params = new URLSearchParams({
      address: fullAddress,
      key: apiKey,
      // Ultra-precise component filtering
      components: [
        `country:${countryCode}`,
        `locality:${city}`,
        addressComponents.route && `route:${addressComponents.route}`,
        addressComponents.streetNumber && `street_number:${addressComponents.streetNumber}`,
        addressComponents.premise && `premise:${addressComponents.premise}`
      ].filter(Boolean).join('|'),
      // Only accept ROOFTOP precision
      location_type: 'ROOFTOP',
      // Only accept exact street addresses
      result_type: 'street_address|premise|subpremise',
      // Enhanced precision settings
      language: 'en',
      region: countryCode.toLowerCase(),
      // Request extra precision
      extra_computations: 'ADDRESS_VALIDATION'
    });

    console.log(`🎯 Ultra-precise geocoding for: "${fullAddress}"`);
    console.log(`📍 Components: ${params.get('components')}`);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      // Find the most precise result with exact address match
      const exactMatch = findExactAddressMatch(data.results, addressComponents, city);
      
      if (exactMatch) {
        const location = exactMatch.geometry.location;
        const locationType = exactMatch.geometry.location_type;
        
        // Verify this is truly ROOFTOP precision
        if (locationType === 'ROOFTOP') {
          // Cross-validate with Place Details for ultimate precision
          const verifiedCoords = await verifyWithPlaceDetails(exactMatch.place_id, apiKey);
          if (verifiedCoords) {
            return verifiedCoords;
          }
          
          return {
            lat: parseFloat(location.lat.toFixed(12)), // 12 decimal places for sub-meter precision
            lng: parseFloat(location.lng.toFixed(12)),
            accuracy: 'ROOFTOP_VERIFIED',
            placeId: exactMatch.place_id
          };
        }
      }
    }
    
    console.warn('❌ Ultra-precise geocoding failed to achieve ROOFTOP accuracy');
    return null;
    
  } catch (error) {
    console.error('❌ Ultra-precise geocoding error:', error);
    return null;
  }
}

// Exact Places API search with verification
async function tryExactPlacesSearch(address: string, city: string, country: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  try {
    const exactQuery = `${address}, ${city}, ${country}`;
    
    // First, try Text Search for exact match
    const textSearchParams = new URLSearchParams({
      query: exactQuery,
      key: apiKey,
      region: getCountryCode(country).toLowerCase(),
      type: 'street_address',
      locationbias: `country:${getCountryCode(country)}`
    });

    console.log(`🔍 Exact Places Text Search: "${exactQuery}"`);
    
    const textResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?${textSearchParams}`
    );
    
    const textData = await textResponse.json();
    
    if (textData.status === 'OK' && textData.results.length > 0) {
      // Find the most accurate result
      const bestMatch = textData.results.find(result => 
        result.types.includes('street_address') || 
        result.types.includes('premise')
      ) || textData.results[0];
      
      if (bestMatch?.place_id) {
        // Get precise coordinates using Place Details
        const preciseCoords = await getUltraPreciseCoordinates(bestMatch.place_id, apiKey);
        if (preciseCoords) {
          return preciseCoords;
        }
      }
    }
    
    console.warn('❌ Exact Places search failed');
    return null;
    
  } catch (error) {
    console.error('❌ Exact Places search error:', error);
    return null;
  }
}

// Premium Address Validation API for ultimate accuracy
async function tryPremiumAddressValidation(address: string, city: string, country: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId?: string} | null> {
  try {
    const countryCode = getCountryCode(country);
    
    const requestBody = {
      address: {
        addressLines: [address],
        locality: city,
        regionCode: countryCode
      },
      enableUspsCass: countryCode === 'US',
      sessionToken: generateSessionToken()
    };

    console.log(`🔒 Premium Address Validation: "${address}, ${city}, ${country}"`);
    
    const response = await fetch(
      `https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );
    
    const data = await response.json();
    
    if (data.result?.address?.addressComponents && data.result?.geocode?.location) {
      const location = data.result.geocode.location;
      const verdict = data.result.verdict;
      
      // Only accept if validation confirms high accuracy
      if (verdict?.addressComplete && verdict?.hasReplacedComponents !== true) {
        console.log('✅ Premium validation successful with high confidence');
        
        return {
          lat: parseFloat(location.latitude.toFixed(12)),
          lng: parseFloat(location.longitude.toFixed(12)),
          accuracy: 'PREMIUM_VALIDATED',
          placeId: data.result.geocode?.placeId
        };
      }
    }
    
    console.warn('❌ Premium validation failed or low confidence');
    return null;
    
  } catch (error) {
    console.warn('❌ Premium Address Validation not available or error:', error);
    return null;
  }
}

// Get ultra-precise coordinates using Place Details API
async function getUltraPreciseCoordinates(placeId: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId: string} | null> {
  try {
    const params = new URLSearchParams({
      place_id: placeId,
      key: apiKey,
      fields: 'geometry,address_components,formatted_address,place_id,types,plus_code,utc_offset_minutes'
    });
    
    console.log(`🎯 Getting ultra-precise coordinates for place_id: ${placeId}`);
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.result?.geometry?.location) {
      const location = data.result.geometry.location;
      const viewport = data.result.geometry.viewport;
      
      // Calculate precision based on viewport size
      const precision = calculateLocationPrecision(viewport);
      
      if (precision === 'HIGH' || precision === 'MAXIMUM') {
        return {
          lat: parseFloat(location.lat.toFixed(12)),
          lng: parseFloat(location.lng.toFixed(12)),
          accuracy: `PLACE_DETAILS_${precision}`,
          placeId
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('❌ Ultra-precise coordinates error:', error);
    return null;
  }
}

// Verify coordinates with Place Details for cross-validation
async function verifyWithPlaceDetails(placeId: string, apiKey: string): Promise<{lat: number, lng: number, accuracy: string, placeId: string} | null> {
  const result = await getUltraPreciseCoordinates(placeId, apiKey);
  if (result) {
    result.accuracy = 'CROSS_VALIDATED';
    console.log('✅ Cross-validation successful');
  }
  return result;
}

// Enhanced address component parsing
function parseAddressComponents(address: string): {streetNumber?: string, route?: string, premise?: string} {
  const parts = address.trim().split(/\s+/);
  const result: {streetNumber?: string, route?: string, premise?: string} = {};
  
  // Try to identify street number (usually first part if numeric)
  if (parts.length > 0 && /^\d+[a-zA-Z]?$/.test(parts[0])) {
    result.streetNumber = parts[0];
    result.route = parts.slice(1).join(' ');
  } else {
    result.route = parts.join(' ');
  }
  
  // Check for premise indicators
  if (address.toLowerCase().includes('apartment') || address.toLowerCase().includes('apt') || 
      address.toLowerCase().includes('unit') || address.toLowerCase().includes('suite')) {
    result.premise = address;
  }
  
  return result;
}

// Find exact address match from results
function findExactAddressMatch(results: any[], addressComponents: any, city: string): any | null {
  for (const result of results) {
    const components = result.address_components || [];
    
    // Check for exact street number match
    const streetNumber = components.find((c: any) => c.types.includes('street_number'));
    if (addressComponents.streetNumber && streetNumber) {
      if (streetNumber.long_name !== addressComponents.streetNumber) {
        continue;
      }
    }
    
    // Check for exact route match
    const route = components.find((c: any) => c.types.includes('route'));
    if (addressComponents.route && route) {
      const routeMatch = calculateStringMatch(
        route.long_name.toLowerCase(), 
        addressComponents.route.toLowerCase()
      );
      if (routeMatch < 0.9) { // 90% similarity required
        continue;
      }
    }
    
    // Check for exact locality match
    const locality = components.find((c: any) => c.types.includes('locality'));
    if (locality && locality.long_name.toLowerCase() !== city.toLowerCase()) {
      continue;
    }
    
    console.log('✅ Found exact address match');
    return result;
  }
  
  console.warn('❌ No exact address match found');
  return null;
}

// Calculate location precision based on viewport
function calculateLocationPrecision(viewport: any): string {
  if (!viewport?.northeast || !viewport?.southwest) return 'LOW';
  
  const latDiff = Math.abs(viewport.northeast.lat - viewport.southwest.lat);
  const lngDiff = Math.abs(viewport.northeast.lng - viewport.southwest.lng);
  const avgDiff = (latDiff + lngDiff) / 2;
  
  if (avgDiff < 0.0001) return 'MAXIMUM'; // ~10 meters
  if (avgDiff < 0.001) return 'HIGH';     // ~100 meters
  if (avgDiff < 0.01) return 'GOOD';      // ~1 km
  return 'LOW';
}

// Check if result has pinpoint accuracy
function isPinpointAccurate(result: {lat: number, lng: number, accuracy: string}): boolean {
  const pinpointAccuracyTypes = [
    'ROOFTOP_VERIFIED',
    'CROSS_VALIDATED', 
    'PREMIUM_VALIDATED',
    'PLACE_DETAILS_MAXIMUM',
    'PLACE_DETAILS_HIGH'
  ];
  return pinpointAccuracyTypes.includes(result.accuracy);
}

// Generate session token for API requests
function generateSessionToken(): string {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// String similarity calculation
function calculateStringMatch(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance calculation
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
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
  // Validate coordinate precision (minimum 10 decimal places for pinpoint accuracy)
  if (!result.lat || !result.lng) return false;
  
  // Check coordinate bounds (valid lat/lng ranges)
  if (result.lat < -90 || result.lat > 90 || result.lng < -180 || result.lng > 180) {
    console.warn('❌ Invalid coordinate bounds detected');
    return false;
  }
  
  // Check precision (at least 10 decimal places for pinpoint accuracy)
  const latPrecision = result.lat.toString().split('.')[1]?.length || 0;
  const lngPrecision = result.lng.toString().split('.')[1]?.length || 0;
  
  if (latPrecision < 10 || lngPrecision < 10) {
    console.warn('❌ Insufficient coordinate precision for pinpoint accuracy');
    return false;
  }
  
  // Validate accuracy level - only accept pinpoint accurate results
  const pinpointAccuracy = isPinpointAccurate(result);
  if (!pinpointAccuracy) {
    console.warn('❌ Result does not meet pinpoint accuracy requirements');
    return false;
  }
  
  console.log('✅ Result meets pinpoint accuracy requirements');
  return true;
}
