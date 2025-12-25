/**
 * Custom process shim for browser environment
 *
 * Ink (and many Node.js libraries) rely on the global `process` object for environment detection,
 * stream access (stdout/stdin), and other utilities. Since these don't exist in the browser,
 * this shim provides a minimal implementation to satisfy those dependencies without crashing.
 *
 * This file is aliased to `process` and `node:process` in the Vite configuration via the
 * `inkCanvasPolyfills` plugin.
 *
 * @remarks
 * The shim provides mock implementations for:
 * - **Environment Variables** (`env`): Includes defaults for common Node.js and Ink-specific settings
 * - **Platform Information** (`platform`, `version`, `versions`, `argv`)
 * - **Standard Streams** (`stdout`, `stderr`, `stdin`): Minimal TTY-like interfaces
 * - **Process Control** (`nextTick`, `exit`, `cwd`)
 * - **Event Handling** (`on`, `off`, `once`): No-op implementations since browser doesn't have process events
 *
 * @example
 * This shim is typically not used directly. Instead, configure it via the Vite plugin:
 * ```typescript
 * // vite.config.ts
 * import { inkCanvasPolyfills } from 'ink-canvas/plugin';
 *
 * export default defineConfig({
 *   plugins: [inkCanvasPolyfills()],
 * });
 * ```
 *
 * @packageDocumentation
 */

// ============================================================================
// Environment Variables
// ============================================================================

/**
 * Mocked environment variables object
 *
 * Provides default values for common Node.js environment variables and Ink-specific settings.
 * These values ensure that environment checks in Ink and its dependencies work correctly
 * without throwing errors.
 *
 * @remarks
 * Key environment variables:
 * - `NODE_ENV`: Set to "production" by default. Affects various library behaviors.
 * - `CI`: Set to "false" to prevent CI-specific behaviors in Ink.
 * - `CONTINUOUS_INTEGRATION`: Same purpose as `CI`, used by some libraries.
 * - `TERM`: Set to "xterm-256color" to ensure color support is detected.
 * - `INK_SCREEN_READER`: Set to "false" to disable screen reader mode in Ink.
 *
 * @example
 * Accessing environment variables:
 * ```typescript
 * import { env } from 'ink-canvas/shims/process';
 * console.log(env.NODE_ENV); // "production"
 * console.log(env.TERM); // "xterm-256color"
 * ```
 */
export const env: Record<string, string | undefined> = {
  /**
   * Node.js environment mode
   * @defaultValue "production"
   */
  NODE_ENV: "production",

  /**
   * Continuous Integration flag
   * Set to "false" to prevent CI-specific behavior
   * @defaultValue "false"
   */
  CI: "false",

  /**
   * Alternative CI flag used by some libraries
   * @defaultValue "false"
   */
  CONTINUOUS_INTEGRATION: "false",

  /**
   * Terminal type identifier
   * Set to "xterm-256color" to enable full color support detection
   * @defaultValue "xterm-256color"
   */
  TERM: "xterm-256color",

  /**
   * Ink-specific: Screen reader mode flag
   * Set to "false" to disable screen reader optimizations
   * @defaultValue "false"
   */
  INK_SCREEN_READER: "false",
};

// ============================================================================
// Platform Information
// ============================================================================

/**
 * Mocked platform identifier
 *
 * In Node.js, this would be 'darwin', 'linux', 'win32', etc.
 * For the browser environment, we use 'browser' to clearly indicate
 * the runtime context.
 *
 * @defaultValue "browser"
 *
 * @example
 * ```typescript
 * import { platform } from 'ink-canvas/shims/process';
 * console.log(platform); // "browser"
 * ```
 */
export const platform = "browser";

/**
 * Mocked Node.js version string
 *
 * In Node.js, this would be something like 'v18.17.0'.
 * For the browser, we return an empty string since there's no Node.js version.
 *
 * @defaultValue ""
 */
export const version = "";

/**
 * Mocked versions object containing version strings of Node.js dependencies
 *
 * In Node.js, this contains versions of v8, uv, zlib, etc.
 * For the browser, we return an empty object.
 *
 * @defaultValue {}
 */
export const versions: Record<string, string> = {};

/**
 * Mocked command line arguments array
 *
 * In Node.js, this would contain the node executable path, script path,
 * and any command line arguments. For the browser, we return an empty array.
 *
 * @defaultValue []
 */
export const argv: string[] = [];

// ============================================================================
// File System Related
// ============================================================================

