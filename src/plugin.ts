/**
 * Ink Canvas Vite Plugin
 *
 * Provides a Vite plugin for automatically configuring Node.js polyfills,
 * enabling Ink applications to run in the browser.
 *
 * @remarks
 * Ink depends on Node.js global objects like `process`, `Buffer`, and `global`.
 * These objects don't exist in browser environments, so polyfills are required.
 *
 * This plugin encapsulates:
 * 1. **Process Shim Alias Configuration**: Redirects `node:process` imports to ink-canvas's process shim
 * 2. **Node Polyfills Configuration**: Uses `vite-plugin-node-polyfills` to provide `Buffer` and `global` polyfills
 *
 * @example
 * Usage in Vite configuration:
 * ```typescript
 * // vite.config.ts
 * import { defineConfig } from 'vite';
 * import react from '@vitejs/plugin-react';
 * import { inkCanvasPolyfills } from 'ink-canvas/plugin';
 *
 * export default defineConfig({
 *   plugins: [
 *     react(),
 *     inkCanvasPolyfills(),
 *   ],
 * });
 * ```
 *
 * @packageDocumentation
 */

import type { Plugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

/**
 * Creates an array of Vite plugins for Ink Canvas polyfills
 *
 * This function returns a set of Vite plugins that configure the necessary
 * Node.js polyfills for Ink applications. It resolves the following issues
 * that Ink encounters when running in browser environments:
 *
 * 1. **Missing process object**: Ink uses `process.env`, `process.stdout`, etc.
 * 2. **Missing Buffer object**: Some dependency libraries use Node.js Buffer API
 * 3. **Missing global object**: Some libraries expect `global` to exist (browsers use `globalThis`)
 *
 * @remarks
 * This plugin includes two sub-plugins:
 *
 * **vite-plugin-ink-canvas-polyfill**:
 * - Aliases the `node:process` module to ink-canvas's process shim
 * - In development mode, points to the source file (`shims/process.ts`)
 * - In production mode, points to the bundled module (`ink-canvas/shims/process`)
 *
 * **vite-plugin-node-polyfills** (from third-party library):
 * - Provides browser polyfills for `Buffer` and `global`
 * - Excludes `process` (since we use a custom shim)
 * - Supports `node:*` protocol imports
 *
 * @param dev - Whether in development mode
 *              - `true`: Uses local source file paths as aliases (for library development)
 *              - `false` or `undefined`: Uses npm package paths as aliases (for library consumers)
 *
 * @returns An array of configured Vite plugins
 *
 * @example
 * Development mode usage (when developing within ink-canvas library):
 * ```typescript
 * inkCanvasPolyfills(true)
 * ```
 *
 * @example
 * Production mode usage (as a library consumer):
 * ```typescript
 * inkCanvasPolyfills()
 * // or
 * inkCanvasPolyfills(false)
 * ```
 *
 * @see {@link https://www.npmjs.com/package/vite-plugin-node-polyfills | vite-plugin-node-polyfills}
 */
export function inkCanvasPolyfills(dev?: boolean): Plugin[] {
  /**
   * Return plugin array containing custom alias plugin and node polyfills plugin
   */
  return [
    /**
     * Custom Vite Plugin: ink-canvas process polyfill
     *
     * This plugin uses Vite's `resolve.alias` configuration to redirect
     * `node:process` module imports to ink-canvas's custom process shim.
     */
    {
      /**
       * Plugin name, used for Vite's internal identification
       */
      name: "vite-plugin-ink-canvas-polyfill",

      /**
       * config hook: Modifies Vite configuration
       *
       * @returns Partial Vite configuration that will be merged into the final config
       */
      config() {
        return {
          resolve: {
            alias: {
              /**
               * Redirect `node:process` imports to the custom shim
               *
               * @remarks
               * - Development mode: Uses `path.resolve(__dirname, "shims/process.ts")` to point to local source file
               * - Production mode: Uses `"ink-canvas/shims/process"` to point to the npm package module
               *
               * This ensures that when code attempts `import process from 'node:process'`,
               * it loads our provided browser-compatible shim instead of the native Node.js module.
               */
              "node:process": dev
                ? path.resolve(__dirname, "shims/process.ts")
                : "ink-canvas/shims/process",
            },
          },
        };
      },
    },

    /**
     * vite-plugin-node-polyfills plugin configuration
     *
     * Provides browser polyfills for Node.js global objects and modules.
     */
    nodePolyfills({
      /**
       * Exclude process module from polyfills
       *
       * @remarks
       * We use a custom process shim (configured via the alias above),
       * so we need to exclude the default process polyfill to avoid conflicts.
       * The default polyfill may provide an incomplete or incompatible implementation.
       */
      exclude: ["process"],

      /**
       * Configure global object polyfills
       */
      globals: {
        /**
         * Enable Buffer global object
         *
         * @remarks
         * Many Node.js libraries (including some of Ink's dependencies) use Buffer
         * for binary data processing. A polyfill is needed to provide this
         * functionality in the browser.
         */
        Buffer: true,

        /**
         * Enable global object
         *
         * @remarks
         * Node.js uses `global` as the global object, while browsers use `globalThis` or `window`.
         * This polyfill ensures `global` points to the correct global object.
         */
        global: true,
      },

      /**
       * Support `node:*` protocol imports
       *
       * @remarks
       * Node.js supports using the `node:` prefix to explicitly import built-in modules
       * (e.g., `node:buffer`). Enabling this option ensures these imports are correctly
       * handled and polyfilled.
       */
      protocolImports: true,
    }),
  ];
}
