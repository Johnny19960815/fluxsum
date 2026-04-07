import { createConnectTransport } from "@connectrpc/connect-web";

const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return import.meta.env?.VITE_API_URL || "/api";
  }
  return process.env.API_URL || "http://localhost:8080";
};

export const transport = createConnectTransport({
  baseUrl: getBaseUrl(),
});

export const createApiClient = (baseUrl?: string) => {
  return createConnectTransport({
    baseUrl: baseUrl || getBaseUrl(),
  });
};
