import { makeRequest } from ".";

export function getUserDetails() {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    method: "GET",
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

/** Backend expects DELETE /workExperience with body { workExperience: { id } } */
export function deleteWorkExperience(id: number) {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workExperience`, {
    method: "DELETE",
    body: JSON.stringify({ workExperience: { id } }),
  });
}
