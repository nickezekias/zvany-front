export const $api = (url: string, options = {}, headers: Record<string, unknown> = {}) => {
  const token = useCookie("XSRF-TOKEN");

  if (token.value) {
    headers["X-XSRF-TOKEN"] = token.value;
  }

  const apiFetch = $fetch.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
  });

  return apiFetch(url, {
    ...options,
  });
};