/**
 * Mocked current working directory function
 *
 * Returns a placeholder working directory since the browser doesn't have
 * a traditional file system with a current working directory concept.
 *
 * @returns Always returns "/" as the root directory
 *
 * @example
 * ```typescript
 * import { cwd } from 'ink-canvas/shims/process';
 * console.log(cwd()); // "/"
 * ```
 */
export function cwd(): string {
  return "/";
}

// ============================================================================
// Standard Streams
// ============================================================================

/**
 * Mocked stdout stream object
 *
 * Provides a minimal interface that satisfies basic checks before the actual
 * streams are fully piped through InkCanvas. This object mimics the essential
 * properties of Node.js's `process.stdout`.
 *
 * @remarks
 * This is a placeholder implementation. The actual output is handled by
 * {@link TerminalWritableStream} which is created when InkCanvas mounts.
 *
 * Properties:
 * - `write`: No-op function that returns true (indicates successful write)
 * - `isTTY`: Set to true to indicate terminal capabilities
 * - `columns`: Number of terminal columns (default: 80)
 * - `rows`: Number of terminal rows (default: 24)
 */
export const stdout = {
  /**
   * Mock implementation of write method
   *
   * This is a no-op that simply returns true. The actual writing to the
   * terminal is handled by TerminalWritableStream in InkCanvas.
   *
   * @param _chunk - Data to write (ignored in this mock)
   * @returns Always returns true indicating the write was "successful"
   */
  write: (_chunk: Uint8Array | string) => true,

  /**
   * Indicates if the stream is connected to a TTY (terminal)
   *
   * Set to true so that Ink enables TTY-specific features like colors
   * and cursor manipulation.
   *
   * @defaultValue true
   */
  isTTY: true,

  /**
   * Number of columns in the terminal
   *
   * This is a default value. The actual column count is determined by
   * the Xterm.js instance dimensions in InkCanvas.
   *
   * @defaultValue 80
   */
  columns: 80,

  /**
   * Number of rows in the terminal
   *
   * This is a default value. The actual row count is determined by
   * the Xterm.js instance dimensions in InkCanvas.
   *
   * @defaultValue 24
   */
  rows: 24,
};

/**
 * Mocked stderr stream object
 *
 * Provides the same minimal interface as stdout for error output.
 * In this implementation, stderr behaves identically to stdout since
 * both are rendered to the same Xterm.js terminal.
 *
 * @see {@link stdout} for property descriptions
 */
export const stderr = {
  /**
   * Mock implementation of write method
   * @param _chunk - Data to write (ignored in this mock)
   * @returns Always returns true
   */
  write: (_chunk: Uint8Array | string) => true,

  /**
   * Indicates if the stream is connected to a TTY
   * @defaultValue true
   */
  isTTY: true,

  /**
   * Number of columns in the terminal
   * @defaultValue 80
   */
  columns: 80,

  /**
   * Number of rows in the terminal
   * @defaultValue 24
   */
  rows: 24,
};

/**
 * Mocked stdin stream object
 *
 * Provides a minimal interface for input stream that satisfies Ink's
 * initialization checks. The actual input handling is done by
 * {@link TerminalReadableStream} in InkCanvas.
 *
 * @remarks
 * All methods are no-ops since the real input handling is delegated
 * to Xterm.js through TerminalReadableStream.
 */
export const stdin = {
  /**
   * Indicates if the stream is connected to a TTY
   *
   * Set to true to enable raw input mode in Ink.
   *
   * @defaultValue true
   */
  isTTY: true,

  /**
   * Sets raw mode for the input stream
   *
   * No-op in browser. Xterm.js already provides character-by-character
   * input similar to raw mode.
   */
  setRawMode: () => {},

  /**
   * Registers an event listener
   *
   * No-op in browser. Event handling is done through TerminalReadableStream.
   */
  on: () => {},

  /**
   * Resumes the paused stream
   *
   * No-op in browser.
   */
  resume: () => {},

  /**
   * Pauses the stream
   *
   * No-op in browser.
   */
  pause: () => {},
};

// ============================================================================
// Process Control
// ============================================================================

/**
 * Emulates Node.js `process.nextTick` using `setTimeout`
 *
 * In Node.js, `nextTick` schedules a callback to be invoked in the next
 * iteration of the event loop, before any I/O operations. In the browser,
 * we approximate this behavior using `setTimeout` with a delay of 0.
 *
 * @remarks
 * This is not a perfect emulation since `setTimeout(..., 0)` has different
 * timing characteristics than the true Node.js `nextTick`. However, it's
 * sufficient for most use cases in Ink.
 *
 * For better emulation, consider using `queueMicrotask` or `Promise.resolve().then()`,
 * but `setTimeout` is used here for broader compatibility.
 *
 * @param callback - The function to execute on the next tick
 * @param args - Arguments to pass to the callback function
 *
 * @example
 * ```typescript
 * import { nextTick } from 'ink-canvas/shims/process';
 *
 * nextTick(() => {
 *   console.log('Executed on next tick');
 * });
 * console.log('Executed first');
 * // Output:
 * // "Executed first"
 * // "Executed on next tick"
 * ```
 */
