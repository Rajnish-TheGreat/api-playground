import { Plus, Trash2, ChevronRight } from 'lucide-react';

const Sidebar = ({ endpoints, selectedEndpoint, onSelectEndpoint, onAddEndpoint, onDeleteEndpoint }) => {
  const getMethodColor = (method) => {
    const colors = {
      GET: 'method-get',
      POST: 'method-post',
      PUT: 'method-put',
      DELETE: 'method-delete',
      PATCH: 'method-patch'
    };
    return colors[method] || 'method-get';
  };

  return (
    <div className="w-80 panel flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Endpoints</h2>
          <button
            onClick={onAddEndpoint}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Add new endpoint"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <input
          type="search"
          placeholder="Search endpoints..."
          className="input text-sm"
        />
      </div>

      {/* Endpoints List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {endpoints.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            <p>No endpoints yet</p>
            <button
              onClick={onAddEndpoint}
              className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Create your first endpoint
            </button>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                className={`
                  group flex items-center gap-2 p-3 rounded cursor-pointer
                  transition-colors
                  ${selectedEndpoint?.id === endpoint.id
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50 border border-transparent'
                  }
                `}
                onClick={() => onSelectEndpoint(endpoint)}
              >
                <span className={`method-badge ${getMethodColor(endpoint.method)}`}>
                  {endpoint.method}
                </span>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {endpoint.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate font-mono">
                    {endpoint.path}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEndpoint(endpoint.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                  title="Delete endpoint"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                </button>

                {selectedEndpoint?.id === endpoint.id && (
                  <ChevronRight className="w-4 h-4 text-primary-600" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <div className="flex justify-between mb-1">
            <span>Total Endpoints:</span>
            <span className="font-semibold">{endpoints.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Selected:</span>
            <span className="font-semibold">{selectedEndpoint?.name || 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
