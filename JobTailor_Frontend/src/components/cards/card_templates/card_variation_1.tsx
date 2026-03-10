"use client";

import type React from "react";
import { useState } from "react";
import type { SectionTemplateItem } from "@/components/templates/personalInformation";
import { Pencil, Plus, User, Check, X } from "lucide-react";
import { updatePersonalInformation } from "@/api/personalInformation";

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
};

export type CardVariation1Props = {
  item: Record<string, unknown>;
  template: SectionTemplateItem[];
  templateName: string;
  onEdit?: () => void;
  onSave?: (updatedItem: Record<string, unknown>) => void;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
};

export default function CardVariation1({
  item,
  template,
  templateName,
  onEdit,
  onSave,
  title,
  subtitle,
  icon,
}: CardVariation1Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>(() => ({ ...item }));

  const filledRows = template.filter(
    ({ key }) => item[key] != null && item[key] !== "",
  );
  const emptyFields = template
    .filter(({ key }) => item[key] == null || item[key] === "")
    .map(({ key, label }) => ({ key, label }));

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

  const handleFormChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className={cardWrapperClass}>
        <CardHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          actions={
            <div className="flex items-center gap-2">
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
          }
        />
        {formError && (
          <p className="px-8 pt-2 text-sm text-red-600">{formError}</p>
        )}
        <div className="px-8 py-2 pb-7">
          {template.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center border-b border-gray-200 py-[18px] last:border-0"
            >
              <label
                htmlFor={key}
                className="w-[110px] flex-shrink-0 text-[0.72rem] font-medium uppercase tracking-wider text-gray-500"
              >
                {label}
              </label>
              <input
                id={key}
                type="text"
                value={String(formData[key] ?? "")}
                onChange={(e) => handleFormChange(key, e.target.value)}
                className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1.5 text-[0.97rem] text-gray-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          ))}
        </div>
      </form>
    );
  }

  return (
    <div className={cardWrapperClass}>
      <CardHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        actions={
          <button
            type="button"
            onClick={handleEditClick}
            className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-green-500 px-3.5 py-1.5 text-[0.8rem] font-medium text-green-600"
          >
            <Pencil className="h-[13px] w-[13px]" stroke="currentColor" />
            Edit
          </button>
        }
      />
      <div className="px-8 py-2 pb-7">
        {filledRows.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-baseline border-b border-gray-200 py-[18px] last:border-0"
          >
            <span className="w-[110px] flex-shrink-0 text-[0.72rem] font-medium uppercase tracking-wider text-gray-500">
              {label}
            </span>
            <span
              className={`text-[0.97rem] font-normal tracking-tight ${key === "email" ? "font-medium text-gray-600" : "text-gray-900"}`}
            >
              {String(item[key])}
            </span>
          </div>
        ))}
        {emptyFields.length > 0 && (
          <div className="mt-1 rounded-xl border border-dashed border-gray-200 bg-gray-100 p-4 px-[18px]">
            <p className="mb-2.5 text-[0.7rem] font-medium uppercase tracking-wider text-gray-500">
              Complete your profile — missing fields:
            </p>
            <div className="flex flex-wrap gap-2">
              {emptyFields.map(({ key, label }) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[0.78rem] font-medium text-gray-900"
                >
                  <Plus className="h-[11px] w-[11px]" stroke="currentColor" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CardHeader({
    title,
    subtitle,
    icon,
    actions,
  }: {
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
    actions: React.ReactNode;
  }) {
    return (
      <div className={headerClass}>
        <div className={headerLeftClass}>
          {icon != null ? (
            <div className={`${iconWrapperClass} text-gray-900`}>{icon}</div>
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
        {actions}
      </div>
    );
  }
