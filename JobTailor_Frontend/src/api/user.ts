import { makeRequest } from ".";

export function getUserDetails() {
    return makeRequest(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        method: "GET",
    });
}