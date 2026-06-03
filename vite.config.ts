import { defineConfig } from "vite-plus";
import preact from "@preact/preset-vite";

// Generated i18n output (typesafe-i18n) and build output are not ours to
// format or lint. This mirrors the old biome.json `!**/src/i18n` exclusion.
const ignorePatterns = ["src/i18n/**", "dist/**"];

// https://vitejs.dev/config/
export default defineConfig({
  fmt: {
    ignorePatterns,
  },
  lint: {
    ignorePatterns,
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    // No test suites yet; don't fail the test command until some exist.
    passWithNoTests: true,
  },
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
      },
    }),
  ],
  css: { preprocessorOptions: { scss: { quietDeps: true } } },
});
