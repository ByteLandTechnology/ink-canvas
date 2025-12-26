/**
 * Ink Canvas Vite Plugin
 *
 * This module provides a Vite plugin that configures the necessary module aliases
 * to enable Ink applications to run in browser environments.
 *
 * @remarks
 * Ink is originally designed to run in Node.js terminal environments and depends on
 * Node.js built-in modules such as `process`, `buffer`, `stream`, and `events`.
 * These modules are not available in browsers, so polyfills must be provided.
 *
 * This plugin uses Vite's `resolve.alias` feature to redirect `node:*` protocol imports
 * to browser-compatible polyfill libraries:
 *
 * | Node.js Module   | Polyfill Library      | Description                          |
 * |------------------|-----------------------|--------------------------------------|
 * | `node:process`   | `ink-canvas/shims/process` | Custom process shim for Ink      |
 * | `node:buffer`    | `buffer`              | Buffer API polyfill                  |
 * | `node:stream`    | `readable-stream`     | Stream API polyfill                  |
 * | `node:events`    | `events`              | EventEmitter polyfill                |
 *
 * **Important**: The polyfill libraries (`buffer`, `readable-stream`, `events`) are
 * declared as `peerDependencies` of ink-canvas. Library consumers must install these
 * packages in their own projects.
 *
 * @example
 * Basic usage in Vite configuration:
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
 * @example
 * Required peer dependencies installation:
 * ```bash
 * npm install buffer readable-stream events
 * # or
 * pnpm add buffer readable-stream events
 * ```
 *
 * @packageDocumentation
 */

import type { Plugin } from "vite";
import path from "path";

/**
 * Creates an array of Vite plugins for Ink Canvas polyfills
 *
 * This function returns Vite plugins that configure module aliases for Node.js
 * built-in modules, enabling Ink applications to run in browser environments.
 *
 * The plugin addresses the following Node.js dependencies that Ink requires:
 *
 * 1. **`node:process`**: Ink uses `process.env`, `process.stdout`, `process.stderr`, etc.
 *    This is redirected to ink-canvas's custom process shim that provides a mock
 *    implementation compatible with Ink's requirements.
 *
 * 2. **`node:buffer`**: Some dependencies use Node.js Buffer API for binary data handling.
 *    This is redirected to the `buffer` npm package.
 *
 * 3. **`node:stream`**: Ink uses Node.js streams for terminal I/O.
 *    This is redirected to the `readable-stream` npm package.
 *
 * 4. **`node:events`**: Ink depends on Node.js EventEmitter.
 *    This is redirected to the `events` npm package.
 *
 * @remarks
 * **Plugin Configuration Details:**
 *
 * The plugin configures `resolve.dedupe` to prevent duplicate React instances when
 * using symlinked packages (common during local development with `npm link`):
 * - `react`, `react-dom`, `react-reconciler`
 * - `ink`
 * - `react/jsx-runtime`, `react/jsx-dev-runtime`
 *
 * The plugin configures `resolve.alias` to redirect Node.js built-in module imports:
 * - `node:buffer` → `buffer/index.js` (from `buffer` package)
 * - `node:stream` → `readable-stream` (from `readable-stream` package)
 * - `node:events` → `events/events` (from `events` package)
 * - `node:process` → ink-canvas's custom process shim
 *
 * **Development vs Production Mode:**
 *
 * The `dev` parameter controls how the `node:process` alias is resolved:
 * - When `dev=true`: Points to the local source file `shims/process.ts`.
 *   Use this mode when developing the ink-canvas library itself.
 * - When `dev=false` or `undefined`: Points to the published npm package
 *   `ink-canvas/shims/process`. Use this mode as a library consumer.
 *
 * @param dev - Whether to use development mode for the process shim alias.
 *              - `true`: Uses local source file path (`shims/process.ts`).
 *                This is for ink-canvas library development.
 *              - `false` or `undefined`: Uses npm package path (`ink-canvas/shims/process`).
 *                This is for library consumers.
 *
 * @returns An array containing a single Vite plugin with the configured aliases.
 *
 * @example
 * Development mode (for ink-canvas library maintainers):
 * ```typescript
 * // When working on the ink-canvas library source code
 * inkCanvasPolyfills(true)
 * ```
 *
 * @example
 * Production mode (for library consumers):
 * ```typescript
 * // In your application's vite.config.ts
 * inkCanvasPolyfills()
 * // or explicitly:
 * inkCanvasPolyfills(false)
 * ```
 *
 * @see {@link https://www.npmjs.com/package/buffer | buffer} - Buffer polyfill
 * @see {@link https://www.npmjs.com/package/readable-stream | readable-stream} - Stream polyfill
 * @see {@link https://www.npmjs.com/package/events | events} - EventEmitter polyfill
 */
