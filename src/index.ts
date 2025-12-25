/**
 * Ink Canvas - A library for rendering Ink applications in the browser using Xterm.js
 *
 * This package provides the {@link InkCanvas} component, which acts as a bridge between
 * Ink's Node.js-based rendering model and browser-based Xterm.js terminals. It mocks
 * necessary Node.js globals (via shims) and provides custom stream implementations
 * to allow Ink to run seamlessly in a web environment.
 *
 * @remarks
 * Ink is a React framework for building command-line interfaces that natively only runs
 * in Node.js environments. This library enables it to run in the browser through the
 * following mechanisms:
 *
 * 1. **Process Shim**: Mocks the Node.js global `process` object
 * 2. **Custom Streams**: Provides Node.js stream API compatible `stdout`, `stderr`, and `stdin` implementations
 * 3. **Xterm.js Integration**: Uses Xterm.js as the terminal rendering backend
 *
 * @example
 * Basic usage example:
 * ```tsx
 * import { InkCanvas } from 'ink-canvas';
 * import { Text, Box } from 'ink';
 *
 * const MyApp = () => (
 *   <Box borderStyle="round">
 *     <Text>Hello from Ink in the Browser!</Text>
 *   </Box>
 * );
 *
 * function App() {
 *   return (
 *     <InkCanvas focused>
 *       <MyApp />
 *     </InkCanvas>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// ============================================================================
// Main Component Exports
// ============================================================================

/**
 * Export the InkCanvas component
 *
 * InkCanvas is the core component of this library, responsible for:
 * - Initializing and managing the Xterm.js terminal instance
 * - Creating custom Node.js compatible streams
 * - Rendering Ink application output to the terminal
 * - Handling user keyboard input
 *
 * @see {@link InkCanvas} for detailed component documentation
 */
export { InkCanvas } from "./components/InkCanvas";

/**
 * Export the Canvas component
 *
 * Canvas is a root container component for Ink applications that automatically
 * fits its size to the stdout dimensions. It listens to `stdout.on('resize')`
 * events and dynamically updates its width and height.
 *
 * @see {@link Canvas} for detailed component documentation
 */
export { Canvas } from "./components/Canvas";

/**
 * Export type definitions for the InkCanvas component
 *
 * - {@link InkCanvasProps}: Component props interface defining all configurable options
 * - {@link InkCanvasHandle}: Component ref handle interface for imperative control
 */
export type { InkCanvasProps, InkCanvasHandle } from "./components/InkCanvas";

/**
 * Export type definitions for the Canvas component
 *
 * - {@link CanvasProps}: Component props interface (extends Ink's Box props)
 */
export type { CanvasProps } from "./components/Canvas";

// ============================================================================
// Process Shim Export
// ============================================================================

/**
 * Export the process shim module
 *
 * This is a mock implementation of the Node.js `process` object for browser environments.
 * Ink and many Node.js libraries rely on the `process` object for environment detection,
 * stream access, and other utilities. This shim provides a minimal implementation to
 * satisfy these dependencies.
 *
 * @remarks
 * In most cases, users don't need to use this export directly.
 * It's recommended to use the `inkCanvasPolyfills` Vite plugin to automatically
 * configure polyfills.
 *
 * @see {@link processShim} for detailed shim documentation
 */
export { default as processShim } from "./shims/process";
