import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/Kofi-clone/", // Add this line to set the base path for GitHub Pages
  plugins: [react()],
});
