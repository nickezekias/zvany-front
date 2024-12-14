import type { UseFetchOptions } from "#app";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (url: string, options: UseFetchOptions<unknown, unknown, any, null, string, any> = {}) {
  options.headers = {};

  const token = useCookie("XSRF-TOKEN");

  if (token.value) {
    options.headers["X-XSRF-TOKEN"] = token.value;
  }
  options.baseURL = import.meta.env.VITE_BACKEND_URL

  return useFetch( url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...useRequestHeaders(["cookie"]),
      referer: "http://localhost:3000",
    },
  });
}