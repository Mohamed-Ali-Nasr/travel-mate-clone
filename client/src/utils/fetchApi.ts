import { getToken } from "./auth";

export const apiURL: string = import.meta.env.VITE_BASE_URL;

const fetchApi = (path: string, options: RequestInit) => {
  if (!options.headers) {
    options.headers = {} as HeadersInit;
  }

  if (typeof options.body === "string") {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }

  const token = getToken();

  if (token) {
    options.headers = {
      ...options.headers,
      authorization: `Bearer ${token}`,
    };
  }

  const url = `${apiURL}${path}`;

  return fetch(url, options);
};

export default fetchApi;

export type ServerResponse = {
  message: string;
};
