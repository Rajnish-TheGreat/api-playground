import { useState } from 'react';
import { Send, Plus, Play, Square, Download, Share2, FileJson, Code } from 'lucide-react';
import Sidebar from './components/Sidebar';
import RequestPanel from './components/RequestPanel';
import ResponsePanel from './components/ResponsePanel';
import MockServerPanel from './components/MockServerPanel';

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

  const toggleMockServer = () => {
    setMockServerRunning(!mockServerRunning);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">API Playground</h1>
              <p className="text-xs text-gray-500">Professional API Testing & Mock Server</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary btn-sm flex items-center gap-1.5">
            <FileJson className="w-4 h-4" />
            Export
          </button>
          <button className="btn btn-secondary btn-sm flex items-center gap-1.5">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="btn btn-primary btn-sm flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            Save
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
    </div>
  );
}

export default App;
