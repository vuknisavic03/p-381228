
/**
 * Mapbox configuration
 */

// Store the token in localStorage to persist between page refreshes
export const getMapboxToken = (): string | null => {
  return localStorage.getItem('mapbox-token');
};

export const setMapboxToken = (token: string): void => {
  localStorage.setItem('mapbox-token', token);
};

export const removeMapboxToken = (): void => {
  localStorage.removeItem('mapbox-token');
};

export const isTokenValid = (token: string): boolean => {
  // Simple validation - tokens typically start with 'pk.' for public tokens
  return token.startsWith('pk.') && token.length > 10;
};
