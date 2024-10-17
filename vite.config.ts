import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
// biome-ignore lint/style/noDefaultExport: required by vite
export default defineConfig({
  plugins: [preact()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        quietDeps: true,
      },
    },
  },
});
