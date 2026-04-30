import { makeRequest } from ".";

const USER_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;

export type PersonalInformationPayload = Record<string, unknown>;

export async function updatePersonalInformation(
  data: PersonalInformationPayload
) {
  return makeRequest(USER_URL, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
