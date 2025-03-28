import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // O Vercel espera um diretório "dist"
  },
  server: {
    port: 3000
  }
});