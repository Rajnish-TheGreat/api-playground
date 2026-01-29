// Common response templates for quick API mocking

export const RESPONSE_TEMPLATES = {
  // User Management
  user: {
    name: 'Single User',
    category: 'User Management',
    response: {
      id: 1,
      username: 'johndoe',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'user',
      createdAt: '2024-01-20T10:00:00Z'
    }
  },
  
  userList: {
    name: 'User List',
    category: 'User Management',
    response: {
      users: [
        {
          id: 1,
          username: 'johndoe',
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          id: 2,
          username: 'janesmith',
          email: 'jane@example.com',
          firstName: 'Jane',
          lastName: 'Smith'
        }
      ],
      total: 2,
      page: 1,
      perPage: 10
    }
  },

  // Authentication
  loginSuccess: {
    name: 'Login Success',
    category: 'Authentication',
    response: {
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refreshToken: 'refresh_token_here',
      expiresIn: 3600,
      user: {
        id: 1,
        email: 'john@example.com',
        role: 'user'
      }
    }
  },

  loginError: {
    name: 'Login Error',
    category: 'Authentication',
    response: {
      success: false,
      error: 'Invalid credentials',
      message: 'The email or password you entered is incorrect'
    }
  },

  // Products
  product: {
    name: 'Single Product',
    category: 'E-commerce',
    response: {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 299.99,
      currency: 'USD',
      category: 'Electronics',
      stock: 50,
      images: [
        'https://via.placeholder.com/400x400',
        'https://via.placeholder.com/400x400'
      ],
      rating: 4.5,
      reviews: 128
    }
  },

  productList: {
    name: 'Product List',
    category: 'E-commerce',
    response: {
      products: [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 299.99,
          image: 'https://via.placeholder.com/200x200'
        },
        {
          id: 2,
          name: 'Smart Watch',
          price: 399.99,
          image: 'https://via.placeholder.com/200x200'
        },
        {
          id: 3,
          name: 'Laptop Stand',
          price: 49.99,
          image: 'https://via.placeholder.com/200x200'
        }
      ],
      total: 3,
      page: 1
    }
  },

  // Posts/Content
  post: {
    name: 'Blog Post',
    category: 'Content',
    response: {
      id: 1,
      title: 'Getting Started with APIs',
      slug: 'getting-started-with-apis',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      excerpt: 'Learn the basics of working with APIs',
      author: {
        id: 1,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      publishedAt: '2024-01-20T10:00:00Z',
      tags: ['api', 'tutorial', 'development'],
      views: 1250
    }
  },

  // Errors
  notFound: {
    name: '404 Not Found',
    category: 'Errors',
    response: {
      error: 'Not Found',
      message: 'The requested resource was not found',
      statusCode: 404,
      timestamp: new Date().toISOString()
    }
  },

  unauthorized: {
    name: '401 Unauthorized',
    category: 'Errors',
    response: {
      error: 'Unauthorized',
      message: 'Authentication is required to access this resource',
      statusCode: 401,
      timestamp: new Date().toISOString()
    }
  },

  validationError: {
    name: '400 Validation Error',
    category: 'Errors',
    response: {
      error: 'Validation Error',
      message: 'The request contains invalid data',
      statusCode: 400,
      errors: [
        { field: 'email', message: 'Email is required' },
        { field: 'password', message: 'Password must be at least 8 characters' }
      ]
    }
  },

  // Success responses
  created: {
    name: '201 Created',
    category: 'Success',
    response: {
      success: true,
      message: 'Resource created successfully',
      data: {
        id: 123,
        createdAt: new Date().toISOString()
      }
    }
  },

  updated: {
    name: '200 Updated',
    category: 'Success',
    response: {
      success: true,
      message: 'Resource updated successfully',
      data: {
        id: 123,
        updatedAt: new Date().toISOString()
      }
    }
  },

  deleted: {
    name: '200 Deleted',
    category: 'Success',
    response: {
      success: true,
      message: 'Resource deleted successfully'
    }
  },

  // Pagination
  paginatedList: {
    name: 'Paginated List',
    category: 'Pagination',
    response: {
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ],
      pagination: {
        page: 1,
        perPage: 10,
        total: 50,
        totalPages: 5,
        hasNext: true,
        hasPrev: false
      }
    }
  },

  // Empty/Loading states
  emptyList: {
    name: 'Empty List',
    category: 'States',
    response: {
      data: [],
      total: 0,
      message: 'No items found'
    }
  },

  loadingPlaceholder: {
    name: 'Loading State',
    category: 'States',
    response: {
      loading: true,
      message: 'Fetching data...'
    }
  }
};

// Get templates by category
export function getTemplatesByCategory() {
  const categories = {};
  
  Object.entries(RESPONSE_TEMPLATES).forEach(([key, template]) => {
    const category = template.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push({ key, ...template });
  });
  
  return categories;
}

// Get template by key
export function getTemplate(key) {
  return RESPONSE_TEMPLATES[key];
}
