// Security headers utility for client-side configuration

export function applySecurityHeaders() {
  // Content Security Policy (meta tag fallback)
  const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (!csp) {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://maps.googleapis.com https://maps.gstatic.com",
      "connect-src 'self' https://maps.googleapis.com"
    ].join('; ');
    document.head.appendChild(meta);
  }

  // X-XSS-Protection
  const xss = document.querySelector('meta[http-equiv="X-XSS-Protection"]');
  if (!xss) {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-XSS-Protection';
    meta.content = '1; mode=block';
    document.head.appendChild(meta);
  }

  // X-Content-Type-Options
  const contentType = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
  if (!contentType) {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-Content-Type-Options';
    meta.content = 'nosniff';
    document.head.appendChild(meta);
  }

  // Referrer Policy
  const referrer = document.querySelector('meta[name="referrer"]');
  if (!referrer) {
    const meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(meta);
  }
}

// Initialize security headers when the module loads
if (typeof window !== 'undefined') {
  // Apply headers when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySecurityHeaders);
  } else {
    applySecurityHeaders();
  }
}
