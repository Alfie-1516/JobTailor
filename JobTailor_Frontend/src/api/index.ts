// src/api/index.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001/api";

async function handleFetch(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error at ${url}:`, error);
    throw error; // rethrow for caller to handle if needed
  }
}

export async function test_api() {
  return handleFetch(`${API_BASE_URL}/`, {
    method: "GET",
  });
}

export async function signup(data: any) {
  return handleFetch(`${API_BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function login(username: string, password: string) {
  return await handleFetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function get_user_by_username(username: string) {
  return handleFetch(`${API_BASE_URL}/users/username/${username}`, {
    method: "GET",
  });
}

export async function get_user_details(id: string) {
  return handleFetch(`${API_BASE_URL}/about-users/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

export async function create_user_details(
  userId: string,
  firstName: string,
  lastName: string,
  email: string
) {
  return handleFetch(`${API_BASE_URL}/about-users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, firstName, lastName, email }),
  });
}

export async function save_form_data(
  id: string,
  formData: any,
  section: string
) {
  return handleFetch(`${API_BASE_URL}/about-users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, data: formData }),
  });
}
