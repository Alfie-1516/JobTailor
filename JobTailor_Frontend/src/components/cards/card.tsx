"use client";
import { Pen, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { EmptyForms } from "../forms/emptyForms";
import { save_form_data } from "@/api";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});

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
    save_form_data(userId, form, baseName);
    setIsEditing(false);
    // You might want to call a prop function to update the parent component
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(JSON.parse(JSON.stringify(information || [])));
  };
  console.log("information from card", information);

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
        {isEditing ? (
          information ? (
            <EmptyForms form={form} setForm={setForm} baseName={baseName} />
          ) : (
            <div>Not Editing</div>
          )
        ) : (
          <div>
            {Array.isArray(information) ? (
              information.map((item: any, index: number) => (
                <div key={index}>
                  {Object.entries(item)
                    .filter(([key]) => key !== "_id")
                    .map(([key, value]: [string, any]) => (
                      <div key={key} className="flex items-center mb-2">
                        <span className="font-semibold text-black w-24">
                          {key.charAt(0).toUpperCase() +
                            key.slice(1).replace(/([A-Z])/g, " $1")}
                          :
                        </span>
                        <span className="text-gray-900 flex-1">
                          {value || "Not specified"}
                        </span>
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <div>No information available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
