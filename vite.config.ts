import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^lottie-web$/,
        replacement: fileURLToPath(
          new URL(
            "./node_modules/lottie-web/build/player/lottie_light.js",
            import.meta.url,
          ),
        ),
      },
    ],
  },
  build: { chunkSizeWarningLimit: 650 },
  server: { host: "127.0.0.1", port: 5173 },
});
