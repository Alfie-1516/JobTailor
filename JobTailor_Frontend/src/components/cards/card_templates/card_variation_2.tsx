"use client";

import type React from "react";
import { useState, useCallback } from "react";
import type { editModeResponseFormat, viewModeResponseFormat } from "./formatter";
import { Pencil, Trash2, Calendar, Check, X, Plus } from "lucide-react";
import {
  getFormatFunction,
  getEditFormatFunction,
  getUpdateFunction,
  getAddFunction,
  getDeleteFunction,
} from "./functionMapper";

export type CardVariation2Props = {
  apiResponse: { message: string; data: [] };
  templateName: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onSave?: (updatedItem: Record<string, unknown>) => void;
};

export default function CardVariation2({
  apiResponse,
  templateName,
  title,
  subtitle,
  icon,
  onSave,
}: CardVariation2Props) {
  const [adding, setAdding] = useState(false);

  if ( apiResponse === null  || apiResponse.data.length === 0 ) {
    return (
      <div
        className={
          "w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm mb-4 p-6 text-center text-gray-500"
        }
      >
        No information available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={
          "w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm"
        }
      >
        <div
          className={
            "flex items-center justify-between border-b border-gray-200 px-8 pb-5 pt-7"
          }
        >
          <div className="flex items-center gap-[14px] ">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full h-6 w-6 bg-green-500 text-white">
              {icon}
            </div>

            <div>
              <h2 className="text-[1.1rem] font-medium tracking-tight text-gray-900">
                {title}
              </h2>
              <p className="mt-0.5 text-[0.75rem] font-light uppercase tracking-wider text-gray-500">
                {subtitle}
              </p>
            </div>
          </div>
          { !adding ? (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-green-500 bg-green-500 px-3.5 py-2 text-[0.8rem] font-medium text-white shadow-sm transition hover:bg-green-600 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.98]"
            >
              <Plus className="h-[14px] w-[14px]" strokeWidth={2.5} aria-hidden />
              Add
            </button>
          ) : null}
        </div>

        {/* Single content column: even gap-4 between header, add form(s), and each entry */}
        <div className="flex flex-col gap-4 px-8 pb-8 pt-4">
          {apiResponse.data.length === 0 && adding ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <CardEditMode
                data={{}}
                templateName={templateName}
                handleCancel={() => setAdding(false)}
                onSave={() => {
                  setAdding(false);
                  onSave?.({});
                }}
              />
            </div>
          ) : null}

          {apiResponse.data.map((item, index) => {
            const row = item as Record<string, unknown>;
            const key =
              typeof row.id === "number" || typeof row.id === "string"
                ? row.id
                : index;
            return (
              <CardEntries
                key={key}
                data={row}
                templateName={templateName}
                onSave={onSave}
              />
            );
          })}

          {adding && apiResponse.data.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <CardEditMode
                data={{}}
                templateName={templateName}
                handleCancel={() => setAdding(false)}
                onSave={() => {
                  setAdding(false);
                  onSave?.({});
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CardEntries({
  data,
  templateName,
  onSave,
}: {
  data: Record<string, unknown>;
  templateName: string;
  onSave?: (updatedItem: Record<string, unknown>) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const id = data.id;
    if (id == null || Number.isNaN(Number(id))) return;

    const deleteFn = getDeleteFunction(templateName);
    setDeleting(true);
    try {
      await deleteFn(Number(id));
      onSave?.(data);
    } catch (e) {
      console.error(e);
      window.alert("Failed to delete. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const canDelete =
    (templateName === "workExperience" || templateName === "education" || templateName === "project" || templateName === "certification") &&
    data.id != null &&
    !Number.isNaN(Number(data.id));

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-sm">
          {!isEditing ? (
            cardViewMode({
              data: data,
              formatFunction: getFormatFunction(templateName),
              handleEditClick,
              onDelete: canDelete ? handleDelete : undefined,
              deleting,
            })
          ) : (
            <CardEditMode
              data={data}
              templateName={templateName}
              handleCancel={handleCancel}
              onSave={onSave}
            />
          )}
    </div>
  );
}

function cardViewMode({
  data,
  formatFunction,
  handleEditClick,
  onDelete,
  deleting = false,
}: {
  data: Record<string, unknown>;
  formatFunction: (data: Record<string, unknown>) => viewModeResponseFormat;
  handleEditClick: () => void;
  onDelete?: () => void | Promise<void>;
  deleting?: boolean;
}) {
  const { entryTitle, entrySubtitle, chipRows, bodyField } =
    formatFunction(data);

  return (
    <div className="flex items-start gap-4 p-5">
      <div className="min-w-0 flex-1">
        <div className="text-[0.97rem] font-medium tracking-tight text-gray-900">
          {entryTitle}
        </div>
        {entrySubtitle ? (
          <div className="mt-0.5 text-[0.82rem] text-gray-500">
            {entrySubtitle}
          </div>
        ) : null}
        {chipRows.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {chipRows.map(({ key, label, value }) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-100 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-gray-600"
              >
                {(key.includes("date") || label.includes("Date")) && (
                  <Calendar className="h-2.5 w-2.5" />
                )}
                {label}: {value}
              </span>
            ))}
          </div>
        ) : null}
        {bodyField.length > 0 ? (
          <div className="mt-2 text-[0.82rem] leading-relaxed text-gray-600">
            <ul className="list-disc space-y-1 pl-4 marker:text-gray-500">
              {bodyField.map((line, i) => (
                <li key={i} className="pl-0.5">
                  {line.value}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="flex flex-shrink-0 gap-2">
        <button
          type="button"
          onClick={handleEditClick}
          className="flex items-center gap-1.5 rounded-[10px] border border-green-500 px-3 py-1.5 text-[0.8rem] font-medium text-green-600 hover:bg-green-50"
        >
          <Pencil className="h-[13px] w-[13px]" strokeWidth={2} />
          Edit
        </button>
        <button
          type="button"
          disabled={!onDelete || deleting}
          onClick={() => void onDelete?.()}
          className="flex items-center gap-1.5 rounded-[10px] border border-red-500 px-3 py-1.5 text-[0.8rem] font-medium text-red-600 hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <Trash2 className="h-[13px] w-[13px]" strokeWidth={2} />
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}


function CardEditMode({
  data,
  templateName,
  handleCancel,
  onSave,
}: {
  data: Record<string, unknown>;
  templateName: string;
  handleCancel: () => void;
  onSave?: (updatedItem: Record<string, unknown>) => void;
}) {
  const formatFunction = getEditFormatFunction(templateName);
  // Fresh draft each time edit mode mounts (unmount on Cancel)
  const [draft, setDraft] = useState<Record<string, unknown>>(() => ({
    ...data,
  }));
  const [saving, setSaving] = useState(false);

  const updateFunction = getUpdateFunction(templateName);
  const addFunction = getAddFunction(templateName);
  const isNew = data.id == null || data.id === "";

  const handleChange = useCallback((key: string, value: unknown, kind: editModeResponseFormat["kind"]) => {
    setDraft((prev) => {
      const next = { ...prev };
      if (kind === "boolean") {
        next[key] = value === true || value === "true";
      } else {
        next[key] = value;
      }
      return next;
    });
  }, []);

  const fields = formatFunction(draft);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        const payload = { ...draft };
        delete payload.id;
        delete payload.user_id;
        await addFunction(payload);
      } else {
        await updateFunction(draft);
      }
      onSave?.(draft);
      handleCancel();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="p-5">
      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map(({ key, label, kind, value }) => {
          if (kind === "textarea") {
            return (
              <div key={key} className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  {label}
                </label>
                <textarea
                  rows={3}
                  value={value == null ? "" : String(value)}
                  onChange={(e) => handleChange(key, e.target.value, "textarea")}
                  className="w-full resize-none rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            );
          }

          if (kind === "boolean") {
            return (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  {label}
                </label>
                <select
                  value={value === true || value === "true" ? "true" : "false"}
                  onChange={(e) => handleChange(key, e.target.value, "boolean")}
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            );
          }

          return (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                {label}
              </label>
              <input
                type="text"
                value={value == null ? "" : String(value)}
                onChange={(e) => handleChange(key, e.target.value, "text")}
                className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-1.5 rounded-[10px] border border-gray-200 px-3.5 py-1.5 text-[0.8rem] font-medium text-gray-600"
        >
          <X className="h-[13px] w-[13px]" stroke="currentColor" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 rounded-[10px] border border-green-500 bg-green-500 px-3.5 py-1.5 text-[0.8rem] font-medium text-white disabled:opacity-50"
        >
          <Check className="h-[13px] w-[13px]" stroke="currentColor" />
          {isNew ? "Add" : "Save"}
        </button>
      </div>
    </form>
  );
}
