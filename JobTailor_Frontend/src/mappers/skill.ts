export interface SkillApiResponse {
  message: string;
  data: Record<string, unknown>[];
}

export interface SkillApiRow {
  id: number;
  user_id: number;
  skill_name: string;
  skill_category: string;
  proficiency_level: string;
  years_of_experience: number;
  created_at: string;
  updated_at: string | null;
}
