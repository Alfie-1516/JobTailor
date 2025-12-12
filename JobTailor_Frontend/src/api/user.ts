import { makeRequest } from "./index";

export async function getUser() {
  return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    method: "GET",
  });
}
