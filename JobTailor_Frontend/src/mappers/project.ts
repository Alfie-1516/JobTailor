export interface ProjectApiResponse {
  message: string;
  data: [];
}

export interface ProjectApiRow {
  id: number;
  user_id: number;
  project_name: string;
  technologies: string;
  project_url: string;
  github_url: string;
  start_date: string;
  end_date: string;
  description_1: string;
  description_2: string;
  description_3: string;
}
