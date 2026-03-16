import { makeRequest } from ".";

export function getUserDetails() {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    method: "GET",
  });
}

export function addWorkExperience(workExperience: Record<string, unknown>) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workExperience`, {
    method: "POST",
    body: JSON.stringify({ workExperience }),
  });
}

export function getWorkExperience() {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workExperience`, {
    method: "GET",
  });
}

export function updateWorkExperience(data: any) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workExperience`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteWorkExperience(id: number) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workExperience`, {
    method: "DELETE",
    body: JSON.stringify({ workExperience: { id } }),
  });
}

export function addEducation(education: Record<string, unknown>) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education`, {
    method: "POST",
    body: JSON.stringify({ education }),
  });
}

export function getEducation() {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education`, {
    method: "GET",
  });
}

export function updateEducation(data: Record<string, unknown>) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education`, {
    method: "PUT",
    body: JSON.stringify({ education: data }),
  });
}

export function deleteEducation(id: number) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/education`, {
    method: "DELETE",
    body: JSON.stringify({ education: { id } }),
  });
}
