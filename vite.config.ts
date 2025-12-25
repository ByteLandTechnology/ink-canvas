import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { inkCanvasPolyfills } from "./src/plugin";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    libInjectCss(),
    inkCanvasPolyfills(true),
    dts({
      insertTypesEntry: true,
      include: ["src"],
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  build: {
    lib: {
      entry: {
        "ink-canvas": path.resolve(__dirname, "src/index.ts"),
        "shims/process": path.resolve(__dirname, "src/shims/process.ts"),
        plugin: path.resolve(__dirname, "src/plugin.ts"),
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "ink",
        "@xterm/xterm",
        "@xterm/addon-fit",
        "vite-plugin-node-polyfills",
      ],
      output: {
        exports: "named",
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
