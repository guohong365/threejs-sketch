import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import glslify from "vite-plugin-glslify";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), glslify()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
    assetsInlineLimit: 0,
  },
});
