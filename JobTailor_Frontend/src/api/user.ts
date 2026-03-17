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

export function getProjects() {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    method: "GET",
  });
}

export function addProject(project: Record<string, unknown>) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    method: "POST",
    body: JSON.stringify({ project }),
  });
}

export function updateProject(data: Record<string, unknown>) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    method: "PUT",
    body: JSON.stringify({ project: data }),
  });
}

export function deleteProject(id: number) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
    method: "DELETE",
    body: JSON.stringify({ project: { id } }),
  });
}

export function getCertifications() {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/certification`, {
    method: "GET",
  });
}

export function addCertification(certification: Record<string, unknown>) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/certification`, {
    method: "POST",
    body: JSON.stringify({ certification }),
  });
}

export function updateCertification(data: Record<string, unknown>) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/certification`, {
    method: "PUT",
    body: JSON.stringify({ certification: data }),
  });
}

export function deleteCertification(id: number) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/certification`, {
    method: "DELETE",
    body: JSON.stringify({ certification: { id } }),
  });
}
