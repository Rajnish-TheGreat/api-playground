import { useState, useEffect } from 'react';
import { Send, Plus, Play, Square, Download, Share2, FileJson, Code, Moon, Sun, Keyboard, Zap, Upload } from 'lucide-react';
import Sidebar from './components/Sidebar';
import RequestPanel from './components/RequestPanel';
import ResponsePanel from './components/ResponsePanel';
import MockServerPanel from './components/MockServerPanel';
import ExportModal from './components/ExportModal';
import CodeGeneratorModal from './components/CodeGeneratorModal';
import AuthModal from './components/AuthModal';
import TemplateLibraryModal from './components/TemplateLibraryModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { registerServiceWorker, unregisterServiceWorker, isServiceWorkerSupported } from './utils/serviceWorker';
import { initTheme, toggleTheme as toggleThemeUtil } from './utils/theme';
import { importFromPostman } from './utils/exporters';

function App() {
  const [endpoints, setEndpoints] = useState([
    {
      id: 1,
      name: 'Get Users',
      method: 'GET',
      path: '/api/users',
      response: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]
      },
      status: 200,
      delay: 0
    }
  ]);

  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [mockServerRunning, setMockServerRunning] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  
  // Modal states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const currentTheme = initTheme();
    setTheme(currentTheme);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + Enter - Send request
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSendRequest();
      }
      // Ctrl/Cmd + N - New endpoint
      else if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        handleAddEndpoint();
      }
      // Ctrl/Cmd + E - Export
      else if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        setShowExportModal(true);
      }
      // Ctrl/Cmd + Shift + C - Code generator
      else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        setShowCodeGenerator(true);
      }
      // Ctrl/Cmd + Shift + T - Templates
      else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setShowTemplateLibrary(true);
      }
      // Ctrl/Cmd + Shift + D - Toggle dark mode
      else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        handleToggleTheme();
      }
      // Ctrl/Cmd + / - Keyboard shortcuts
      else if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }
      // Escape - Close modals
      else if (e.key === 'Escape') {
        setShowExportModal(false);
        setShowCodeGenerator(false);
        setShowAuthModal(false);
        setShowTemplateLibrary(false);
        setShowKeyboardShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedEndpoint]);

  const handleSendRequest = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentResponse({
        status: selectedEndpoint.status,
        statusText: selectedEndpoint.status === 200 ? 'OK' : 'Error',
        data: selectedEndpoint.response,
        headers: {
          'content-type': 'application/json',
          'x-powered-by': 'API Playground'
        },
        time: Math.floor(Math.random() * 100) + 20
      });
      setLoading(false);
    }, selectedEndpoint.delay || 100);
  };

  const handleAddEndpoint = () => {
    const newEndpoint = {
      id: Date.now(),
      name: 'New Endpoint',
      method: 'GET',
      path: '/api/new',
      response: { message: 'Success' },
      status: 200,
      delay: 0
    };
    setEndpoints([...endpoints, newEndpoint]);
    setSelectedEndpoint(newEndpoint);
  };

  const handleDeleteEndpoint = (id) => {
    const filtered = endpoints.filter(e => e.id !== id);
    setEndpoints(filtered);
    if (selectedEndpoint.id === id && filtered.length > 0) {
      setSelectedEndpoint(filtered[0]);
    }
  };

  const handleUpdateEndpoint = (updatedEndpoint) => {
    setEndpoints(endpoints.map(e => 
      e.id === updatedEndpoint.id ? updatedEndpoint : e
    ));
    setSelectedEndpoint(updatedEndpoint);
  };

  const toggleMockServer = async () => {
    if (!mockServerRunning) {
      // Start server
      if (isServiceWorkerSupported()) {
        try {
          await registerServiceWorker(endpoints);
          setMockServerRunning(true);
        } catch (error) {
          console.error('Failed to start mock server:', error);
          alert('Failed to start mock server. Service Workers may not be supported.');
        }
      } else {
        // Fallback: Just toggle state for demo
        setMockServerRunning(true);
      }
    } else {
      // Stop server
      if (isServiceWorkerSupported()) {
        try {
          await unregisterServiceWorker();
          setMockServerRunning(false);
        } catch (error) {
          console.error('Failed to stop mock server:', error);
        }
      } else {
        setMockServerRunning(false);
      }
    }
  };

  const handleToggleTheme = () => {
    const newTheme = toggleThemeUtil();
    setTheme(newTheme);
  };

  const handleImportEndpoints = (importedEndpoints) => {
    setEndpoints(importedEndpoints);
    if (importedEndpoints.length > 0) {
      setSelectedEndpoint(importedEndpoints[0]);
    }
  };

  const handleApplyTemplate = (templateResponse) => {
    if (selectedEndpoint) {
      handleUpdateEndpoint({
        ...selectedEndpoint,
        response: templateResponse
      });
    }
  };

  // Make import handler available globally for ExportModal
  useEffect(() => {
    window.handleImportSuccess = handleImportEndpoints;
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Professional Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">API Playground</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Professional API Testing & Mock Server</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowTemplateLibrary(true)}
            className="btn btn-secondary btn-sm flex items-center gap-1.5"
            title="Response Templates (Ctrl+Shift+T)"
          >
            <Zap className="w-4 h-4" />
            Templates
          </button>
          <button 
            onClick={() => setShowCodeGenerator(true)}
            className="btn btn-secondary btn-sm flex items-center gap-1.5"
            title="Generate Code (Ctrl+Shift+C)"
            disabled={!selectedEndpoint}
          >
            <Code className="w-4 h-4" />
            Code
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="btn btn-secondary btn-sm flex items-center gap-1.5"
            title="Import/Export (Ctrl+E)"
          >
            <FileJson className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setShowKeyboardShortcuts(true)}
            className="btn btn-secondary btn-sm flex items-center gap-1.5"
            title="Keyboard Shortcuts (Ctrl+/)"
          >
            <Keyboard className="w-4 h-4" />
          </button>
          <button 
            onClick={handleToggleTheme}
            className="btn btn-secondary btn-sm flex items-center gap-1.5"
            title="Toggle Theme (Ctrl+Shift+D)"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          endpoints={endpoints}
          selectedEndpoint={selectedEndpoint}
          onSelectEndpoint={setSelectedEndpoint}
          onAddEndpoint={handleAddEndpoint}
          onDeleteEndpoint={handleDeleteEndpoint}
        />

        {/* Center Panel - Request */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <RequestPanel
            endpoint={selectedEndpoint}
            onUpdateEndpoint={handleUpdateEndpoint}
            onSendRequest={handleSendRequest}
            loading={loading}
            onShowAuthModal={() => setShowAuthModal(true)}
            onShowTemplateLibrary={() => setShowTemplateLibrary(true)}
          />
        </div>

        {/* Right Panel - Response */}
        <ResponsePanel
          response={currentResponse}
          loading={loading}
        />
      </div>

      {/* Bottom Mock Server Panel */}
      <MockServerPanel
        running={mockServerRunning}
        onToggle={toggleMockServer}
        endpoints={endpoints}
      />

      {/* Modals */}
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        endpoints={endpoints}
      />
      
      <CodeGeneratorModal
        isOpen={showCodeGenerator}
        onClose={() => setShowCodeGenerator(false)}
        endpoint={selectedEndpoint}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onApplyAuth={(authTemplate) => {
          // This will be handled in RequestPanel
          console.log('Auth template applied:', authTemplate);
        }}
      />

      <TemplateLibraryModal
        isOpen={showTemplateLibrary}
        onClose={() => setShowTemplateLibrary(false)}
        onSelectTemplate={handleApplyTemplate}
      />

      <KeyboardShortcutsModal
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  );
}

export default App;
