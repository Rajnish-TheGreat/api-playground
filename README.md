# 🎮 API Playground

> **Professional API Testing & Mock Server Generator**

A clean, enterprise-grade web application for testing APIs and generating mock servers. Built with a focus on professional UI/UX, avoiding flashy "vibe-coded" designs in favor of functional, Postman-style aesthetics.

![Status](https://img.shields.io/badge/Status-Live-success)
![Node Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)

[Quick Start](#-quick-start) • [Features](#-features) • [Tech Stack](#️-tech-stack) • [Demo](#-how-to-use)

---

## ✨ Features

### 🎯 **Professional API Testing**
- **Multiple HTTP Methods** - GET, POST, PUT, DELETE, PATCH
- **Request Builder** - Headers, body, query params
- **Real-time Testing** - Instant API call simulation
- **Response Viewer** - Status, headers, body with syntax highlighting
- **Request History** - Track all your API calls
- **Code Generation** - Export as fetch, axios, curl, XHR

### 🖥️ **Mock Server Generator**
- **Service Worker-Based** - Real in-browser mock server
- **Custom Responses** - Define status codes, delays, data
- **Multiple Endpoints** - Manage unlimited API endpoints
- **Server Logs** - Monitor requests in real-time
- **One-Click Start** - Toggle server on/off instantly
- **Intercept Requests** - Service Worker intercepts /api/* routes

### 📊 **Endpoint Management**
- **Visual Sidebar** - Browse all endpoints at a glance
- **Quick Search** - Find endpoints instantly
- **Method Badges** - Color-coded for easy identification
- **Duplicate & Edit** - Quick endpoint creation
- **Response Templates** - Pre-built response patterns

### 🎨 **Professional UI/UX**
- **Clean Minimalist Design** - No gradients, no flashy effects
- **Postman-Inspired Layout** - Familiar, professional interface
- **Dark Mode** - Eye-friendly theme with persistence
- **Responsive Design** - Works on all screen sizes
- **Keyboard Shortcuts** - Fast workflow (Ctrl+/)
- **Professional Typography** - Inter + JetBrains Mono

### 💾 **Import/Export**
- **JSON Export** - Save your API collections
- **Postman Import** ✅ - Import existing collections
- **OpenAPI/Swagger** ✅ - Generate specifications
- **Code Generation** ✅ - Export as fetch/axios/curl code

### 🔐 **Authentication**
- **Auth Templates** - Bearer, API Key, Basic Auth, JWT
- **OAuth 2.0 Support** - OAuth token templates
- **AWS Signature** - AWS Signature V4 template
- **Custom Headers** - Flexible authentication options

---

## 🚀 Quick Start

### Installation
```bash
cd api-playground
npm install
npm run dev
```

Visit: **http://localhost:5173**

### Building for Production
```bash
npm run build
npm run preview
```

---

## 🎯 How to Use

### 1. **Create an Endpoint**
- Click "+ " button in the sidebar
- Choose HTTP method (GET, POST, etc.)
- Set endpoint path `/api/endpoint`
- Define mock response (JSON)
- Click "Save"

### 2. **Test the Endpoint**
- Select endpoint from sidebar
- Click "Send" button
- View response in right panel
- Check status, time, and data

### 3. **Start Mock Server**
- Click "Start Server" at bottom
- Server runs on `http://localhost:3001`
- All endpoints are now live
- Monitor requests in logs

### 4. **Customize Responses**
- Go to "Config" tab
- Set status code (200, 404, 500, etc.)
- Add response delay (simulate latency)
- Update response body

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite 4** - Build tool & dev server
- **Tailwind CSS 3** - Utility-first styling
- **Lucide React** - Professional icon library
- **Axios** - HTTP client
- **Service Workers** ✅ - In-browser mock server

---

## 📁 Project Structure

```
api-playground/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx              # Endpoints list
│   │   ├── RequestPanel.jsx         # Request builder
│   │   ├── ResponsePanel.jsx        # Response viewer
│   │   └── MockServerPanel.jsx      # Server controls & logs
│   ├── App.jsx                      # Main application
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Professional styles
├── public/                          # Static assets
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
└── postcss.config.js                # PostCSS configuration
```

---

## 🎨 Design Philosophy

### **Inspired By**
- **Postman** - Layout and workflow
- **VS Code** - Color scheme and terminals
- **GitHub** - Clean, professional UI
- **Swagger UI** - API documentation style

---

## 🎯 Key Highlights

### **Competitive Advantages:**
- More professional than flashy playground tools
- Cleaner UI than complex API clients
- Easier to use than Swagger Editor
- Browser-based (no installation needed)
- Open source & customizable

---

## 🚀 Performance

- **Build Size**: ~197 KB JS (60 KB gzipped)
- **Initial Load**: < 2 seconds
- **Response Time**: Instant (mocked)
- **Smooth**: 60fps scrolling
- **Responsive**: All screen sizes

---

## 🌐 Browser Support

- ✅ Chrome/Edge 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

---

## ⌨️ Keyboard Shortcuts

Master the API Playground with these shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Send request |
| `Ctrl+N` | New endpoint |
| `Ctrl+E` | Export collection |
| `Ctrl+Shift+C` | Generate code |
| `Ctrl+Shift+T` | Open templates |
| `Ctrl+Shift+D` | Toggle dark mode |
| `Ctrl+/` | Show all shortcuts |
| `Escape` | Close modals |

---

## 🎨 New Features Highlights

### 🔧 **Service Worker Mock Server**
Real in-browser API mocking using Service Workers. Intercepts `/api/*` requests and serves your mock responses with configurable delays and status codes.

### 📥 **Import/Export**
- **Import** Postman collections directly
- **Export** as Postman, OpenAPI/Swagger, or JSON
- Share collections with your team

### 💻 **Code Generation**
Generate ready-to-use code in multiple formats:
- JavaScript Fetch
- Axios
- cURL
- XMLHttpRequest

### 🔐 **Authentication Templates**
Quick-start with common auth patterns:
- Bearer Token (JWT/OAuth)
- API Key
- Basic Auth
- Custom headers
- AWS Signature V4

### 🌙 **Dark Mode**
Professional dark theme with automatic persistence. Perfect for late-night coding sessions.

### 📚 **Response Templates**
30+ pre-built response templates:
- User management
- E-commerce products
- Blog posts
- Error responses
- Pagination
- And more!

---

## 🎓 Learning Value

This project demonstrates:
- Professional UI/UX design principles
- Component architecture in React
- State management
- HTTP request/response handling
- Mock data generation
- LocalStorage persistence
- Tailwind CSS best practices
- Responsive design patterns

---

## 💡 Use Cases

### **For Frontend Developers:**
- Test API integrations before backend is ready
- Prototype with realistic mock data
- Debug API responses
- Share API contracts with team

### **For Backend Developers:**
- Document API endpoints visually
- Test different response scenarios
- Simulate error conditions
- Demo APIs to stakeholders

### **For Students:**
- Learn HTTP methods and status codes
- Practice API design
- Understand request/response cycle
- Build API testing skills

---

## 🐛 Troubleshooting

### Port already in use?
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Or change port in vite.config.js
```

### Build fails?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles not loading?
```bash
# Rebuild Tailwind
npm run build
```

---

## 📄 License

MIT License - Free to use and modify

---

## 🎉 Try It Now!

**Visit:** http://localhost:5173

**Sample Endpoints to Try:**
```
GET  /api/users          - List all users
POST /api/users          - Create new user
GET  /api/users/:id      - Get user by ID
PUT  /api/users/:id      - Update user
DELETE /api/users/:id    - Delete user
```

---

**Made with ❤️ for Hack Club Challenge**  
