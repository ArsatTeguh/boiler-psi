"use server";

import ApiResponse from "../interfaces/api-response";
import { getSsotok } from "../libs/getSsotok";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const defaultRequestHeaders: HeadersInit = {
  Accept: "application/json",
};

type MakeRequest = {
  endpoint: string;
  method?: string;
  additionalHeaders?: HeadersInit;
  body?: BodyInit | null;
  needsAuthorize?: boolean;
  tags?: string[];
  isFormData?: boolean;
};

export async function fetchAPI<T>({
  endpoint,
  method = "GET",
  additionalHeaders,
  body,
  needsAuthorize = true,
  tags,
  isFormData = false,
}: MakeRequest): Promise<ApiResponse<T>> {
  if (needsAuthorize) {
    // let token = await getParTok();
    let token = ''
    if (!token) {
      token = (await getSsotok()) || "";
    }
    additionalHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      method: method,
      body: body,
      headers: {
        ...defaultRequestHeaders,
        ...additionalHeaders,
        ...(!isFormData && { "Content-Type": "application/json" }),
      },
      next: { tags },
      cache: "no-store",
    });

    // for checking is server is down or not
    // recreate new response
    if ([500, 502, 503, 504].includes(res.status)) {
      return {
        error: true,
        data: null,
        code: res.status,
        message: res.statusText,
      } as ApiResponse<T>;
    }

    if (res.status === 404) {
      return {
        error: true,
        data: null,
        code: 404,
        message: res.statusText,
      };
    }

    const data: ApiResponse<T> = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      return {
        error: true,
        data: null,
        code: 500,
        message: error.message,
      };
    }

    return error as ApiResponse<T>;
  }
}
