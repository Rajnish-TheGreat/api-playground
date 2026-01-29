import { X, Download, Upload, Code2, FileJson, FileCode } from 'lucide-react';
import { useState } from 'react';
import { exportAsPostman, exportAsOpenAPI, exportAsJSON, importFromPostman } from '../utils/exporters';

const ExportModal = ({ isOpen, onClose, endpoints }) => {
  const [activeTab, setActiveTab] = useState('export');
  const [exportFormat, setExportFormat] = useState('postman');
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const handleExport = () => {
    let data, filename;
    
    switch (exportFormat) {
      case 'postman':
        data = exportAsPostman(endpoints);
        filename = 'collection.postman.json';
        break;
      case 'openapi':
        data = exportAsOpenAPI(endpoints);
        filename = 'openapi.json';
        break;
      case 'json':
        data = exportAsJSON(endpoints);
        filename = 'endpoints.json';
        break;
      default:
        data = exportAsJSON(endpoints);
        filename = 'endpoints.json';
    }

    // Download file
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (onImportSuccess) => {
    try {
      setImportError('');
      const imported = importFromPostman(importData);
      onImportSuccess(imported);
      setImportData('');
      onClose();
    } catch (error) {
      setImportError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Import / Export</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-4">
            {['export', 'import'].map(tab => (
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
                {tab === 'export' ? <Download className="w-4 h-4 inline mr-2" /> : <Upload className="w-4 h-4 inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Export Format
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="postman"
                      checked={exportFormat === 'postman'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <FileJson className="w-5 h-5 ml-3 text-orange-600" />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">Postman Collection</div>
                      <div className="text-xs text-gray-500">Import into Postman or Insomnia</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="openapi"
                      checked={exportFormat === 'openapi'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <FileCode className="w-5 h-5 ml-3 text-blue-600" />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">OpenAPI 3.0 Specification</div>
                      <div className="text-xs text-gray-500">Swagger/OpenAPI format</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-4 h-4 text-primary-600"
                    />
                    <Code2 className="w-5 h-5 ml-3 text-green-600" />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">JSON</div>
                      <div className="text-xs text-gray-500">Raw endpoint data</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                <strong>Exporting {endpoints.length} endpoint{endpoints.length !== 1 ? 's' : ''}</strong>
                <p className="mt-1 text-xs">Your collection will be downloaded as a JSON file</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Postman Collection JSON
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => {
                    setImportData(e.target.value);
                    setImportError('');
                  }}
                  className="w-full h-64 p-3 border border-gray-300 rounded font-mono text-xs focus-ring resize-none"
                  placeholder='{"info": {"name": "My Collection"}, "item": [...]}'
                  spellCheck={false}
                />
                {importError && (
                  <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                    {importError}
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                <strong>⚠️ Import will replace all existing endpoints</strong>
                <p className="mt-1 text-xs">Make sure to export your current collection first if you want to keep it</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          
          {activeTab === 'export' ? (
            <button
              onClick={handleExport}
              className="btn btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as {exportFormat.toUpperCase()}
            </button>
          ) : (
            <button
              onClick={() => handleImport(window.handleImportSuccess)}
              disabled={!importData.trim()}
              className="btn btn-primary flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Import Collection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
