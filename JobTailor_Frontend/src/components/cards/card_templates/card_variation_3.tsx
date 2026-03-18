"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2, Lightbulb, Check, X } from "lucide-react";
import type { editModeResponseFormat } from "./formatter";
import {
  getFormatFunction,
  getDeleteFunction,
  getEditFormatFunction,
  getAddFunction,
  getUpdateFunction,
  templateHasGridCrud,
} from "./functionMapper";

export type CardVariation3Props = {
  apiResponse: { message: string; data: [] } | null;
  templateName: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onSave?: (updatedItem: Record<string, unknown>) => void;
};

/** Edit form for variation 3 grid (supports text, boolean, textarea, number, select). */
function GridCardEditMode({
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
  const [draft, setDraft] = useState<Record<string, unknown>>(() => ({ ...data }));
  const [saving, setSaving] = useState(false);
  const updateFunction = getUpdateFunction(templateName);
  const addFunction = getAddFunction(templateName);
  const isNew = data.id == null || data.id === "";

  const handleChange = useCallback(
    (key: string, value: unknown, kind: editModeResponseFormat["kind"]) => {
      setDraft((prev) => {
        const next = { ...prev };
        if (kind === "boolean") {
          next[key] = value === true || value === "true";
        } else if (kind === "number") {
          if (value === "" || value == null) next[key] = "";
          else next[key] = Number(value);
        } else {
          next[key] = value;
        }
        return next;
      });
    },
    [],
  );

  const fields = formatFunction(draft);

  const coerceNumericPayload = (payload: Record<string, unknown>) => {
    for (const f of formatFunction(payload)) {
      if (f.kind === "number") {
        const v = payload[f.key];
        if (v === "" || v == null) payload[f.key] = 0;
        else {
          const n = Number(v);
          payload[f.key] = Number.isNaN(n) ? 0 : n;
        }
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        const payload = { ...draft };
        delete payload.id;
        delete payload.user_id;
        coerceNumericPayload(payload);
        await addFunction(payload);
      } else {
        const payload = { ...draft };
        coerceNumericPayload(payload);
        await updateFunction(payload);
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
        {fields.map(({ key, label, kind, value, options }) => {
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
          if (kind === "select" && options?.length) {
            return (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  {label}
                </label>
                <select
                  value={value == null ? "" : String(value)}
                  onChange={(e) => handleChange(key, e.target.value, "text")}
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }
          if (kind === "number") {
            return (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  {label}
                </label>
                <input
                  type="number"
                  min={0}
                  value={value === "" || value == null ? "" : String(value)}
                  onChange={(e) =>
                    handleChange(key, e.target.value === "" ? "" : e.target.value, "number")
                  }
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
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

function proficiencyFromFormatted(
  chipRows: { key: string; value: string }[],
): string {
  const row = chipRows.find((c) => c.key === "proficiency_level");
  return row ? String(row.value).toLowerCase() : "";
}

function dotClass(levelKey: string): string {
  if (!levelKey) return "bg-gray-300";
  if (levelKey.includes("expert")) return "bg-green-500";
  if (levelKey.includes("intermediate")) return "bg-orange-500";
  return "bg-gray-400";
}

export default function CardVariation3({
  apiResponse,
  templateName,
  title,
  subtitle,
  icon,
  onSave,
}: CardVariation3Props) {
  const rows =
    apiResponse?.data && Array.isArray(apiResponse.data)
      ? (apiResponse.data as Record<string, unknown>[])
      : [];

  const [adding, setAdding] = useState(false);
  const [tagManageMode, setTagManageMode] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [deletingId, setDeletingId] = useState<unknown>(null);

  const formatFn = getFormatFunction(templateName);
  const deleteFn = getDeleteFunction(templateName);
  const showSkillLegend = templateName === "skill";
  const showCrud = !!onSave && templateHasGridCrud(templateName);
  const showTagActions =
    tagManageMode && showCrud && !adding && editingId == null && rows.length > 0;

  const handleDelete = async (row: Record<string, unknown>) => {
    const id = row.id;
    if (id == null || Number.isNaN(Number(id))) return;
    if (!window.confirm("Delete this item?")) return;
    setDeletingId(row.id);
    try {
      await deleteFn(Number(id));
      onSave?.(row);
    } catch (e) {
      console.error(e);
      window.alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const headerBusy = adding || editingId != null;

  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-8 pb-5 pt-7">
        <div className="flex items-center gap-[14px]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
            {icon ?? <Lightbulb className="h-6 w-6" strokeWidth={2} aria-hidden />}
          </div>
          <div>
            <h2 className="text-[1.1rem] font-medium tracking-tight text-gray-900">{title}</h2>
            <p className="mt-0.5 text-[0.75rem] font-light uppercase tracking-wider text-gray-500">
              {subtitle}
            </p>
          </div>
        </div>
        {onSave && !headerBusy ? (
          <div className="flex flex-shrink-0 items-center gap-2">
            {rows.length > 0 && showCrud ? (
              <button
                type="button"
                onClick={() => setTagManageMode((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-green-500 bg-white px-3.5 py-2 text-[0.8rem] font-medium text-green-600 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                <Pencil className="h-[14px] w-[14px]" strokeWidth={2.5} aria-hidden />
                {tagManageMode ? "Done" : "Edit"}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setTagManageMode(false);
                setAdding(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-green-500 bg-green-500 px-3.5 py-2 text-[0.8rem] font-medium text-white shadow-sm transition hover:bg-green-600 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.98]"
            >
              <Plus className="h-[14px] w-[14px]" strokeWidth={2.5} aria-hidden />
              Add
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 px-8 pb-8 pt-4">
        {rows.length === 0 && !adding ? (
          <p className="py-8 text-center text-[0.9rem] text-gray-500">
            No items yet. Add your first entry.
          </p>
        ) : null}

        {rows.length === 0 && adding ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <GridCardEditMode
              data={{}}
              templateName={templateName}
              handleCancel={() => setAdding(false)}
              onSave={() => {
                setAdding(false);
                setTagManageMode(false);
                onSave?.({});
              }}
            />
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4 xl:grid-cols-5">
            {rows.map((row, index) => {
              const key =
                typeof row.id === "number" || typeof row.id === "string" ? row.id : index;
              const isEditing = editingId != null && row.id != null && editingId === row.id;
              const del = deletingId === row.id;

              if (isEditing) {
                return (
                  <div key={key} className="col-span-full">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                      <GridCardEditMode
                        data={row}
                        templateName={templateName}
                        handleCancel={() => setEditingId(null)}
                        onSave={() => {
                          setEditingId(null);
                          onSave?.(row);
                        }}
                      />
                    </div>
                  </div>
                );
              }

              const { entryTitle, entrySubtitle, chipRows } = formatFn(row);
              const pk = proficiencyFromFormatted(chipRows);
              const showDot = showSkillLegend && chipRows.some((c) => c.key === "proficiency_level");
              const canAct =
                showTagActions &&
                row.id != null &&
                !Number.isNaN(Number(row.id));

              return (
                <div
                  key={key}
                  className="relative flex min-h-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white px-2 pb-1.5 pt-2 shadow-sm transition-shadow hover:shadow-sm"
                >
                  {showDot ? (
                    <span
                      className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass(pk)}`}
                      title={
                        pk.includes("expert")
                          ? "Expert"
                          : pk.includes("intermediate")
                            ? "Intermediate"
                            : "Beginner"
                      }
                      aria-hidden
                    />
                  ) : null}
                  <div className="truncate pr-3 text-[0.78rem] font-medium leading-tight text-gray-900">
                    {entryTitle}
                  </div>
                  {entrySubtitle ? (
                    <div className="mt-0.5 truncate text-[0.58rem] uppercase leading-tight tracking-wide text-gray-500">
                      {entrySubtitle}
                    </div>
                  ) : null}
                  {canAct ? (
                    <div className="mt-1.5 flex justify-end gap-1 border-t border-gray-100 pt-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setAdding(false);
                          setEditingId(row.id as number | string);
                        }}
                        title="Edit"
                        aria-label="Edit"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-green-500 text-green-600 hover:bg-green-50"
                      >
                        <Pencil className="h-3 w-3" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(row)}
                        title={del ? "Deleting…" : "Delete"}
                        aria-label="Delete"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        disabled={del}
                      >
                        {del ? (
                          <Loader2 className="h-3 w-3 animate-spin" strokeWidth={2} aria-hidden />
                        ) : (
                          <Trash2 className="h-3 w-3" strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {adding && rows.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <GridCardEditMode
              data={{}}
              templateName={templateName}
              handleCancel={() => setAdding(false)}
              onSave={() => {
                setAdding(false);
                setTagManageMode(false);
                onSave?.({});
              }}
            />
          </div>
        ) : null}
      </div>

      {showSkillLegend ? (
        <div className="border-t border-gray-200 px-8 py-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.62rem] font-medium uppercase tracking-wide text-gray-600">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" aria-hidden />
              Expert
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden />
              Intermediate
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden />
              Beginner
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
