"use client";

/**
 * Card variation 2 — entry list aesthetic (work-experience style) but template-driven
 * so any section can reuse it: pass template { key, label }[] + item record.
 */

import type React from "react";
import { useState, useMemo } from "react";
import { Pencil, Trash2, Calendar, Plus, User, Check, X } from "lucide-react";
import { updatePersonalInformation } from "@/api/personalInformation";
import { updateWorkExperience, deleteWorkExperience } from "@/api/user";

/* Match card_variation_1 layout and palette */
const cardWrapperClass =
  "w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm";
const headerClass =
  "flex items-center justify-between border-b border-gray-200 px-8 pb-5 pt-7";
const headerLeftClass = "flex items-center gap-[14px]";
const iconWrapperClass =
  "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full [&>svg]:h-6 [&>svg]:w-6";
const defaultIconClass = "bg-green-500 text-white";

const TEMPLATE_API: Record<
  string,
  (data: Record<string, unknown>) => Promise<unknown>
> = {
  personalInformation: updatePersonalInformation,
  workExperience: updateWorkExperience,
};

/** Props when Card passes `data` — array = multiple entries, single object = one entry */
export type CardVariation2Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
  /** Field definitions — order drives layout: [0]=title line, [1]=subtitle, rest chips/body */
  template: { key: string; label: string }[];
  templateName: string;
  /** Section header (e.g. "Work Experience") */
  title: string;
  /** Section subtitle (e.g. "Career history") */
  subtitle: string;
  icon?: React.ReactNode;
  onEdit?: () => void;
  onSave?: (updatedItem: Record<string, unknown>) => void;
  /** Optional delete — if omitted, delete button hidden */
  onDelete?: () => void;
  /** Add button at bottom */
  addButtonLabel?: string;
  onAdd?: () => void;
  /** Badge override; default "1 entry" */
  entryCountLabel?: string;
};

type CardVariation2EntryProps = Omit<CardVariation2Props, "data"> & {
  item: Record<string, unknown>;
};

