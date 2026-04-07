import { preloadApp } from "wujie";
import type { PreloadConfig } from "./types";

export const preloadApps = (configs: PreloadConfig[]): void => {
  configs.forEach((config) => {
    preloadApp({
      name: config.name,
      url: config.url,
      alive: config.alive ?? true,
      exec: config.exec ?? true,
    });
  });
};

export const preloadOnIdle = (configs: PreloadConfig[]): void => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      preloadApps(configs);
    });
  } else {
    setTimeout(() => {
      preloadApps(configs);
    }, 1000);
  }
};
