"use client"
import { Pen, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Card({ information: information, title }: { information: any[], title: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<any[]>([]);

    // Initialize edited data when component mounts or information changes
    useEffect(() => {
        setEditedData(JSON.parse(JSON.stringify(information || [])));
    }, [information]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData(JSON.parse(JSON.stringify(information || [])));
    };

    const handleSave = () => {
        // Here you would typically save the data to your backend
        console.log('Saving data:', editedData);
        setIsEditing(false);
        // You might want to call a prop function to update the parent component
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(JSON.parse(JSON.stringify(information || [])));
    };

    const handleFieldChange = (dataIndex: number, fieldKey: string, newValue: string) => {
        const newData = [...editedData];
        if (newData[dataIndex] && newData[dataIndex][fieldKey]) {
            newData[dataIndex][fieldKey].value = newValue;
            setEditedData(newData);
        }
    };

    return (
        <div className="p-6 border rounded-lg mb-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                title="Save changes"
                            >
                                <Save className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                                title="Cancel editing"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                            title="Edit information"
                        >
                            <Pen className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {editedData?.map((data: any, dataIndex: number) => (
                    <div key={data.id || dataIndex} className="border-l-4 border-green-500 pl-4 pb-4">
                        <div className="space-y-2">
                            {Object.entries(data).map(([key, item]: [string, any]) => {
                                if (typeof item === 'object' && item !== null && 'label' in item) {
                                    return (
                                        <div key={item.label} className={`flex ${item.label === 'Description' ? 'items-start' : 'items-center'}`}>
                                            <span className="font-semibold text-black w-24">{item.label}:</span>
                                            {isEditing ? (
                                                item.label === 'Description' ? (
                                                    <textarea
                                                        value={item.value || ''}
                                                        onChange={(e) => handleFieldChange(dataIndex, key, e.target.value)}
                                                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                                        placeholder={`Enter ${item.label.toLowerCase()}`}
                                                        rows={3}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={item.value || ''}
                                                        onChange={(e) => handleFieldChange(dataIndex, key, e.target.value)}
                                                        className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                        placeholder={`Enter ${item.label.toLowerCase()}`}
                                                    />
                                                )
                                            ) : (
                                                <span className="text-gray-900 flex-1">{item.value || 'Not specified'}</span>
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        {dataIndex < editedData.length - 1 && <hr className="mt-4" />}
                    </div>
                ))}
            </div>
        </div>
    );
}