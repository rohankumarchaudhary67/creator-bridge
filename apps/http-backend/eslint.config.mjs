import {config} from "@repo/eslint-config/base";

export default [
  ...config,
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'], 
    ignores: ['dist/**', 'node_modules/**'], 
  }
];