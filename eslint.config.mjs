import js from "@eslint/js";
import tseslint from "typescript-eslint";
import lit from "eslint-plugin-lit";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist/", "node_modules/", ".dev/", "assets/", "*.js", "*.mjs"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  lit.configs["flat/recommended"],
  prettier,
  {
    rules: {
      // Tightened over time (Phase 9 halved the count); not yet zero.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  }
);
