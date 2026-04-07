export const APP_NAME = "Fluxsum";
export const APP_VERSION = "0.1.0";

export const API_ENDPOINTS = {
  AUTH: "/auth",
  USERS: "/users",
  HEALTH: "/health",
} as const;

export const STORAGE_KEYS = {
  TOKEN: "fluxsum_token",
  USER: "fluxsum_user",
  THEME: "fluxsum_theme",
} as const;
