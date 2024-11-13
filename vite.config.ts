import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [react()],
    server: {
      open: true,
      proxy: {
        "/api": {
          target: "http://18.138.250.74",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
