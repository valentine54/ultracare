import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [".ngrok-free.app"],
    cors: true, 
  },
  build: {
    outDir: "dist", // Ensures the output folder is 'dist'
    emptyOutDir: true, // Clears old files before building
  },
});
