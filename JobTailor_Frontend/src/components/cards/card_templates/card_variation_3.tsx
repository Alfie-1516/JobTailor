"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { Lightbulb, Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { addSkill, updateSkill, deleteSkill } from "@/api/user";

export type CardVariation3Props = {
  apiResponse: { message: string; data: Record<string, unknown>[] } | null;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  /** Refetch list after add / update / delete (same as CardVariation2 onSave). */
  onSave?: () => void | Promise<void>;
};

function skillName(row: Record<string, unknown>): string {
  const v = row.skill_name ?? row.skill;
  return v != null && String(v).trim() !== "" ? String(v) : "—";
}

function categoryLabel(row: Record<string, unknown>): string {
  const c = row.skill_category;
  if (c == null || c === "") return "";
  return String(c).replace(/_/g, " ");
}

function proficiencyKey(row: Record<string, unknown>): string {
  const v = row.proficiency_level ?? row.level ?? "";
  return String(v).trim().toLowerCase();
}

function dotClass(levelKey: string): string {
  if (levelKey.includes("expert")) return "bg-green-500";
  if (levelKey.includes("intermediate")) return "bg-orange-500";
  return "bg-gray-400";
}

const emptyDraft = () => ({
  skill_name: "",
  skill_category: "",
  proficiency_level: "intermediate",
  years_of_experience: "" as string | number,
});

export default function CardVariation3({
  apiResponse,
  title = "Skills",
  subtitle = "SKILLS",
  icon,
  onSave,
}: CardVariation3Props) {
  const rows =
    apiResponse?.data && Array.isArray(apiResponse.data) ? apiResponse.data : [];

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const openAdd = () => {
    setEditingId(null);
    setDraft(emptyDraft());
    setAdding(true);
  };

  const openEdit = (row: Record<string, unknown>) => {
    const id = row.id;
    if (id == null || Number.isNaN(Number(id))) return;
    setAdding(false);
    setEditingId(Number(id));
    setDraft({
      skill_name: String(row.skill_name ?? ""),
      skill_category: String(row.skill_category ?? ""),
      proficiency_level: String(row.proficiency_level ?? "intermediate").toLowerCase(),
      years_of_experience:
        row.years_of_experience != null ? Number(row.years_of_experience) : "",
    });
  };

  const closeForm = () => {
    setAdding(false);
    setEditingId(null);
    setDraft(emptyDraft());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = String(draft.skill_name).trim();
    if (!name) {
      window.alert("Skill name is required.");
      return;
    }
    const years = draft.years_of_experience === "" ? 0 : Number(draft.years_of_experience);
    if (Number.isNaN(years) || years < 0) {
      window.alert("Years of experience must be a valid number.");
      return;
    }
    const payload: Record<string, unknown> = {
      skill_name: name,
      skill_category: String(draft.skill_category).trim() || "general",
      proficiency_level: String(draft.proficiency_level).toLowerCase(),
      years_of_experience: years,
    };
    setSaving(true);
    try {
      if (editingId != null) {
        await updateSkill({ ...payload, id: editingId });
      } else {
        await addSkill(payload);
      }
      await onSave?.();
      closeForm();
    } catch (err) {
      console.error(err);
      window.alert("Failed to save skill. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row: Record<string, unknown>) => {
    const id = row.id;
    if (id == null || Number.isNaN(Number(id))) return;
    if (!window.confirm("Delete this skill?")) return;
    setDeletingId(Number(id));
    try {
      await deleteSkill(Number(id));
      await onSave?.();
    } catch (err) {
      console.error(err);
      window.alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const setField = useCallback(
    (key: keyof ReturnType<typeof emptyDraft>, value: string) => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const showForm = adding || editingId != null;

  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-8 pb-5 pt-7">
        <div className="flex items-center gap-[14px]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
            {icon ?? <Lightbulb className="h-6 w-6" strokeWidth={2} aria-hidden />}
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
        {onSave && !showForm ? (
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-green-500 bg-green-500 px-3.5 py-2 text-[0.8rem] font-medium text-white shadow-sm transition hover:bg-green-600 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.98]"
          >
            <Plus className="h-[14px] w-[14px]" strokeWidth={2.5} aria-hidden />
            Add
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 px-8 pb-8 pt-4">
        {rows.length === 0 && !showForm ? (
          <p className="py-8 text-center text-[0.9rem] text-gray-500">
            No skills yet. Add your first skill.
          </p>
        ) : rows.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4 xl:grid-cols-5">
            {rows.map((row, index) => {
              const key =
                typeof row.id === "number" || typeof row.id === "string"
                  ? row.id
                  : index;
              const pk = proficiencyKey(row);
              const del = deletingId === Number(row.id);
              return (
                <div
                  key={key}
                  className="relative flex min-h-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white px-2 pb-1.5 pt-2 shadow-sm transition-shadow hover:shadow-sm"
                >
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
                  <div className="truncate pr-3 text-[0.78rem] font-medium leading-tight text-gray-900">
                    {skillName(row)}
                  </div>
                  {categoryLabel(row) ? (
                    <div className="mt-0.5 truncate text-[0.58rem] uppercase leading-tight tracking-wide text-gray-500">
                      {categoryLabel(row)}
                    </div>
                  ) : null}
                  {onSave ? (
                    <div className="mt-1.5 flex justify-end gap-1 border-t border-gray-100 pt-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(row)}
                        disabled={showForm || del}
                        title="Edit"
                        aria-label="Edit skill"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-green-500 text-green-600 hover:bg-green-50 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <Pencil className="h-3 w-3" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(row)}
                        disabled={showForm || del}
                        title={del ? "Deleting…" : "Delete"}
                        aria-label="Delete skill"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-red-500 text-red-600 hover:bg-red-50 disabled:pointer-events-none disabled:opacity-40"
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

        {showForm ? (
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
              {editingId != null ? "Edit skill" : "New skill"}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  Skill name
                </label>
                <input
                  required
                  value={String(draft.skill_name)}
                  onChange={(e) => setField("skill_name", e.target.value)}
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  Category
                </label>
                <input
                  placeholder="e.g. programming_language"
                  value={String(draft.skill_category)}
                  onChange={(e) => setField("skill_category", e.target.value)}
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  Proficiency
                </label>
                <select
                  value={draft.proficiency_level}
                  onChange={(e) => setField("proficiency_level", e.target.value)}
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                  Years of experience
                </label>
                <input
                  type="number"
                  min={0}
                  value={draft.years_of_experience === "" ? "" : draft.years_of_experience}
                  onChange={(e) =>
                    setDraft((p) => ({
                      ...p,
                      years_of_experience: e.target.value === "" ? "" : Number(e.target.value),
                    }))
                  }
                  className="w-full rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="flex items-center gap-1.5 rounded-[10px] border border-gray-200 px-3.5 py-1.5 text-[0.8rem] font-medium text-gray-600 hover:bg-gray-50"
              >
                <X className="h-[13px] w-[13px]" stroke="currentColor" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 rounded-[10px] border border-green-500 bg-green-500 px-3.5 py-1.5 text-[0.8rem] font-medium text-white hover:bg-green-600 disabled:opacity-50"
              >
                <Check className="h-[13px] w-[13px]" stroke="currentColor" />
                {saving ? "Saving…" : editingId != null ? "Save" : "Add"}
              </button>
            </div>
          </form>
        ) : null}
      </div>

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
    </div>
  );
}
