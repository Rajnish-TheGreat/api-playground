import { X, Command, Keyboard } from 'lucide-react';

const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      category: 'General',
      items: [
        { keys: ['Ctrl', 'K'], description: 'Open command palette' },
        { keys: ['Ctrl', 'S'], description: 'Save current endpoint' },
        { keys: ['Ctrl', '/'], description: 'Toggle keyboard shortcuts' },
        { keys: ['Escape'], description: 'Close modal/dialog' }
      ]
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['Ctrl', 'B'], description: 'Toggle sidebar' },
        { keys: ['Ctrl', '1'], description: 'Focus Request panel' },
        { keys: ['Ctrl', '2'], description: 'Focus Response panel' },
        { keys: ['↑', '↓'], description: 'Navigate endpoints (sidebar)' }
      ]
    },
    {
      category: 'Actions',
      items: [
        { keys: ['Ctrl', 'Enter'], description: 'Send request' },
        { keys: ['Ctrl', 'N'], description: 'New endpoint' },
        { keys: ['Ctrl', 'D'], description: 'Duplicate endpoint' },
        { keys: ['Delete'], description: 'Delete selected endpoint' }
      ]
    },
    {
      category: 'Editing',
      items: [
        { keys: ['Ctrl', 'F'], description: 'Search endpoints' },
        { keys: ['Ctrl', 'Z'], description: 'Undo' },
        { keys: ['Ctrl', 'Shift', 'Z'], description: 'Redo' },
        { keys: ['Ctrl', 'A'], description: 'Select all (in editor)' }
      ]
    },
    {
      category: 'Import/Export',
      items: [
        { keys: ['Ctrl', 'E'], description: 'Export collection' },
        { keys: ['Ctrl', 'I'], description: 'Import collection' },
        { keys: ['Ctrl', 'Shift', 'C'], description: 'Generate code' },
        { keys: ['Ctrl', 'Shift', 'T'], description: 'Open templates' }
      ]
    },
    {
      category: 'View',
      items: [
        { keys: ['Ctrl', 'Shift', 'D'], description: 'Toggle dark mode' },
        { keys: ['Ctrl', '+'], description: 'Zoom in' },
        { keys: ['Ctrl', '-'], description: 'Zoom out' },
        { keys: ['Ctrl', '0'], description: 'Reset zoom' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded flex items-center justify-center">
              <Keyboard className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
              <p className="text-sm text-gray-500">Speed up your workflow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Shortcuts Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-6">
            {shortcuts.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">{item.description}</span>
                      <div className="flex items-center gap-1">
                        {item.keys.map((key, keyIdx) => (
                          <span key={keyIdx} className="flex items-center">
                            <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono font-semibold text-gray-700 shadow-sm">
                              {key}
                            </kbd>
                            {keyIdx < item.keys.length - 1 && (
                              <span className="mx-1 text-gray-400">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600 flex items-center gap-2">
              <Command className="w-4 h-4" />
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">/</kbd> anytime to see shortcuts</span>
            </div>
            <button
              onClick={onClose}
              className="btn btn-secondary btn-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
