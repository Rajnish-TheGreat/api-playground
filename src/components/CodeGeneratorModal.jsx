import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { generateCode } from '../utils/exporters';

const CodeGeneratorModal = ({ isOpen, onClose, endpoint }) => {
  const [language, setLanguage] = useState('fetch');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !endpoint) return null;

  const code = generateCode(endpoint, language);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languages = [
    { key: 'fetch', name: 'JavaScript Fetch', icon: '🌐' },
    { key: 'axios', name: 'Axios', icon: '📡' },
    { key: 'curl', name: 'cURL', icon: '🔧' },
    { key: 'xhr', name: 'XMLHttpRequest', icon: '📨' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Generate Code</h2>
            <p className="text-sm text-gray-500 mt-1">
              {endpoint.method} {endpoint.path}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Language Selector */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2 flex-wrap">
            {languages.map(lang => (
              <button
                key={lang.key}
                onClick={() => setLanguage(lang.key)}
                className={`
                  px-4 py-2 rounded font-medium text-sm transition-colors
                  ${language === lang.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span className="mr-2">{lang.icon}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              {code}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeGeneratorModal;