export function inkCanvasPolyfills(dev?: boolean): Plugin[] {
  /**
   * Return an array containing the ink-canvas polyfill plugin.
   *
   * The array structure allows for potential future expansion with additional plugins
   * while maintaining backward compatibility.
   */
  return [
    /**
     * Vite Plugin: ink-canvas-polyfill
     *
     * This plugin uses Vite's `config` hook to inject module resolution configuration.
     * It modifies the `resolve.dedupe` and `resolve.alias` settings to:
     *
     * 1. Prevent duplicate React instances in development environments with symlinks
     * 2. Redirect `node:*` protocol imports to browser-compatible polyfill libraries
     *
     * The configuration is merged with the user's existing Vite config, so it won't
     * override other alias or dedupe settings.
     */
    {
      /**
       * Unique plugin name for Vite's internal identification and debugging.
       *
       * This name appears in Vite's plugin resolution logs and error messages,
       * making it easier to identify issues related to this plugin.
       */
      name: "vite-plugin-ink-canvas-polyfill",

      /**
       * Vite config hook: Modifies Vite configuration
       *
       * This hook is called during Vite's configuration resolution phase.
       * The returned configuration object is deeply merged with the user's config.
       *
       * @returns Partial Vite configuration with `resolve.dedupe` and `resolve.alias` settings
       *
       * @remarks
       * **resolve.dedupe**: Ensures that only one instance of each listed package is used,
       * even when multiple versions are present in node_modules (common with symlinks).
       * This prevents "multiple React instances" errors.
       *
       * **resolve.alias**: Maps Node.js built-in module specifiers to polyfill libraries.
       * Uses `import.meta.resolve()` to get the absolute path to each polyfill module,
       * ensuring consistent resolution regardless of the consumer's project structure.
       */
      config() {
        return {
          /**
           * Define global constants that will be replaced at build time.
           *
           * These definitions inject global variables into the browser environment
           * that are expected by Node.js modules but don't exist natively in browsers.
           *
           * - `global`: Points to `globalThis`, the standard way to access the global
           *   object in any JavaScript environment (browser, Node.js, web workers, etc.)
           * - `process`: A placeholder object with minimal properties to satisfy
           *   basic process checks in browser environments.
           */
          define: {
            global: "globalThis",
            "process.env": "{}",
          },
          resolve: {
            /**
             * Deduplicate React and Ink packages to prevent multiple instances.
             *
             * When using `npm link` or other symlink-based development workflows,
             * multiple copies of React may be resolved from different node_modules.
             * This causes React hooks to fail with cryptic errors.
             *
             * By listing these packages in `dedupe`, Vite ensures only one copy is used.
             */
            dedupe: [
              "react",
              "react-dom",
              "react-reconciler",
              "ink",
              "react/jsx-runtime",
              "react/jsx-dev-runtime",
            ],
            /**
             * Module aliases for Node.js built-in module polyfills.
             *
             * Each alias maps a `node:*` protocol import to a browser-compatible polyfill.
             * The `import.meta.resolve()` function is used to get absolute module paths,
             * which ensures correct resolution regardless of the consumer's project location.
             *
             * Note: These polyfill packages (buffer, readable-stream, events) are
             * peerDependencies of ink-canvas and must be installed by the consumer.
             */
            alias: {
              /**
               * Redirect `node:buffer` imports to the `buffer` polyfill package.
               *
               * The Buffer class is used by some Ink dependencies for binary data handling.
               * We specifically point to `buffer/index.js` for explicit module resolution.
               *
               * @see https://www.npmjs.com/package/buffer
               */
              "node:buffer": import.meta.resolve("buffer/index.js"),

              /**
               * Redirect `node:stream` imports to the `readable-stream` polyfill package.
               *
               * Ink uses Node.js streams for terminal I/O operations.
               * The `readable-stream` package provides a browser-compatible implementation
               * of Node.js Streams API.
               *
               * @see https://www.npmjs.com/package/readable-stream
               */
              "node:stream": import.meta.resolve("readable-stream"),

              /**
               * Redirect `node:events` imports to the `events` polyfill package.
               *
               * Ink and its dependencies use Node.js EventEmitter extensively.
               * We point to `events/events` for explicit module resolution.
               *
               * @see https://www.npmjs.com/package/events
               */
              "node:events": import.meta.resolve("events/events"),

              /**
               * Redirect `node:process` imports to ink-canvas's custom process shim.
               *
               * Ink heavily relies on the `process` global object for environment detection,
               * terminal information, and I/O streams. The standard `process` polyfill
               * doesn't satisfy Ink's requirements, so ink-canvas provides a custom shim
               * that mocks the necessary APIs.
               *
               * In development mode (`dev=true`), the alias points to the local source file
               * to enable hot reloading during ink-canvas development.
               *
               * In production mode (`dev=false`), the alias points to the published
               * ink-canvas package to ensure consistent behavior for library consumers.
               */
              "node:process": dev
                ? path.resolve(__dirname, "shims/process.ts")
                : import.meta.resolve("ink-canvas/shims/process"),
            },
          },
        };
      },
    },
  ];
}
