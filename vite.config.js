import "dotenv/config";
import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "./src/client",
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    react(),
  ],
  server: {
    port: parseInt(process.env.VITE_CLIENT_PORT, 10),
    open: process.env.VITE_OPEN_BROWSER === "true",
    proxy: {
      "/api": `http://localhost:${process.env.VITE_API_PORT}`,
    },
  },
  build: {
    outDir: path.join(__dirname, "./dist/client-build"),
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
