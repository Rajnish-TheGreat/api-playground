import { useState } from 'react';
import { Send, Settings } from 'lucide-react';

const RequestPanel = ({ endpoint, onUpdateEndpoint, onSendRequest, loading }) => {
  const [activeTab, setActiveTab] = useState('body');
  const [headers, setHeaders] = useState([
    { key: 'Content-Type', value: 'application/json', enabled: true }
  ]);

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  const handleMethodChange = (method) => {
    onUpdateEndpoint({ ...endpoint, method });
  };

  const handlePathChange = (path) => {
    onUpdateEndpoint({ ...endpoint, path });
  };

  const handleResponseChange = (value) => {
    try {
      const parsed = JSON.parse(value);
      onUpdateEndpoint({ ...endpoint, response: parsed });
    } catch (e) {
      // Invalid JSON, don't update
    }
  };

  const handleStatusChange = (status) => {
    onUpdateEndpoint({ ...endpoint, status: parseInt(status) });
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const updateHeader = (index, field, value) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  const removeHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  if (!endpoint) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Settings className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Select an endpoint to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Request URL Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2">
          {/* Method Selector */}
          <select
            value={endpoint.method}
            onChange={(e) => handleMethodChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded font-semibold text-sm focus-ring"
            style={{ width: '120px' }}
          >
            {methods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>

          {/* URL Input */}
          <input
            type="text"
            value={endpoint.path}
            onChange={(e) => handlePathChange(e.target.value)}
            placeholder="/api/endpoint"
            className="flex-1 input font-mono text-sm"
          />

          {/* Send Button */}
          <button
            onClick={onSendRequest}
            disabled={loading}
            className="btn btn-primary flex items-center gap-2 min-w-[100px] justify-center"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-4">
          {['body', 'headers', 'config'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-3 text-sm font-medium capitalize transition-colors
                ${activeTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {activeTab === 'body' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response Body (JSON)
            </label>
            <textarea
              value={JSON.stringify(endpoint.response, null, 2)}
              onChange={(e) => handleResponseChange(e.target.value)}
              className="w-full h-96 p-3 border border-gray-300 rounded font-mono text-sm focus-ring resize-none"
              style={{ backgroundColor: '#f9fafb' }}
              spellCheck={false}
            />
            <p className="mt-2 text-xs text-gray-500">
              This will be the mock response when you test this endpoint
            </p>
          </div>
        )}

        {activeTab === 'headers' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Request Headers
              </label>
              <button
                onClick={addHeader}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                + Add Header
              </button>
            </div>

            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={header.enabled}
                    onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus-ring"
                  />
                  <input
                    type="text"
                    value={header.key}
                    onChange={(e) => updateHeader(index, 'key', e.target.value)}
                    placeholder="Key"
                    className="input text-sm flex-1"
                  />
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) => updateHeader(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="input text-sm flex-1"
                  />
                  <button
                    onClick={() => removeHeader(index)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endpoint Name
              </label>
              <input
                type="text"
                value={endpoint.name}
                onChange={(e) => onUpdateEndpoint({ ...endpoint, name: e.target.value })}
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Status Code
              </label>
              <select
                value={endpoint.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="input"
              >
                <option value="200">200 - OK</option>
                <option value="201">201 - Created</option>
                <option value="204">204 - No Content</option>
                <option value="400">400 - Bad Request</option>
                <option value="401">401 - Unauthorized</option>
                <option value="403">403 - Forbidden</option>
                <option value="404">404 - Not Found</option>
                <option value="500">500 - Internal Server Error</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Delay (ms)
              </label>
              <input
                type="number"
                value={endpoint.delay}
                onChange={(e) => onUpdateEndpoint({ ...endpoint, delay: parseInt(e.target.value) || 0 })}
                className="input"
                min="0"
                max="5000"
                step="100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Simulate network latency
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPanel;
