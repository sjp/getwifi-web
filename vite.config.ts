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
    // `@preact/preset-vite` types its plugin against the standalone `vite`
    // package, whereas vite-plus types `plugins` against its own bundled vite
    // (`@voidzero-dev/vite-plus-core`). The two `Plugin` types are structurally
    // identical but distinct, so comparing them blows the TS recursion depth
    // (TS2321/TS2769). Casting sidesteps the cross-package comparison.
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
      },
    }) as never,
  ],
  css: { preprocessorOptions: { scss: { quietDeps: true } } },
});
