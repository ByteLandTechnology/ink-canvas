/**
 * Vite Configuration for ink-canvas Library
 *
 * This configuration file sets up the Vite build system for the ink-canvas library.
 * It configures:
 * - React plugin with React Compiler for optimized builds
 * - CSS injection for library mode
 * - Node.js polyfills for browser compatibility
 * - TypeScript declaration file generation
 * - Library build with multiple entry points
 * - External dependencies to avoid bundling peer dependencies
 *
 * @see https://vite.dev/config/
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { inkCanvasPolyfills } from "./src/plugin";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import path from "path";

export default defineConfig({
  /**
   * Vite Plugins Configuration
   *
   * Plugins are processed in order, so the sequence matters for some functionality.
   */
  plugins: [
    /**
     * @vitejs/plugin-react
     *
     * Enables React support with SWC/Babel transformation.
     * Configured with React Compiler (babel-plugin-react-compiler) for automatic
     * memoization and performance optimizations.
     *
     * @see https://react.dev/learn/react-compiler
     */
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    /**
     * vite-plugin-lib-inject-css
     *
     * Automatically injects CSS imports into the JavaScript bundle when building
     * in library mode. This ensures that consumers of the library get the required
     * styles when they import the component.
     *
     * Without this plugin, library consumers would need to manually import CSS files.
     *
     * @see https://www.npmjs.com/package/vite-plugin-lib-inject-css
     */
    libInjectCss(),

    /**
     * inkCanvasPolyfills (development mode)
     *
     * Custom plugin from ink-canvas that configures Node.js polyfills for browser
     * environments. The `true` parameter indicates development mode, which uses
     * local source file paths instead of npm package paths for the process shim.
     *
     * This enables hot module replacement (HMR) during library development.
     *
     * @see ./src/plugin.ts for implementation details
     */
    inkCanvasPolyfills(true),

    /**
     * vite-plugin-dts
     *
     * Generates TypeScript declaration files (.d.ts) from the source files.
     * This is essential for TypeScript consumers to have proper type information.
     *
     * Configuration:
     * - insertTypesEntry: Adds "types" entry to package.json exports
     * - include: Only process files in the "src" directory
     * - tsconfigPath: Uses separate tsconfig for build (excludes test files, etc.)
     *
     * @see https://www.npmjs.com/package/vite-plugin-dts
     */
    dts({
      insertTypesEntry: true,
      include: ["src"],
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],

  /**
   * Build Configuration
   *
   * Configures how Vite builds the library for distribution.
   */
  build: {
    /**
     * Library Mode Configuration
     *
     * Configures Vite to build as a library rather than an application.
     * This enables features like multiple entry points and proper module exports.
     */
    lib: {
      /**
       * Entry Points
       *
       * Defines multiple entry points for the library, each becoming a separate
       * bundle in the dist folder:
       *
       * - "ink-canvas": Main library entry with InkCanvas component and utilities
       * - "shims/process": Custom process shim for Node.js compatibility in browsers
       * - "plugin": Vite plugin for consumers to configure their own projects
       *
       * Each entry corresponds to an export path in package.json:
       * - "." → ink-canvas
       * - "./shims/process" → shims/process
       * - "./plugin" → plugin
       */
      entry: {
        "ink-canvas": path.resolve(__dirname, "src/index.ts"),
        "shims/process": path.resolve(__dirname, "src/shims/process.ts"),
        plugin: path.resolve(__dirname, "src/plugin.ts"),
      },

      /**
       * Output File Naming Convention
       *
       * Generates filenames in the format: {entryName}.{format}.js
       * For example:
       * - ink-canvas.es.js (ES modules)
       * - ink-canvas.cjs.js (CommonJS)
       * - shims/process.es.js
       * - plugin.cjs.js
       */
      fileName: (format, entryName) =>
        `${entryName}.${format === "cjs" ? "cjs" : "js"}`,
    },

    /**
     * Rollup Options
     *
     * Additional configuration passed to the underlying Rollup bundler.
     */
    rollupOptions: {
      /**
       * External Dependencies
       *
       * These packages are NOT bundled into the library output.
       * Instead, they are expected to be provided by the library consumer.
       * This approach:
       *
       * 1. Reduces bundle size by avoiding duplication
       * 2. Ensures single instances of React (prevents hooks errors)
       * 3. Allows consumers to choose their own versions
       *
       * Categories of externals:
       *
       * **React ecosystem** - Must be single instance in the app:
       * - react, react-dom
       * - react/jsx-runtime, react/jsx-dev-runtime (JSX transformation)
       *
       * **Ink** - The terminal UI framework we're rendering:
       * - ink
       *
       * **Xterm.js** - Terminal emulator for browser:
       * - @xterm/xterm, @xterm/addon-fit
       *
       * **Node.js polyfills** - Browser-compatible replacements for Node.js APIs:
       * - buffer: Provides Buffer class for binary data
       * - readable-stream: Provides Node.js Streams API
       * - events: Provides EventEmitter class
       *
       * These are declared as peerDependencies in package.json.
       */
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "ink",
        "@xterm/xterm",
        "@xterm/addon-fit",
        "readable-stream",
        // Node.js polyfills - should be provided by library consumers
        "assert",
        "buffer",
        "child_process",
        "constants",
        "crypto",
        "events",
        "fs",
        "http",
        "https",
        "inspector",
        "module",
        "os",
        "path",
        "querystring",
        "stream",
        "tty",
        "url",
        "util",
        "vm",
        "worker_threads",
        "zlib",
      ],

      /**
       * Output Configuration
       */
      output: {
        /**
         * Export Mode
         *
         * "named" exports allow consumers to import specific named exports:
         * import { InkCanvas, Canvas } from 'ink-canvas';
         *
         * This is preferred over "default" for libraries with multiple exports.
         */
        exports: "named",

        /**
         * Global Variable Names (for UMD/IIFE builds)
         *
         * When external dependencies are referenced in UMD or IIFE formats,
         * these mappings tell Rollup what global variable names to use.
         *
         * For example, if someone uses ink-canvas via a <script> tag,
         * React would be expected to be available as window.React.
         */
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
