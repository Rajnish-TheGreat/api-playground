import { Clock, CheckCircle, XCircle, Copy, Download } from 'lucide-react';
import { useState } from 'react';

const ResponsePanel = ({ response, loading }) => {
  const [activeTab, setActiveTab] = useState('body');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-yellow-600';
    if (status >= 400 && status < 500) return 'text-orange-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusBg = (status) => {
    if (status >= 200 && status < 300) return 'bg-green-50 border-green-200';
    if (status >= 300 && status < 400) return 'bg-yellow-50 border-yellow-200';
    if (status >= 400 && status < 500) return 'bg-orange-50 border-orange-200';
    if (status >= 500) return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  if (loading) {
    return (
      <div className="w-1/2 bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Sending request...</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="w-1/2 bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
          <p>No response yet</p>
          <p className="text-sm mt-1">Click Send to test the endpoint</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/2 bg-white border-l border-gray-200 flex flex-col">
      {/* Response Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Response</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Copy response"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Download response"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Status Info */}
        <div className={`flex items-center gap-4 p-3 border rounded ${getStatusBg(response.status)}`}>
          <div className="flex items-center gap-2">
            {response.status >= 200 && response.status < 300 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${getStatusColor(response.status)}`}>
              {response.status} {response.statusText}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>{response.time}ms</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-4">
          {['body', 'headers'].map(tab => (
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

      {/* Response Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'body' && (
          <div className="p-4">
            <pre className="font-mono text-sm bg-gray-50 p-4 rounded border border-gray-200 overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'headers' && (
          <div className="p-4">
            <div className="space-y-2">
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key} className="flex gap-4 py-2 border-b border-gray-100">
                  <div className="font-medium text-sm text-gray-700 w-1/3">{key}</div>
                  <div className="text-sm text-gray-600 font-mono flex-1">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;