"use client";
import { Pen, Save, X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { EmptyForms } from "../forms/emptyForms";
import { save_form_data, delete_form_data } from "@/api";

export default function Card({
  information: information,
  title,
  baseName,
  userId,
}: {
  information: any[];
  title: string;
  baseName: string;
  userId: string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editedData, setEditedData] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  // Initialize edited data when component mounts or information changes
  useEffect(() => {
    setEditedData(JSON.parse(JSON.stringify(information || [])));
  }, [information]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setForm(information[index] || {});
  };

  const handleSave = async (index: number) => {
    try {
      console.log(baseName);
      await save_form_data(userId, form, information[index]?._id || "", baseName);
      setEditingIndex(null);
      setForm({});
      // You might want to call a prop function to update the parent component
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAddingNew(false);
    setForm({});
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setForm({});
  };

  const handleSaveNew = async () => {
    try {
      await save_form_data(userId, form, "", baseName);
      setIsAddingNew(false);
      setForm({});
      // You might want to call a prop function to update the parent component
    } catch (error) {
      console.error("Error saving new form data:", error);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await delete_form_data(userId, information[index]?._id || "", baseName);
      // You might want to call a prop function to update the parent component
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          onClick={handleAddNew}
          className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
          title="Add new item"
          style={{
            background: "#22c55e",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(34, 197, 94, 0.2)",
          }}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {isAddingNew && (
          <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Add New Item</h3>
            </div>
            <EmptyForms form={form} setForm={setForm} baseName={baseName} />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSaveNew}
                className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                title="Save new item"
                style={{
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                title="Cancel adding"
                style={{
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        <div>
          {Array.isArray(information) ? (
            information.map((item: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
                {editingIndex === index ? (
                  <div>
                    <EmptyForms form={form} setForm={setForm} baseName={baseName} />
                                          <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleSave(index)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="Save changes"
                          style={{
                            borderRadius: "6px",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          title="Cancel editing"
                          style={{
                            borderRadius: "6px",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">Item {index + 1}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          title="Edit information"
                          style={{
                            borderRadius: "6px",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Pen className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete item"
                          style={{
                            borderRadius: "6px",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                                          {Object.entries(item)
                        .filter(([key]) => key !== "_id")
                        .map(([key, value]: [string, any]) => (
                          <div key={key} className="flex items-start mb-3">
                            <span className="font-semibold text-black w-32 flex-shrink-0">
                              {key.charAt(0).toUpperCase() +
                                key.slice(1).replace(/([A-Z])/g, " $1")}
                              :
                            </span>
                            <span className="text-gray-900 flex-1 break-words">
                              {value || "Not specified"}
                            </span>
                          </div>
                        ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No information available</div>
          )}
        </div>
      </div>
    </div>
  );
}