export function nextTick(
  callback: (...args: unknown[]) => void,
  ...args: unknown[]
): void {
  // Use setTimeout with 0ms delay to schedule callback on next event loop iteration
  setTimeout(() => callback(...args), 0);
}

/**
 * Mocks `process.exit` for the browser environment
 *
 * In Node.js, `process.exit` terminates the process with the given exit code.
 * In the browser, we cannot close the window/tab programmatically (for security reasons),
 * so we throw an error instead to indicate that an exit was attempted.
 *
 * @param code - The exit code (included in the error message)
 * @returns Never returns - always throws an error
 * @throws Error with message 'process.exit(code) called'
 *
 * @example
 * ```typescript
 * import { exit } from 'ink-canvas/shims/process';
 *
 * try {
 *   exit(0);
 * } catch (e) {
 *   console.error(e.message); // "process.exit(0) called"
 * }
 * ```
 */
export function exit(code?: number): never {
  throw new Error(`process.exit(${code}) called`);
}

// ============================================================================
// Event Handling
// ============================================================================

/**
 * Mocks `process.on` event listener registration
 *
 * In Node.js, this registers listeners for process events like 'exit',
 * 'uncaughtException', 'SIGINT', etc. In the browser, these events don't
 * exist, so this is a no-op.
 *
 * @param _event - The name of the event (ignored)
 * @param _listener - The callback function (ignored)
 *
 * @example
 * ```typescript
 * import { on } from 'ink-canvas/shims/process';
 *
 * // This does nothing in the browser
 * on('exit', () => console.log('Exiting'));
 * ```
 */
export function on(
  _event: string,
  _listener: (...args: unknown[]) => void,
): void {
  // No-op in browser - process events don't exist
}

/**
 * Mocks `process.off` event listener removal
 *
 * In Node.js, this removes a previously registered event listener.
 * In the browser, this is a no-op since we don't register any listeners.
 *
 * @param _event - The name of the event (ignored)
 * @param _listener - The callback function (ignored)
 */
export function off(
  _event: string,
  _listener: (...args: unknown[]) => void,
): void {
  // No-op in browser
}

/**
 * Mocks `process.once` one-time event listener registration
 *
 * In Node.js, this registers a listener that is automatically removed
 * after being called once. In the browser, this is a no-op.
 *
 * @param _event - The name of the event (ignored)
 * @param _listener - The callback function (ignored)
 */
export function once(
  _event: string,
  _listener: (...args: unknown[]) => void,
): void {
  // No-op in browser
}

// ============================================================================
// Default Export
// ============================================================================

/**
 * Default export compatible with Node.js 'process' module structure
 *
 * This object mimics the global `process` object in Node.js and is used
 * as a drop-in replacement when aliased via the Vite configuration.
 *
 * @remarks
 * This object is the primary export that gets used when code imports
 * `process` or `node:process`. It aggregates all the individual mocked
 * properties and methods defined above.
 *
 * The object structure matches Node.js's process object, allowing code
 * that uses `process.env`, `process.stdout`, `process.nextTick`, etc.
 * to work without modification in the browser.
 *
 * @example
 * ```typescript
 * // This works thanks to the alias configuration
 * import process from 'node:process';
 *
 * console.log(process.env.NODE_ENV); // "production"
 * console.log(process.platform); // "browser"
 *
 * process.nextTick(() => {
 *   console.log('Next tick callback');
 * });
 * ```
 */
const processShim = {
  /** Environment variables object */
  env,

  /** Platform identifier ("browser") */
  platform,

  /** Node.js version string (empty in browser) */
  version,

  /** Versions of Node.js dependencies (empty in browser) */
  versions,

  /** Command line arguments (empty in browser) */
  argv,

  /** Get current working directory */
  cwd,

  /** Standard output stream mock */
  stdout,

  /** Standard error stream mock */
  stderr,

  /** Standard input stream mock */
  stdin,

  /** Schedule callback on next tick */
  nextTick,

  /** Exit process (throws error in browser) */
  exit,

  /** Register event listener (no-op) */
  on,

  /** Remove event listener (no-op) */
  off,

  /** Register one-time event listener (no-op) */
  once,
};

export default processShim;
