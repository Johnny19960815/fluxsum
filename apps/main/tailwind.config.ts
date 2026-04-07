import type { Config } from "tailwindcss";
import sharedConfig from "@fluxsum/tailwind-config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui-kit/src/**/*.{ts,tsx}",
  ],
};

export default config;
