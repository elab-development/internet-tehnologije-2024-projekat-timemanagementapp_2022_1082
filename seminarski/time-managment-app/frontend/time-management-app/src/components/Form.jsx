import React, { useState, useEffect } from 'react';

function Form({ formData, onUpdate, onRemove }) {
    const [localData, setLocalData] = useState(formData);

    useEffect(() => {
        setLocalData(formData);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        const updatedData = {
            ...localData,
            [name]: newValue
        };
        
        setLocalData(updatedData);
        onUpdate(updatedData);
    };

    const handleMarkComplete = () => {
        const updatedData = {
            ...localData,
            complete: !localData.complete,
            finishedAt: !localData.complete ? new Date().toISOString().split('T')[0] : ''
        };
        
        setLocalData(updatedData);
        onUpdate(updatedData);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onRemove();
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Form Fields Row */}
            <div className="p-6 border-b border-gray-100">
                <div className="grid grid-cols-12 gap-3 items-center">
                    {/* Title - spans 4 columns */}
                    <div className="col-span-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="📝 Task title..."
                            value={localData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-lg font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Type */}
                    <div className="col-span-2">
                        <select
                            name="type"
                            value={localData.type}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="">Type</option>
                            <option value="urgent">🔴 Urgent</option>
                            <option value="normal">🟡 Normal</option>
                            <option value="low">🟢 Low</option>
                        </select>
                    </div>

                    {/* Created Date */}
                    <div className="col-span-2">
                        <input
                            type="date"
                            name="createdAt"
                            value={localData.createdAt}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Finished Date */}
                    <div className="col-span-2">
                        <input
                            type="date"
                            name="finishedAt"
                            value={localData.finishedAt}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* Complete Checkbox */}
                    <div className="col-span-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="complete"
                                checked={localData.complete}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className={`text-sm font-medium ${localData.complete ? 'text-green-600' : 'text-gray-600'}`}>
                                {localData.complete ? '✅ Complete' : 'Complete'}
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 border-b border-gray-100">
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                </div>
                <textarea
                    name="content"
                    placeholder="Add task description, notes, or any additional details..."
                    value={localData.content}
                    onChange={handleInputChange}
                    className="w-full h-40 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-sm leading-relaxed"
                />
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Last updated: Just now</span>
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            onClick={handleMarkComplete}
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                                localData.complete 
                                    ? 'text-orange-700 bg-orange-100 hover:bg-orange-200 focus:ring-orange-500'
                                    : 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            }`}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {localData.complete ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                )}
                            </svg>
                            {localData.complete ? 'Mark Incomplete' : 'Complete Task'}
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-red-50 hover:text-red-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;