/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
      },
    }),
  ],
  css: { preprocessorOptions: { scss: { quietDeps: true } } },
  test: {
    environment: "happy-dom",
    restoreMocks: true,
    setupFiles: ["src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      // Generated i18n output (typesafe-i18n) is not ours to test.
      exclude: ["src/i18n/**", "src/**/*.test.{ts,tsx}", "src/vite-env.d.ts", "src/test/**"],
    },
  },
});
