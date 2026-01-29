// Export utilities for different formats

// Export as Postman Collection
export function exportAsPostman(endpoints, collectionName = 'API Playground Collection') {
  const collection = {
    info: {
      name: collectionName,
      description: 'Exported from API Playground',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
    },
    item: endpoints.map(endpoint => ({
      name: endpoint.name,
      request: {
        method: endpoint.method,
        header: [
          {
            key: 'Content-Type',
            value: 'application/json'
          }
        ],
        body: endpoint.method !== 'GET' ? {
          mode: 'raw',
          raw: JSON.stringify(endpoint.response, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        } : undefined,
        url: {
          raw: `{{baseUrl}}${endpoint.path}`,
          host: ['{{baseUrl}}'],
          path: endpoint.path.split('/').filter(Boolean)
        }
      },
      response: [
        {
          name: 'Success Response',
          originalRequest: {
            method: endpoint.method,
            url: {
              raw: `{{baseUrl}}${endpoint.path}`,
              host: ['{{baseUrl}}'],
              path: endpoint.path.split('/').filter(Boolean)
            }
          },
          status: getStatusText(endpoint.status),
          code: endpoint.status,
          body: JSON.stringify(endpoint.response, null, 2)
        }
      ]
    })),
    variable: [
      {
        key: 'baseUrl',
        value: 'http://localhost:3001'
      }
    ]
  };

  return JSON.stringify(collection, null, 2);
}

// Export as OpenAPI/Swagger 3.0
export function exportAsOpenAPI(endpoints, info = {}) {
  const spec = {
    openapi: '3.0.0',
    info: {
      title: info.title || 'API Playground API',
      description: info.description || 'API specification exported from API Playground',
      version: info.version || '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Mock server'
      }
    ],
    paths: {}
  };

  // Group endpoints by path
  endpoints.forEach(endpoint => {
    if (!spec.paths[endpoint.path]) {
      spec.paths[endpoint.path] = {};
    }

    spec.paths[endpoint.path][endpoint.method.toLowerCase()] = {
      summary: endpoint.name,
      description: `${endpoint.method} ${endpoint.path}`,
      responses: {
        [endpoint.status]: {
          description: getStatusText(endpoint.status),
          content: {
            'application/json': {
              schema: generateSchema(endpoint.response),
              example: endpoint.response
            }
          }
        }
      }
    };

    // Add request body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
      spec.paths[endpoint.path][endpoint.method.toLowerCase()].requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: generateSchema(endpoint.response),
            example: endpoint.response
          }
        }
      };
    }
  });

  return JSON.stringify(spec, null, 2);
}

// Generate JSON Schema from response object
function generateSchema(obj) {
  if (obj === null) return { type: 'null' };
  if (Array.isArray(obj)) {
    return {
      type: 'array',
      items: obj.length > 0 ? generateSchema(obj[0]) : { type: 'object' }
    };
  }
  if (typeof obj === 'object') {
    const properties = {};
    Object.keys(obj).forEach(key => {
      properties[key] = generateSchema(obj[key]);
    });
    return {
      type: 'object',
      properties
    };
  }
  
  const typeMap = {
    string: 'string',
    number: 'number',
    boolean: 'boolean'
  };
  return { type: typeMap[typeof obj] || 'string' };
}

// Export as JSON
export function exportAsJSON(endpoints) {
  return JSON.stringify(endpoints, null, 2);
}

// Import from Postman Collection
export function importFromPostman(jsonString) {
  try {
    const collection = JSON.parse(jsonString);
    
    if (!collection.item || !Array.isArray(collection.item)) {
      throw new Error('Invalid Postman collection format');
    }

    const endpoints = collection.item.map((item, index) => {
      const request = item.request;
      const path = typeof request.url === 'string' 
        ? request.url 
        : `/${request.url.path.join('/')}`;

      // Try to get response from examples
      let response = { message: 'Success' };
      let status = 200;

      if (item.response && item.response[0]) {
        try {
          response = JSON.parse(item.response[0].body || '{}');
          status = item.response[0].code || 200;
        } catch (e) {
          // Use default
        }
      } else if (request.body && request.body.raw) {
        try {
          response = JSON.parse(request.body.raw);
        } catch (e) {
          // Use default
        }
      }

      return {
        id: Date.now() + index,
        name: item.name || 'Imported Endpoint',
        method: request.method || 'GET',
        path: path.replace('{{baseUrl}}', ''),
        response,
        status,
        delay: 0
      };
    });

    return endpoints;
  } catch (error) {
    throw new Error(`Failed to import Postman collection: ${error.message}`);
  }
}

// Code generation
export function generateCode(endpoint, language) {
  const url = `http://localhost:3001${endpoint.path}`;
  const body = endpoint.method !== 'GET' ? JSON.stringify(endpoint.response, null, 2) : null;

  switch (language) {
    case 'fetch':
      return generateFetch(url, endpoint.method, body);
    case 'axios':
      return generateAxios(url, endpoint.method, body);
    case 'curl':
      return generateCurl(url, endpoint.method, body);
    case 'xhr':
      return generateXHR(url, endpoint.method, body);
    default:
      return generateFetch(url, endpoint.method, body);
  }
}

function generateFetch(url, method, body) {
  if (method === 'GET') {
    return `fetch('${url}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
  }

  return `fetch('${url}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${body})
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
}

function generateAxios(url, method, body) {
  if (method === 'GET') {
    return `axios.get('${url}')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`;
  }

  return `axios.${method.toLowerCase()}('${url}', ${body})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`;
}

function generateCurl(url, method, body) {
  if (method === 'GET') {
    return `curl '${url}'`;
  }

  const bodyStr = body ? body.replace(/\n/g, '') : '{}';
  return `curl -X ${method} '${url}' \\
  -H 'Content-Type: application/json' \\
  -d '${bodyStr}'`;
}

function generateXHR(url, method, body) {
  if (method === 'GET') {
    return `const xhr = new XMLHttpRequest();
xhr.open('GET', '${url}');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();`;
  }

  return `const xhr = new XMLHttpRequest();
xhr.open('${method}', '${url}');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send(JSON.stringify(${body}));`;
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
