"use server";

import { fetchAPI } from "@/config/fetch-api";

export async function LoginUser(user: { email: string }) {
  const res = await fetchAPI({
    endpoint: "/api/user",
    method: "POST",
    needsAuthorize: false,
    body: JSON.stringify(user),
  });

  return res;
}

export async function Me() {
  const res = await fetchAPI({
    endpoint: "/api/user",
    method: "GET",
    needsAuthorize: false,
  });

  return res;
}
