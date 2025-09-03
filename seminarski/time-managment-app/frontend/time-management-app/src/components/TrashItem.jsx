import React from 'react';

function TrashItem({ taskData, onRestore, onPermanentDelete }) {
  const handleRestore = () => {
    if (window.confirm('Are you sure you want to restore this task?')) {
      onRestore(taskData.id);
    }
  };

  const handlePermanentDelete = () => {
    if (window.confirm('Are you sure you want to permanently delete this task? This action cannot be undone.')) {
      onPermanentDelete(taskData.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getTypeEmoji = (type) => {
    switch (type) {
      case 'urgent': return '🔴';
      case 'normal': return '🟡';
      case 'low': return '🟢';
      default: return '📝';
    }
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl shadow-sm">
      {/* Header with task info */}
      <div className="p-6 border-b border-red-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTypeEmoji(taskData.type)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{taskData.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Type: {taskData.type || 'N/A'}</span>
                <span>Created: {formatDate(taskData.created_at)}</span>
                <span>Deleted: {formatDate(taskData.deleted_at)}</span>
                {taskData.complete && <span className="text-green-600">✅ Completed</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Content preview */}
        {taskData.content && (
          <div className="bg-white p-3 rounded-lg border border-red-100">
            <p className="text-sm text-gray-700 line-clamp-3">
              {taskData.content.length > 200 
                ? `${taskData.content.substring(0, 200)}...` 
                : taskData.content
              }
            </p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-6 py-4 bg-red-25 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>In trash</span>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={handleRestore}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Restore
            </button>
            
            <button 
              onClick={handlePermanentDelete}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Forever
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrashItem;