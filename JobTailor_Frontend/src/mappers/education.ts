export interface EducationApiResponse {
    message: string;
    data: [];
}

export interface EducationApiRow {
    id: number;
    created_at: string;
    user_id: number;
    school: string;
    degree: string;
    major: string;
    minor: string;
    start_date: string;
    end_date: string;
}