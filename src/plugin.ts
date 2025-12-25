import type { Plugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

/**
 * Vite plugin to polyfill Node.js globals for Ink Canvas.
 *
 * This plugin helps resolve `process` and `node:process` imports to the
 * `ink-canvas` provided shim, ensuring that Ink applications can run
 * in the browser without crashing due to missing Node.js globals.
 *
 * It also automatically configures `vite-plugin-node-polyfills` to provide
 * necessary Node.js globals like `Buffer`, `global`, and `process`.
 *
 * @returns Vite plugin instance.
 */
export function inkCanvasPolyfills(): Plugin[] {
  return [
    {
      name: "vite-plugin-ink-canvas-polyfill",
      config() {
        return {
          resolve: {
            alias: {
              "node:process": "ink-canvas/shims/process",
              process: "ink-canvas/shims/process",
            },
          },
        };
      },
    },
    nodePolyfills({
      exclude: ["process"],
      globals: {
        Buffer: true,
        global: true,
      },
      protocolImports: true,
    }),
  ];
}
