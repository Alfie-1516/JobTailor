/**
 * Work experience API response types and mappers → CardVariation2 / formTemplates shape.
 */

/** Single row from tbl_work_experience_descriptions */
export interface WorkExperienceDescriptionRow {
  id: number;
  created_at: string;
  updated_at: string | null;
  description: string;
  work_experience_id: number;
}

/** One work experience row as returned by the API */
export interface WorkExperienceApiRow {
  id: number;
  created_at: string;
  user_id: number;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  technologies: string | null;
  updated_at: string | null;
  description_1: string | null;
  description_2: string | null;
  description_3: string | null;
}

/** Top-level API response */
export interface WorkExperienceApiResponse {
  message: string;
  data: [];
}

/**
 * Flat shape aligned with formTemplates.workExperience keys
 * (job_title, company, start_date, end_date, is_current, technologies, description).
 * Extra keys preserved for save/API round-trip.
 */
export interface WorkExperienceCardItem extends Record<string, unknown> {
  id: number;
  job_title: string;
  company: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  technologies: string;
  description_1: string | null;
  description_2: string | null;
  description_3: string | null;
  /** Original nested descriptions for save flows that need IDs */
  _descriptions?: WorkExperienceDescriptionRow[];
}

function joinDescriptions(
  rows: WorkExperienceDescriptionRow[] | undefined,
): string {
  if (!rows?.length) return "";
  return rows
    .map((r) => r.description?.trim())
    .filter(Boolean)
    .join("\n");
}

/**
 * Maps one API row to a flat card item (CardVariation2 / template keys).
 */
export function mapWorkExperienceApiRowToCardItem(
  row: WorkExperienceApiRow,
): WorkExperienceCardItem {
  return {
    id: row.id,
    job_title: row.job_title ?? "",
    company: row.company ?? "",
    start_date: row.start_date ?? "",
    end_date: row.end_date,
    is_current: Boolean(row.is_current),
    technologies: row.technologies ?? "",
    description_1: row.description_1 ?? "",
    description_2: row.description_2 ?? "",
    description_3: row.description_3 ?? "",
    // Optional: keep audit fields if card ever needs them
    created_at: row.created_at,
    user_id: row.user_id,
    updated_at: row.updated_at,
  };
}

/**
 * Maps full API response to an array of card items.
 */
export function mapWorkExperienceResponseToCardItems(
  response: WorkExperienceApiResponse,
): WorkExperienceCardItem[] {
  return (response.data ?? []).map(mapWorkExperienceApiRowToCardItem);
}

/**
 * If the fetch returns JSON without the wrapper, accept raw array.
 */
export function mapWorkExperienceArrayToCardItems(
  rows: WorkExperienceApiRow[],
): WorkExperienceCardItem[] {
  return rows.map(mapWorkExperienceApiRowToCardItem);
}
