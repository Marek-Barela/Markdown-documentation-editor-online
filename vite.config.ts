import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: "./file-api/dist",
  },
  resolve: {
    alias: {
      src: path.resolve("/src"),
    },
  },
});
