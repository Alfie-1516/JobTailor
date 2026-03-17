

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

export function formatProject(
  data: Record<string, unknown>,
): viewModeResponseFormat {
  const chipDefs = [
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "technologies", label: "Technologies" },
  ];
  const chipRows: ChipRow[] = [];
  for (const { key, label } of chipDefs) {
    const value = formatScalar(key, data[key], data);
    if (!value) continue;
    chipRows.push({ key, label, value });
  }
  return {
    entryTitle: String(data.project_name) || "—",
    entrySubtitle: String(data.technologies),
    chipRows,
    bodyField: [
      { key: "description_1", value: String(data.description_1) },
      { key: "description_2", value: String(data.description_2) },
      { key: "description_3", value: String(data.description_3) },
    ],
  };
}

export function formatProjectEditFields(
  data: Record<string, unknown>,
): editModeResponseFormat[] {
  return [
    { key: "project_name", label: "Project Name", kind: "text", value: data.project_name },
    { key: "technologies", label: "Technologies", kind: "text", value: data.technologies },
    { key: "project_url", label: "Project URL", kind: "text", value: data.project_url },
    { key: "github_url", label: "GitHub URL", kind: "text", value: data.github_url },
    { key: "start_date", label: "Start Date", kind: "text", value: data.start_date },
    { key: "end_date", label: "End Date", kind: "text", value: data.end_date },
    { key: "description_1", label: "Description 1", kind: "textarea", value: data.description_1 },
    { key: "description_2", label: "Description 2", kind: "textarea", value: data.description_2 },
    { key: "description_3", label: "Description 3", kind: "textarea", value: data.description_3 },
  ];
}

export function formatCertification(
  data: Record<string, unknown>,
): viewModeResponseFormat {
  const chipDefs = [{ key: "date_obtained", label: "Date Obtained" }];
  const chipRows: ChipRow[] = [];
  for (const { key, label } of chipDefs) {
    const value = formatScalar(key, data[key], data);
    if (!value) continue;
    chipRows.push({ key, label, value });
  }
  return {
    entryTitle: String(data.certification_name) || "—",
    entrySubtitle: String(data.certification_issuer),
    chipRows,
    bodyField: [],
  };
}

export function formatCertificationEditFields(
  data: Record<string, unknown>,
): editModeResponseFormat[] {
  return [
    { key: "certification_name", label: "Certification Name", kind: "text", value: data.certification_name },
    { key: "certification_issuer", label: "Issuer", kind: "text", value: data.certification_issuer },
    { key: "date_obtained", label: "Date Obtained", kind: "text", value: data.date_obtained },
  ];
}
