import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "comma_agents_repo/**", "hub_repo/**", ".astro/**"],
  },
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
