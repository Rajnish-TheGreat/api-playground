// Service Worker for in-browser mock server
const SW_VERSION = 'v1';
const CACHE_NAME = `api-playground-${SW_VERSION}`;

export function registerServiceWorker(endpoints) {
  if ('serviceWorker' in navigator) {
    const swCode = `
      const ENDPOINTS = ${JSON.stringify(endpoints)};
      
      self.addEventListener('install', (event) => {
        console.log('[SW] Installing service worker...');
        self.skipWaiting();
      });

      self.addEventListener('activate', (event) => {
        console.log('[SW] Activating service worker...');
        event.waitUntil(self.clients.claim());
      });

      self.addEventListener('fetch', (event) => {
        const url = new URL(event.request.url);
        
        // Only intercept requests to /api/*
        if (!url.pathname.startsWith('/api/')) {
          return;
        }

        event.respondWith(handleApiRequest(event.request));
      });

      async function handleApiRequest(request) {
        const url = new URL(request.url);
        const method = request.method;
        const path = url.pathname;

        console.log(\`[SW] Intercepting: \${method} \${path}\`);

        // Find matching endpoint
        const endpoint = ENDPOINTS.find(ep => 
          ep.path === path && ep.method === method
        );

        if (endpoint) {
          // Simulate delay
          if (endpoint.delay > 0) {
            await new Promise(resolve => setTimeout(resolve, endpoint.delay));
          }

          // Create mock response
          const response = new Response(
            JSON.stringify(endpoint.response),
            {
              status: endpoint.status || 200,
              statusText: getStatusText(endpoint.status || 200),
              headers: {
                'Content-Type': 'application/json',
                'X-Mock-Server': 'API Playground',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
              }
            }
          );

          return response;
        }

        // No matching endpoint
        return new Response(
          JSON.stringify({
            error: 'Endpoint not found',
            path: path,
            method: method,
            message: 'This endpoint is not configured in the mock server'
          }),
          {
            status: 404,
            statusText: 'Not Found',
            headers: {
              'Content-Type': 'application/json',
              'X-Mock-Server': 'API Playground'
            }
          }
        );
      }

      function getStatusText(status) {
        const statusTexts = {
          200: 'OK',
          201: 'Created',
          204: 'No Content',
          400: 'Bad Request',
          401: 'Unauthorized',
          403: 'Forbidden',
          404: 'Not Found',
          500: 'Internal Server Error'
        };
        return statusTexts[status] || 'Unknown';
      }
    `;

    // Create blob URL for service worker
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);

    return navigator.serviceWorker
      .register(swUrl, { scope: '/' })
      .then((registration) => {
        console.log('[Main] Service Worker registered:', registration);
        return registration;
      })
      .catch((error) => {
        console.error('[Main] Service Worker registration failed:', error);
        throw error;
      });
  }

  throw new Error('Service Workers are not supported in this browser');
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        const promises = registrations.map((registration) => registration.unregister());
        return Promise.all(promises);
      })
      .then(() => {
        console.log('[Main] Service Worker unregistered');
      })
      .catch((error) => {
        console.error('[Main] Service Worker unregistration failed:', error);
        throw error;
      });
  }

  return Promise.resolve();
}

export function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator;
}
