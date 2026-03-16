

import { formatScalar } from "@/util/dateformatter";

export type ChipRow = { key: string; label: string; value: string };

export type viewModeResponseFormat = {
  entryTitle: string;
  entrySubtitle: string;
  chipRows: ChipRow[];
  bodyField: { key: string; value: string }[];
};

export type editModeResponseFormat = {
  key: string;
  label: string;
  kind: "text" | "boolean" | "textarea";
  value: unknown;
};

//This function is used to format the data for the view mode of the work experience card
export function formatWorkExperience(
  data: Record<string, unknown>,
): viewModeResponseFormat {
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
    entryTitle: String(data.job_title) || "—",
    entrySubtitle: String(data.company),
    chipRows,
    bodyField: [{ key: "description_1", value: String(data.description_1) }, { key: "description_2", value: String(data.description_2) }, { key: "description_3", value: String(data.description_3) }],
  };
}


//This function is used to format the data for the edit mode of the work experience card
//Majoroly to give each field its input type and value
export function formatWorkExperienceEditFields(
  data: Record<string, unknown>,
): editModeResponseFormat[] {

  const fields: editModeResponseFormat[] = [
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

export function formatEducation(
  data: Record<string, unknown>,
): viewModeResponseFormat {
  return {
    entryTitle: String(data.institution_name) || "—",
    entrySubtitle: String(data.degree),
    chipRows: [{key: "major", label: "Major", value: String(data.major) }, { key: "start_date", label: "Start Date", value: String(data.start_date) }, { key: "end_date", label: "End Date", value: String(data.end_date) }],
    bodyField: [],
  };
}

export function formatEducationEditFields(
  data: Record<string, unknown>,
): editModeResponseFormat[] {
  return [
    { key: "institution_name", label: "Institution", kind: "text", value: data.institution_name },
    { key: "degree", label: "Degree", kind: "text", value: data.degree },
    { key: "major", label: "Major", kind: "text", value: data.major },
    { key: "start_date", label: "Start Date", kind: "text", value: data.start_date },
    { key: "end_date", label: "End Date", kind: "text", value: data.end_date },
  ];
}
