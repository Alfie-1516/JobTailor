import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.{test,spec}.js", "**/*.{test,spec}.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
    },
  },
});
