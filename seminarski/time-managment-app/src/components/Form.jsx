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
        <div>
            {/* Form Section */}
            <div className="p-4 flex-1">
            <div className="border-2 border-black mb-4">
                {/* Form Fields Row */}
                <div className="border-b-2 border-black p-4 flex space-x-2">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border-2 border-black px-2 py-1 text-sm flex-1"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="border-2 border-black px-2 py-1 text-sm w-20"
                />
                <input
                    type="text"
                    name="createdAt"
                    placeholder="Created_At"
                    value={formData.createdAt}
                    onChange={handleInputChange}
                    className="border-2 border-black px-2 py-1 text-sm w-24"
                />
                <input
                    type="text"
                    name="finishedAt"
                    placeholder="Finished_At"
                    value={formData.finishedAt}
                    onChange={handleInputChange}
                    className="border-2 border-black px-2 py-1 text-sm w-24"
                />
                <label className="border-2 border-black px-2 py-1 text-sm flex items-center">
                    <input
                    type="checkbox"
                    name="complete"
                    checked={formData.complete}
                    onChange={handleInputChange}
                    className="mr-1"
                    />
                    Complete
                </label>
                </div>

                {/* Content Section */}
                <div className="border-b-2 border-black p-4">
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="w-full h-32 border-2 border-black p-2 text-sm resize-none"
                />
                </div>

                {/* Action Buttons */}
                <div className="p-4 flex justify-end space-x-2">
                <button className="border-2 border-black px-4 py-1 text-sm bg-white hover:bg-gray-100">
                    Complete
                </button>
                <button className="border-2 border-black px-4 py-1 text-sm bg-white hover:bg-gray-100">
                    Delete
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Form;