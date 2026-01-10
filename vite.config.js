import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [".ngrok-free.app"],
    cors: true, // fine to keep
    proxy: {
      // forward API calls to Django (dev only)
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
      // forward media (served PDFs) to Django
      "/media": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
