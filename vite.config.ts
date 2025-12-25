import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dts from "vite-plugin-dts";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
    nodePolyfills({
      exclude: ["process"],
      globals: {
        Buffer: true,
        global: true,
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "node:process": path.resolve(__dirname, "src/shims/process.ts"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "InkCanvas",
      fileName: (format) => `ink-canvas.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "react",
        "react-dom",
        "ink",
        "@xterm/xterm",
        "@xterm/addon-fit",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          ink: "Ink",
          "@xterm/xterm": "xterm",
          "@xterm/addon-fit": "addonFit",
        },
      },
    },
  },
});
