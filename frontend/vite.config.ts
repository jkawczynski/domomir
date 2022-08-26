import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";

const manualChunks = (id) => {
  if (id.includes("node_modules")) {
    if (id.includes("@mui")) {
      return "vendor_mui";
    }
    return "vendor";
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: manualChunks,
      },
    },
  },
});
