import { X } from 'lucide-react';
import { useState } from 'react';
import { AUTH_TEMPLATES } from '../utils/authTemplates';

const AuthModal = ({ isOpen, onClose, onApplyAuth }) => {
  const [selectedAuth, setSelectedAuth] = useState('none');

  if (!isOpen) return null;

  const handleApply = () => {
    const template = AUTH_TEMPLATES[selectedAuth];
    onApplyAuth(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Authentication Templates</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Auth Templates */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {Object.entries(AUTH_TEMPLATES).map(([key, template]) => (
              <label
                key={key}
                className="flex items-start p-4 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="auth"
                  value={key}
                  checked={selectedAuth === key}
                  onChange={(e) => setSelectedAuth(e.target.value)}
                  className="w-4 h-4 text-primary-600 mt-1"
                />
                <div className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">{template.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{template.description}</div>
                  {template.note && (
                    <div className="text-xs text-gray-500 mt-1 italic">{template.note}</div>
                  )}
                  {template.headers && template.headers.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {template.headers.map((header, idx) => (
                        <div key={idx} className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                          <span className="text-primary-600">{header.key}:</span>{' '}
                          <span className="text-gray-600">{header.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          
          <button
            onClick={handleApply}
            className="btn btn-primary"
          >
            Apply Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
