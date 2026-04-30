export interface CertificationApiResponse {
  message: string;
  data: [];
}

export interface CertificationApiRow {
  id: number;
  user_id: number;
  certification_name: string;
  certification_issuer: string;
  date_obtained: string;
}
