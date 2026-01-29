import { X, Search } from 'lucide-react';
import { useState } from 'react';
import { RESPONSE_TEMPLATES, getTemplatesByCategory } from '../utils/responseTemplates';

const TemplateLibraryModal = ({ isOpen, onClose, onSelectTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const categories = getTemplatesByCategory();
  const allCategories = ['all', ...Object.keys(categories)];

  const filteredTemplates = Object.entries(RESPONSE_TEMPLATES)
    .filter(([key, template]) => {
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  const handleSelectTemplate = (key, template) => {
    onSelectTemplate(template.response);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Response Templates</h2>
            <p className="text-sm text-gray-500 mt-1">Choose a template to quick-start your mock endpoint</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded focus-ring text-sm"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3 py-1.5 rounded text-sm font-medium transition-colors capitalize
                  ${selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredTemplates.map(([key, template]) => (
              <button
                key={key}
                onClick={() => handleSelectTemplate(key, template)}
                className="text-left p-4 border border-gray-200 rounded hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-gray-900 group-hover:text-primary-700">
                    {template.name}
                  </div>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {template.category}
                  </span>
                </div>
                
                <pre className="text-xs font-mono bg-gray-50 p-2 rounded overflow-hidden max-h-32">
                  {JSON.stringify(template.response, null, 2)}
                </pre>
              </button>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No templates found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
          </div>
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

export default TemplateLibraryModal;