function formatValue(key: string, value: unknown): string {
  if (value == null || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return String(value);
}

/** Parse YYYY-MM-DD as local date to avoid TZ shifting the month */
function parseDateOnly(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s.trim());
  if (m) {
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Date value → "MM YYYY" (zero-padded month) */
function toMonthYear(value: unknown): string {
  if (value == null || value === "") return "";
  const s = String(value).trim();
  const d = parseDateOnly(s);
  if (!d) return s;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm} ${yyyy}`;
}

/**
 * Single chip text: "MM YYYY - MM YYYY" or "MM YYYY - Present"
 * when item has start_date / end_date / is_current (work experience API shape).
 */
function formatDateRangeChip(item: Record<string, unknown>): string | null {
  const start = item.start_date;
  if (start == null || start === "") return null;
  const startFmt = toMonthYear(start);
  if (!startFmt) return null;

  const isCurrent = item.is_current === true;
  const end = item.end_date;
  if (isCurrent || end == null || end === "") {
    return `${startFmt} - Present`;
  }
  const endFmt = toMonthYear(end);
  return endFmt ? `${startFmt} - ${endFmt}` : `${startFmt} - Present`;
}

/**
 * Split description into bullet lines: newlines, or single block → one bullet.
 * Strips leading "- ", "• ", "* " so list markers aren't duplicated.
 */
function descriptionToBulletLines(value: unknown): string[] {
  const text = formatValue("", value);
  if (text === "—" || !text.trim()) return [];
  return text
    .split(/\r?\n/)
    .map((line) =>
      line
        .trim()
        .replace(/^[-•*]\s+/, "")
        .trim(),
    )
    .filter(Boolean);
}

function isBodyField(key: string, label: string): boolean {
  const k = key.toLowerCase();
  const l = label.toLowerCase();
  return (
    k.includes("description") ||
    l.includes("description") ||
    k.includes("summary") ||
    l.includes("summary")
  );
}

export default function CardVariation2({
  data,
  template,
  templateName,
  title,
  subtitle,
  icon,
  onSave,
  onEdit,
  onDelete,
  addButtonLabel,
  onAdd,
  entryCountLabel,
}: CardVariation2Props) {
  const list = Array.isArray(data)
    ? data
    : data && typeof data === "object"
      ? [data as Record<string, unknown>]
      : [];
  if (list.length === 0) {
    return (
      <div className={`${cardWrapperClass} mb-4 p-6 text-center text-gray-500`}>
        No information available
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {list.map((item, index) => (
        <CardVariation2Entry
          key={(item.id as number | string) ?? index}
          item={item}
          template={template}
          templateName={templateName}
          title={title}
          subtitle={subtitle}
          icon={icon}
          onSave={onSave}
          onEdit={onEdit}
          onDelete={
            onDelete && item.id != null
              ? async () => {
                  const id =
                    typeof item.id === "number" ? item.id : Number(item.id);
                  if (!Number.isNaN(id)) {
                    await deleteWorkExperience(id);
                    onSave?.(item);
                  }
                }
              : onDelete
          }
          addButtonLabel={addButtonLabel}
          onAdd={onAdd}
          entryCountLabel={entryCountLabel}
        />
      ))}
    </div>
  );
}

function CardVariation2Entry({
  item,
  template,
  templateName,
  title,
  subtitle,
  icon,
  onSave,
  onEdit,
  onDelete,
  addButtonLabel,
  onAdd,
  entryCountLabel,
}: CardVariation2EntryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>(() => ({
    ...item,
  }));

  const { titleKey, subtitleKey, chipFields, bodyField } = useMemo(() => {
    if (template.length === 0) {
      return {
        titleKey: null as string | null,
        subtitleKey: null as string | null,
        chipFields: [] as { key: string; label: string }[],
        bodyField: null as { key: string; label: string } | null,
      };
    }
    const body = template.find((t) => isBodyField(t.key, t.label)) ?? null;
    const withoutBody = body
      ? template.filter((t) => t.key !== body.key)
      : template;
    const titleKey = withoutBody[0]?.key ?? null;
    const subtitleKey = withoutBody[1]?.key ?? null;
    const chipFields = withoutBody.slice(2);
    return { titleKey, subtitleKey, chipFields, bodyField: body };
  }, [template]);

  const handleEditClick = () => {
    setFormData({ ...item });
    setFormError(null);
    setIsEditing(true);
    onEdit?.();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const api = TEMPLATE_API[templateName];
    if (api) {
      setSaving(true);
      try {
        await api(formData);
        onSave?.(formData);
        setIsEditing(false);
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "Failed to save");
      } finally {
        setSaving(false);
      }
    } else {
      onSave?.(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...item });
    setIsEditing(false);
  };

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const entryTitle =
    titleKey != null ? formatValue(titleKey, item[titleKey]) : "—";
  const entrySubtitle =
    subtitleKey != null ? formatValue(subtitleKey, item[subtitleKey]) : "";

  const badgeText =
    entryCountLabel ?? (template.length ? "1 entry" : "0 entries");

  return (
    <div className={cardWrapperClass}>
      {/* Header — same structure as card_variation_1 CardHeader */}
      <div className={headerClass}>
        <div className={headerLeftClass}>
          {icon != null ? (
            <div className={`${iconWrapperClass} ${defaultIconClass}`}>
              {icon}
            </div>
          ) : (
            <div className={`${iconWrapperClass} ${defaultIconClass}`}>
              <User className="h-6 w-6" stroke="currentColor" />
            </div>
          )}
          <div>
            <h2 className="text-[1.1rem] font-medium tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-0.5 text-[0.75rem] font-light uppercase tracking-wider text-gray-500">
              {subtitle}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-[0.75rem] font-medium text-gray-500">
          {badgeText}
        </span>
      </div>

      <div className="px-8 py-2 pb-7">
        {formError && (
          <p className="px-0 pt-2 text-sm text-red-600">{formError}</p>
        )}

        {/* Entry — inner panel uses gray borders like variation 1 rows */}
        <div
          className={`mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm ${
            isEditing ? "border-green-500 ring-1 ring-green-500" : ""
          }`}
        >
          {!isEditing ? (
            <div className="flex items-start gap-4 p-5">
              <div className="min-w-0 flex-1">
                <div className="text-[0.97rem] font-medium tracking-tight text-gray-900">
                  {entryTitle}
                </div>
                {entrySubtitle && (
                  <div className="mt-0.5 text-[0.82rem] text-gray-500">
                    {entrySubtitle}
                  </div>
                )}
                {(chipFields.length > 0 ||
                  Boolean(
                    bodyField &&
                    item[bodyField.key] != null &&
                    item[bodyField.key] !== "",
                  )) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {chipFields.map(({ key, label }) => {
                      // Collapse start_date + end_date into one chip: "MM YYYY - MM YYYY"
                      if (key === "end_date") {
                        const hasStart =
                          item.start_date != null && item.start_date !== "";
                        if (hasStart) return null;
                      }
                      if (key === "start_date") {
                        const range = formatDateRangeChip(item);
                        if (range) {
                          return (
                            <span
                              key="date-range"
                              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-100 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-gray-600"
                            >
                              <Calendar className="h-2.5 w-2.5" />
                              {range}
                            </span>
                          );
                        }
                      }

                      const v = item[key];
                      if (v == null || v === "") return null;
                      return (
                        <span
                          key={key}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-100 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-gray-600"
                        >
                          {key.includes("date") || label.includes("Date") ? (
                            <Calendar className="h-2.5 w-2.5" />
                          ) : null}
                          {label}: {formatValue(key, v)}
                        </span>
                      );
                    })}
                  </div>
                )}
                {bodyField &&
                  item[bodyField.key] != null &&
                  item[bodyField.key] !== "" &&
                  (() => {
                    const lines = descriptionToBulletLines(item[bodyField.key]);
                    if (lines.length === 0) return null;
                    return (
                      <div className="mt-2 text-[0.82rem] leading-relaxed text-gray-600">
                        <ul
                          className={
                            lines.length === 1
                              ? "list-disc pl-4 marker:text-gray-500"
                              : "list-disc space-y-1 pl-4 marker:text-gray-500"
                          }
                        >
                          {lines.map((line, i) => (
                            <li key={i} className="pl-0.5">
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                {template.length > 2 &&
                  !bodyField &&
                  chipFields.length === 0 &&
                  template.slice(2).map(({ key, label }) => (
                    <p key={key} className="mt-1 text-[0.82rem] text-gray-600">
                      <span className="font-medium">{label}:</span>{" "}
                      {formatValue(key, item[key])}
                    </p>
                  ))}
              </div>
              <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                <button
                  type="button"
                  title="Edit"
                  onClick={handleEditClick}
                  className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-green-500 px-3 py-1.5 text-[0.8rem] font-medium text-green-600 hover:bg-green-50"
                >
                  <Pencil className="h-[13px] w-[13px]" stroke="currentColor" />
                  Edit
                </button>
                <button
                  type="button"
                  title={onDelete ? "Delete" : "Delete (no handler)"}
                  disabled={!onDelete}
                  onClick={() => onDelete?.()}
                  className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-red-500 px-3 py-1.5 text-[0.8rem] font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <Trash2 className="h-[13px] w-[13px]" stroke="currentColor" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="p-5">
              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {template.map(({ key, label }) => {
                  const isTextarea =
                    isBodyField(key, label) ||
                    String(formData[key] ?? "").length > 60;
                  const value = formData[key];
                  const strVal =
                    typeof value === "boolean"
                      ? value
                        ? "true"
                        : "false"
                      : value == null
                        ? ""
                        : String(value);

                  if (isTextarea) {
                    return (
                      <div
                        key={key}
                        className="flex flex-col gap-1 sm:col-span-2"
                      >
                        <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                          {label}
                        </label>
                        <textarea
                          rows={3}
                          value={typeof value === "boolean" ? "" : strVal}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="w-full resize-none rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                    );
                  }

                  if (typeof item[key] === "boolean" || key === "is_current") {
                    return (
                      <div key={key} className="flex flex-col gap-1">
                        <label className="text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
                          {label}
                        </label>
                        <select
                          value={String(value === true)}
                          onChange={(e) =>
                            handleChange(key, e.target.value === "true")
                          }
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
                        value={strVal}
                        onChange={(e) => handleChange(key, e.target.value)}
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
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          )}
        </div>

        {onAdd && addButtonLabel && (
          <button
            type="button"
            onClick={onAdd}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 py-3 text-[0.82rem] font-medium text-gray-600 transition-colors hover:border-green-500 hover:bg-green-50 hover:text-green-600"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            {addButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
