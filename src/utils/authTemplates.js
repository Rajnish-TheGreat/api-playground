// Authentication templates for common auth patterns

export const AUTH_TEMPLATES = {
  none: {
    name: 'No Auth',
    description: 'No authentication required',
    headers: []
  },
  bearer: {
    name: 'Bearer Token',
    description: 'JWT or OAuth 2.0 Bearer token',
    headers: [
      { key: 'Authorization', value: 'Bearer YOUR_TOKEN_HERE', enabled: true }
    ]
  },
  apiKey: {
    name: 'API Key',
    description: 'API key in header',
    headers: [
      { key: 'X-API-Key', value: 'YOUR_API_KEY', enabled: true }
    ]
  },
  basic: {
    name: 'Basic Auth',
    description: 'Username and password',
    headers: [
      { key: 'Authorization', value: 'Basic BASE64_ENCODED_CREDENTIALS', enabled: true }
    ],
    note: 'Format: Basic base64(username:password)'
  },
  oauth2: {
    name: 'OAuth 2.0',
    description: 'OAuth 2.0 access token',
    headers: [
      { key: 'Authorization', value: 'Bearer YOUR_ACCESS_TOKEN', enabled: true }
    ]
  },
  custom: {
    name: 'Custom Header',
    description: 'Custom authentication header',
    headers: [
      { key: 'X-Custom-Auth', value: 'YOUR_AUTH_VALUE', enabled: true }
    ]
  },
  jwt: {
    name: 'JWT Token',
    description: 'JSON Web Token',
    headers: [
      { key: 'Authorization', value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', enabled: true }
    ]
  },
  awsSignature: {
    name: 'AWS Signature',
    description: 'AWS Signature Version 4',
    headers: [
      { key: 'Authorization', value: 'AWS4-HMAC-SHA256 Credential=...', enabled: true },
      { key: 'X-Amz-Date', value: '20240124T000000Z', enabled: true }
    ]
  }
};

// Generate auth headers based on template
export function applyAuthTemplate(templateKey) {
  const template = AUTH_TEMPLATES[templateKey];
  if (!template) return [];
  return JSON.parse(JSON.stringify(template.headers)); // Deep clone
}

// Encode basic auth credentials
export function encodeBasicAuth(username, password) {
  const credentials = `${username}:${password}`;
  return btoa(credentials);
}

// Validate JWT format
export function isValidJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  try {
    // Try to decode header and payload
    JSON.parse(atob(parts[0]));
    JSON.parse(atob(parts[1]));
    return true;
  } catch (e) {
    return false;
  }
}

// Parse JWT token
export function parseJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid JWT format');
    
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    
    return {
      header,
      payload,
      signature: parts[2]
    };
  } catch (e) {
    throw new Error(`Failed to parse JWT: ${e.message}`);
  }
}
