import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Mark 'recharts' as an external dependency so that it's not bundled
      external: ["recharts"],
    },
  },
});
