import { getCookie } from "cookies-next";
import config from "../config";
import { SESSION_COOKIE_NAME } from "@/features/auth/auth.const";

interface HttpRequestOptions extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers?: { [key: string]: string };
}

export const request = async <T>(
  endpoint: string,
  { body, ...customConfig }: HttpRequestOptions = {},
): Promise<T> => {
  const accessToken = getCookie(SESSION_COOKIE_NAME);

  const requestConfig: RequestInit = {
    method: customConfig.method || "GET",
    ...customConfig,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(customConfig.headers || {}),
    },
    next: {
      revalidate: 10,
    },
  };

  if (body) {
    requestConfig.body = JSON.stringify(body);
  }

  const response = await fetch(`${config.apiUrl}${endpoint}`, requestConfig);
  if (response.ok) {
    const responseData = await response.text();
    return responseData ? (JSON.parse(responseData) as T) : (responseData as T);
  }
  const errorMessage = await response.text();
  const error = new Error(errorMessage) as any;
  error.status = response.status;
  throw error;
};
