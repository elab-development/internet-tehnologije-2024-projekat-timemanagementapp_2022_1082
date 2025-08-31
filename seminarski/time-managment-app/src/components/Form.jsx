import React, { useState } from 'react'

function Form() {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        createdAt: '',
        finishedAt: '',
        complete: false,
        content: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="flex-1 bg-white ml-80">
            {/* Main Content */}
            <div className="p-6 max-w-4xl mx-auto">
                {/* Task Card */}
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
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 text-lg font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Type */}
                            <div className="col-span-2">
                                <select
                                    name="type"
                                    value={formData.type}
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
                                    value={formData.createdAt}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Finished Date */}
                            <div className="col-span-2">
                                <input
                                    type="date"
                                    name="finishedAt"
                                    value={formData.finishedAt}
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
                                        checked={formData.complete}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className={`text-sm font-medium ${formData.complete ? 'text-green-600' : 'text-gray-600'}`}>
                                        {formData.complete ? '✅ Complete' : 'Complete'}
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
                            value={formData.content}
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
                                    onClick={() => console.log('Mark complete')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Complete Task
                                </button>
                                <button 
                                    onClick={() => console.log('Delete task')}
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

                {/* Additional Notes Section */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-blue-900 mb-2">Quick Notes</h3>
                            <textarea
                                placeholder="Add quick notes, reminders, or comments here..."
                                className="w-full h-24 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;