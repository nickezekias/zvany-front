interface OFetchOptions {
  baseURL?: string
  headers?: Record<string, string>;
}
export default function (url: string, options: OFetchOptions = {}) {
  options.headers = {};

  const token = useCookie("XSRF-TOKEN");

  if (token.value) {
    options.headers["X-XSRF-TOKEN"] = token.value;
  }
  options.baseURL = import.meta.env.VITE_BACKEND_URL

  return useFetch("http://localhost:8000" + url, {
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