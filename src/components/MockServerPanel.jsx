import { Play, Square, Server, Activity, Terminal } from 'lucide-react';
import { useState } from 'react';

const MockServerPanel = ({ running, onToggle, endpoints }) => {
  const [logs, setLogs] = useState([
    { time: '10:30:45', method: 'GET', path: '/api/users', status: 200, message: 'Server ready' }
  ]);

  const getMethodColor = (method) => {
    const colors = {
      GET: 'text-blue-600',
      POST: 'text-green-600',
      PUT: 'text-yellow-600',
      DELETE: 'text-red-600',
      PATCH: 'text-purple-600'
    };
    return colors[method] || 'text-gray-600';
  };

  return (
    <div className="bg-gray-900 text-gray-100 border-t border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Server className="w-4 h-4" />
          <h3 className="font-semibold text-sm">Mock Server</h3>
          {running && (
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400">Running on http://localhost:3001</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400">
            {endpoints.length} endpoint{endpoints.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={onToggle}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors
              ${running
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
              }
            `}
          >
            {running ? (
              <>
                <Square className="w-3.5 h-3.5" />
                Stop Server
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Start Server
              </>
            )}
          </button>
        </div>
      </div>

      {/* Logs */}
      <div className="h-32 overflow-y-auto font-mono text-xs p-3 space-y-1 custom-scrollbar">
        {running ? (
          logs.map((log, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-300">
              <span className="text-gray-500">[{log.time}]</span>
              <span className={`font-semibold ${getMethodColor(log.method)} w-16`}>
                {log.method}
              </span>
              <span className="text-gray-400">{log.path}</span>
              <span className="text-green-400">{log.status}</span>
              <span className="text-gray-500">{log.message}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-4">
            <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Server stopped. Click "Start Server" to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockServerPanel;
