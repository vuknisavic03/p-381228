
// Security configuration and utilities

export const SECURITY_CONFIG = {
  // Rate limiting
  API_RATE_LIMIT: {
    MAX_REQUESTS: 10,
    WINDOW_MS: 60000 // 1 minute
  },
  
  // Input validation
  MAX_INPUT_LENGTH: 500,
  ALLOWED_CHARACTERS: /^[a-zA-Z0-9\s\-.,#()\/&']+$/,
  
  // API endpoints
  ALLOWED_ORIGINS: [
    'https://maps.googleapis.com',
    'https://places.googleapis.com'
  ],
  
  // Content Security Policy
  CSP_DIRECTIVES: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "https://maps.googleapis.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https://maps.googleapis.com", "https://maps.gstatic.com"],
    'connect-src': ["'self'", "https://maps.googleapis.com"]
  }
};

// Input sanitization function
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .substring(0, SECURITY_CONFIG.MAX_INPUT_LENGTH)
    .replace(/[<>'"&]/g, '') // Remove XSS vectors
    .replace(/\s+/g, ' '); // Normalize whitespace
}

// Validate input against allowed patterns
export function validateInput(input: string, pattern?: RegExp): boolean {
  if (!input || typeof input !== 'string') return false;
  
  const sanitized = sanitizeInput(input);
  const regex = pattern || SECURITY_CONFIG.ALLOWED_CHARACTERS;
  
  return regex.test(sanitized) && sanitized.length > 0;
}

// Create Content Security Policy header
export function createCSPHeader(): string {
  const directives = Object.entries(SECURITY_CONFIG.CSP_DIRECTIVES)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
  
  return directives;
}

// Secure error logging (removes sensitive data)
export function secureLog(message: string, data?: any): void {
  const sanitizedData = data ? sanitizeLogData(data) : undefined;
  console.log(`[SECURE] ${message}`, sanitizedData);
}

// Remove sensitive information from log data
function sanitizeLogData(data: any): any {
  if (typeof data === 'string') {
    // Remove API keys and tokens
    return data.replace(/AIza[a-zA-Z0-9_-]{35}/g, '[API_KEY_REDACTED]')
               .replace(/sk_[a-zA-Z0-9]{24}/g, '[SECRET_KEY_REDACTED]')
               .replace(/pk_[a-zA-Z0-9]{24}/g, '[PUBLIC_KEY_REDACTED]');
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.toLowerCase().includes('key') || key.toLowerCase().includes('token') || key.toLowerCase().includes('password')) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeLogData(value);
      }
    }
    return sanitized;
  }
  
  return data;
}

// Validate URL safety
export function isSecureUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && 
           SECURITY_CONFIG.ALLOWED_ORIGINS.some(origin => url.startsWith(origin));
  } catch {
    return false;
  }
}

// Rate limiter implementation
export class RateLimiter {
  private requests = new Map<string, number[]>();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  check(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const keyRequests = this.requests.get(key)!;
    
    // Remove old requests
    const validRequests = keyRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }
}
