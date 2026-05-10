import type { Config } from "tailwindcss";
import sharedConfig from "@synaptech/tailwind-config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
