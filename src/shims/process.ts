/**
 * Custom process shim for browser environment.
 *
 * Ink (and many Node.js libraries) rely on the global `process` object for environment detection,
 * stream access (stdout/stdin), and other utilities. Since these don't exist in the browser,
 * this shim provides a minimal implementation to satisfy those dependencies without crashing.
 *
 * This file is aliased to `process` in the Vite configuration.
 *
 * @packageDocumentation
 */

/**
 * Mocked environment variables.
 * Includes defaults for common Node.js variables and Ink-specific settings.
 *
 * @remarks
 * - `NODE_ENV`: Defaults to "production".
 * - `TERM`: Defaults to "xterm-256color" to ensure color support is detected.
 */
export const env: Record<string, string | undefined> = {
  NODE_ENV: "production",
  CI: "false",
  CONTINUOUS_INTEGRATION: "false",
  TERM: "xterm-256color",
  // Ink specific env vars
  INK_SCREEN_READER: "false",
};

/**
 * Mocked platform identifier.
 *
 * @defaultValue "browser"
 */
export const platform = "browser";

/**
 * Mocked Node.js version string.
 *
 * @defaultValue ""
 */
export const version = "";

/**
 * Mocked versions object containing version strings of dependencies.
 *
 * @defaultValue {}
 */
export const versions: Record<string, string> = {};

/**
 * Mocked command line arguments.
 *
 * @defaultValue []
 */
export const argv: string[] = [];

/**
 * Mocked current working directory function.
 *
 * @returns Always returns root "/" in the browser environment.
 */
export function cwd(): string {
  return "/";
}

/**
 * Mocked stdout stream object.
 * Provides the minimal interface required by some checks before streams are fully piped.
 */
export const stdout = {
  /**
   * Mock implementation of write.
   * @param _chunk - Data to write (unused).
   * @returns Always true.
   */
  write: (_chunk: any) => true,
  /**
   * Indicates if the stream is a TTY.
   * @defaultValue true
   */
  isTTY: true,
  /**
   * Number of columns in the terminal.
   * @defaultValue 80
   */
  columns: 80,
  /**
   * Number of rows in the terminal.
   * @defaultValue 24
   */
  rows: 24,
};

/**
 * Mocked stderr stream object.
 */
export const stderr = {
  /**
   * Mock implementation of write.
   * @param _chunk - Data to write (unused).
   * @returns Always true.
   */
  write: (_chunk: any) => true,
  /**
   * Indicates if the stream is a TTY.
   * @defaultValue true
   */
  isTTY: true,
  /**
   * Number of columns in the terminal.
   * @defaultValue 80
   */
  columns: 80,
  /**
   * Number of rows in the terminal.
   * @defaultValue 24
   */
  rows: 24,
};

/**
 * Mocked stdin stream object.
 */
export const stdin = {
  /**
   * Indicates if the stream is a TTY.
   * @defaultValue true
   */
  isTTY: true,
  /**
   * Mock implementation of setRawMode.
   */
  setRawMode: () => {},
  /**
   * Mock implementation of on (event listener).
   */
  on: () => {},
  /**
   * Mock implementation of resume.
   */
  resume: () => {},
  /**
   * Mock implementation of pause.
   */
  pause: () => {},
};

/**
 * Emulates Node.js `process.nextTick` using `setTimeout`.
 *
 * @param callback - The function to execute.
 * @param args - Arguments to pass to the function.
 */
export function nextTick(
  callback: (...args: any[]) => void,
  ...args: any[]
): void {
  setTimeout(() => callback(...args), 0);
}

/**
 * Mocks `process.exit`.
 *
 * Throws an error to indicate an exit attempt, as the browser window typically cannot be closed by scripts.
 *
 * @param code - The exit code (unused effectively, but included in the error message).
 * @returns Never returns.
 * @throws Error Always throws 'process.exit(code) called'.
 */
export function exit(code?: number): never {
  throw new Error(`process.exit(${code}) called`);
}

/**
 * Mocks `process.on` event listener registration.
 *
 * @param _event - The name of the event.
 * @param _listener - The callback function.
 */
export function on(_event: string, _listener: (...args: any[]) => void): void {
  // no-op in browser
}

/**
 * Mocks `process.off` event listener removal.
 *
 * @param _event - The name of the event.
 * @param _listener - The callback function.
 */
export function off(_event: string, _listener: (...args: any[]) => void): void {
  // no-op in browser
}

/**
 * Mocks `process.once` one-time event listener.
 *
 * @param _event - The name of the event.
 * @param _listener - The callback function.
 */
export function once(
  _event: string,
  _listener: (...args: any[]) => void,
): void {
  // no-op in browser
}

/**
 * Default export compatible with Node.js 'process' module structure.
 * This object mimics the global `process` object in Node.js.
 */
const processShim = {
  env,
  platform,
  version,
  versions,
  argv,
  cwd,
  stdout,
  stderr,
  stdin,
  nextTick,
  exit,
  on,
  off,
  once,
};

export default processShim;
