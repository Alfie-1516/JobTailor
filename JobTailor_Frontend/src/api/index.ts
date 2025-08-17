// src/api/index.ts

// ============================================================================
// API Configuration
// ============================================================================
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001/api";

// ============================================================================
// Utility Functions
// ============================================================================
async function makeRequest(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// ============================================================================
// Authentication APIs
// ============================================================================
export async function signup(data: any) {
  return makeRequest(`${API_BASE_URL}/users/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(username: string, password: string) {
  return makeRequest(`${API_BASE_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// ============================================================================
// User Management APIs
// ============================================================================
export async function get_user_by_username(username: string) {
  return makeRequest(`${API_BASE_URL}/users/username/${username}`);
}

// ============================================================================
// User Details/Profile APIs
// ============================================================================
export async function get_user_details(id: string) {
  return makeRequest(`${API_BASE_URL}/about-users/${id}`);
}

export async function create_user_details(
  userId: string,
  firstName: string,
  lastName: string,
  email: string
) {
  return makeRequest(`${API_BASE_URL}/about-users`, {
    method: "POST",
    body: JSON.stringify({ userId, firstName, lastName, email }),
  });
}

export async function save_form_data(
  id: string,
  formData: any,
  subSectionId: string,
  section: string
) {
  return makeRequest(`${API_BASE_URL}/about-users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ section, data: formData, subSectionId }),
  });
}

export async function delete_form_data(
  id: string,
  subSectionId: string,
  section: string
) {
  return makeRequest(`${API_BASE_URL}/about-users/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ section, subSectionId }),
  });
}

export async function generate_resume(
  jobDescription: string,
  userDetails: string
) {
  return makeRequest(`${API_BASE_URL}/generate-resume`, {
    method: "POST",
    body: JSON.stringify({ jobDescription, userDetails }),
  });
}

export async function generate_cover_letter(
  jobDescription: string,
  userDetails: string,
  companyName: string
) {
  return makeRequest(`${API_BASE_URL}/generate-cover-letter`, {
    method: "POST",
    body: JSON.stringify({ jobDescription, userDetails, companyName }),
  });
}

export async function generate_interview_notes(
  jobDescription: string,
  userDetails: string,
  companyName: string
) {
  return makeRequest(`${API_BASE_URL}/generate-interview-notes`, {
    method: "POST",
    body: JSON.stringify({ jobDescription, userDetails, companyName }),
  });
}
