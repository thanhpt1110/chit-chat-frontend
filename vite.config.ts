import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// Load environment variables based on the mode
	dotenv.config({ path: `.env.${mode}` });

	return {
		plugins: [react()],
		server: {
			open: true,
		},
	};
});
