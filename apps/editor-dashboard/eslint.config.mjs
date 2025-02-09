import { nextJsConfig } from "@repo/eslint-config/next-js";

export default [
  ...nextJsConfig,
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    ignores: ['.next/**', 'node_modules/**'],
  }
];