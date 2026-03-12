/**
 * Work experience (and reusable) view/edit formatting.
 * View: entry lines + chip rows + body field; edit: field kind per template row.
 */

import { formatScalar } from "@/util/dateformatter";

export type ChipRow = { key: string; label: string; value: string };

export type FormatWorkExperienceResult = {
  entryTitle: string;
  entrySubtitle: string;
  chipRows: ChipRow[];
  bodyField: { key: string; value: string }[];
};

function str(v: unknown): string {
  if (v == null || v === "") return "";
  return String(v).trim();
}

/**
 * Maps work experience API-shaped `data` to view parts:
 * - entryTitle / entrySubtitle from job_title / company
 * - chipRows for dates, current role, technologies (formatted via formatScalar)
 * - bodyField for description
 */
export function formatWorkExperience(
  data: Record<string, unknown>,
): FormatWorkExperienceResult {
  const chipDefs = [
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "is_current", label: "Current Role" },
    { key: "technologies", label: "Technologies" },
  ];

  const chipRows: ChipRow[] = [];
  for (const { key, label } of chipDefs) {
    const value = formatScalar(key, data[key], data);
    if (!value) continue;
    chipRows.push({ key, label, value });
  }

  return {
    entryTitle: str(data.job_title) || "—",
    entrySubtitle: str(data.company),
    chipRows,
    bodyField: [{ key: "description_1", value: str(data.description_1) }, { key: "description_2", value: str(data.description_2) }, { key: "description_3", value: str(data.description_3) }],
  };
}
export type WorkExperienceEditField = {
  key: string;
  label: string;
  kind: "text" | "boolean" | "textarea";
  value: unknown;
};

/**
 * Builds a single description string for edit/view when API returns
 * tbl_work_experience_descriptions: [{ description }, ...]
 */
function joinWorkExperienceDescriptions(data: Record<string, unknown>): string {
  const nested = data.tbl_work_experience_descriptions;
  if (Array.isArray(nested) && nested.length > 0) {
    const lines = nested
      .map((row) => {
        if (row && typeof row === "object" && "description" in row) {
          return str((row as { description: unknown }).description);
        }
        return "";
      })
      .filter(Boolean);
    if (lines.length > 0) return lines.join("\n");
  }
  return str(data.description);
}
/**
 * Edit fields for work experience form. Description is merged from
 * tbl_work_experience_descriptions when present, else data.description.
 */
export function formatWorkExperienceEditFields(
  data: Record<string, unknown>,
): WorkExperienceEditField[] {

  const fields: WorkExperienceEditField[] = [
    { key: "job_title", label: "Job Title", kind: "text", value: data.job_title },
    { key: "company", label: "Company", kind: "text", value: data.company },
    { key: "start_date", label: "Start Date", kind: "text", value: data.start_date },
    { key: "end_date", label: "End Date", kind: "text", value: data.end_date },
    { key: "is_current", label: "Current Role", kind: "boolean", value: data.is_current },
    { key: "technologies", label: "Technologies", kind: "text", value: data.technologies },
    { key: "description_1", label: "Description 1", kind: "textarea", value: data.description_1 },
    { key: "description_2", label: "Description 2", kind: "textarea", value: data.description_2 },
    { key: "description_3", label: "Description 3", kind: "textarea", value: data.description_3 },
  ];
  
  return fields;
}

