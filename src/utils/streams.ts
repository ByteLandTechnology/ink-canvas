import { EventEmitter } from "events";
import type { Terminal } from "@xterm/xterm";

/**
 * Polyfill for BufferEncoding which is globally available in Node.js but missing in the browser.
 */
export type BufferEncoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex";

/**
 * Interface representing the minimal writable stream API required by Ink's render process.
 *
 * Ink checks for specific properties (like isTTY, columns, rows) and methods (write)
 * to interact with the output stream. This interface defines those requirements strictly,
 * allowing us to create a lightweight implementation without pulling in the entire Node.js stream polyfill.
 *
 * @see https://nodejs.org/api/stream.html#stream_class_stream_writable
 */
export interface InkWriteStream {
  /** Indicates if the stream is connected to a TTY (terminal). Always true for our use case. */
  isTTY: boolean;
  /** The number of columns in the terminal. */
  columns: number;
  /** The number of rows in the terminal. */
  rows: number;
  /**
   * Writes data to the stream.
   * @param chunk - The data to write.
   * @param callback - Optional callback to run when the write is complete.
   */
  write(chunk: string | Uint8Array, callback?: () => void): boolean;
  /**
   * Writes data to the stream with encoding.
   * @param chunk - The data to write.
   * @param encoding - The encoding of the chunk (ignored in our implementation as we handle strings directly).
   * @param callback - Optional callback to run when the write is complete.
   */
  write(
    chunk: string | Uint8Array,
    encoding?: BufferEncoding,
    callback?: () => void,
  ): boolean;
}

/**
 * Interface representing the minimal readable stream API required by Ink's input handling.
 *
 * This mimics a subset of NodeJS.ReadStream, providing just enough functionality for
 * Ink to listen for keypress events and manage input modes (raw mode).
 *
 * @see https://nodejs.org/api/stream.html#stream_class_stream_readable
 */
export interface InkReadStream {
  /** Indicates if the stream is connected to a TTY. */
  isTTY: boolean;
  /**
   * Sets the terminal to raw mode (character-by-character input) or cooked mode (line-buffered).
   * @param mode - If true, enables raw mode.
   */
  setRawMode?(mode: boolean): this;
  /**
   * Sets the encoding for the stream.
   * @param encoding - The encoding to use.
   */
  setEncoding?(encoding: BufferEncoding): this;
  /**
   * Reads data from the stream.
   * @param size - Optional number of bytes to read.
   */
  read?(size?: number): string | null;
  /** Keeps the event loop alive (no-op in browser). */
  ref?(): this;
  /** Registers an event listener. */
  on(event: string, listener: (...args: unknown[]) => void): this;
  /** Registers an event listener. */
  addListener(event: string, listener: (...args: unknown[]) => void): this;
  /** Removes an event listener. */
  removeListener(event: string, listener: (...args: unknown[]) => void): this;
}

/**
 * A custom Writable stream that acts as a bridge between Ink's output and Xterm.js.
 *
 * Ink writes ANSI escape codes and text to this stream. This class intercepts those writes,
 * performs necessary transformations (like newline normalization), and forwards them to the
 * underlying Xterm.js instance.
 *
 * It also implements specific cursor and screen manipulation methods that Ink may optimize for.
 */
export class TerminalWritableStream
  extends EventEmitter
  implements InkWriteStream
{
  /**
   * The underlying Xterm.js Terminal instance.
   * @private
   */
  private term: Terminal;

  /**
   * Indicates if the stream is connected to a TTY.
   * Always true for this implementation.
   * @defaultValue true
   */
  public isTTY = true;

  /**
   * Current number of columns in the terminal.
   */
  public columns: number;

  /**
   * Current number of rows in the terminal.
   */
  public rows: number;

  /**
   * Indicates if the stream is writable.
   * @defaultValue true
   */
  public writable = true;

  /**
   * Creates a new TerminalWritableStream.
   *
   * @param term - The Xterm.js Terminal instance to write to.
   */
  constructor(term: Terminal) {
    super();
    this.term = term;
    this.columns = term.cols;
    this.rows = term.rows;
  }

  /**
   * Writes data to the terminal.
   *
   * Normalizes newlines from `\n` to `\r\n` because Xterm.js operates in a raw-like mode
   * effectively, where a line feed alone causes the cursor to go down but not back to the start
   * of the line.
   *
   * @param chunk - The data to write (string or Uint8Array).
   * @param encodingOrCallback - Encoding string or the callback function.
   * @param callback - The callback function if encoding was provided.
   * @returns True (indicating the stream is ready for more data).
   */
  write(
    chunk: Uint8Array | string,
    encodingOrCallback?: BufferEncoding | (() => void),
    callback?: () => void,
  ): boolean {
    if (typeof encodingOrCallback === "function") {
      callback = encodingOrCallback;
    }
    let str = typeof chunk === "string" ? chunk : chunk.toString();

    // Convert LF to CRLF for proper line handling in xterm
    // xterm.js treats \n as just line feed (move down), not carriage return + line feed
    // Only convert standalone \n (not already preceded by \r)
    str = str.replace(/(?<!\r)\n/g, "\r\n");

    this.term.write(str);

    if (callback) callback();
    return true;
  }

  /**
   * Signals the end of writing to the stream.
   *
   * @param chunk - Optional final chunk of data to write.
   * @param callback - Optional callback to run when finished.
   * @returns The stream instance implementation.
   */
  end(chunk?: Uint8Array | string, callback?: () => void): this {
    if (chunk) {
      this.write(chunk, callback);
    }
    return this;
  }

  /**
   * Returns the current window size (columns, rows).
   * Used by Ink to determine layout dimensions.
   *
   * @returns A tuple of [columns, rows].
   */
  getWindowSize(): [number, number] {
    return [this.columns, this.rows];
  }

  /**
   * Clears the current line in a specific direction.
   *
   * @param dir - Direction to clear: -1 (left), 1 (right), or 0 (entire line).
   * @param callback - Optional callback.
   */
  clearLine(dir: number, callback?: () => void): boolean {
    if (dir === -1) {
      // Clear from cursor to start of line
      this.term.write("\x1b[1K");
    } else if (dir === 1) {
      // Clear from cursor to end of line
      this.term.write("\x1b[0K");
    } else {
      // Clear entire line
      this.term.write("\x1b[2K");
    }
    if (callback) callback();
    return true;
  }

  /**
   * Clears the screen from the cursor down.
   *
   * @param callback - Optional callback.
   */
  clearScreenDown(callback?: () => void): boolean {
    this.term.write("\x1b[J");
    if (callback) callback();
    return true;
  }

  /**
   * Moves the cursor to a specific absolute position.
   *
   * @param x - The column (0-indexed).
   * @param y - The row (0-indexed).
   * @param callback - Optional callback.
   */
  cursorTo(
    x: number,
    y?: number | (() => void),
    callback?: () => void,
  ): boolean {
    if (typeof y === "function") {
      callback = y;
      y = undefined;
    }
    if (y !== undefined) {
      // CSI y ; x H (1-based)
      this.term.write(`\x1b[${y + 1};${x + 1}H`);
    } else {
      // CSI x G (1-based column)
      this.term.write(`\x1b[${x + 1}G`);
    }
    if (callback) callback();
    return true;
  }

  /**
   * Moves the cursor relative to its current position.
   *
   * @param dx - Horizontal delta (positive is right, negative is left).
   * @param dy - Vertical delta (positive is down, negative is up).
   * @param callback - Optional callback.
   */
  moveCursor(dx: number, dy: number, callback?: () => void): boolean {
    if (dx > 0) this.term.write(`\x1b[${dx}C`);
    if (dx < 0) this.term.write(`\x1b[${-dx}D`);
    if (dy > 0) this.term.write(`\x1b[${dy}B`);
    if (dy < 0) this.term.write(`\x1b[${-dy}A`);
    if (callback) callback();
    return true;
  }

  /**
   * Updates the internal dimensions of the stream to match the terminal's actual size.
   * Emits a 'resize' event to notify listeners (e.g., Ink) of the change.
   */
  updateDimensions(): void {
    this.columns = this.term.cols;
    this.rows = this.term.rows;
    this.emit("resize");
  }

  /**
   * Returns this stream typed as NodeJS.WriteStream for use with Ink's render().
   *
   * This casts the current instance, which implements the necessary subset of the WriteStream API,
   * to the full NodeJS.WriteStream type required by TypeScript definitions. This is safe because
   * Ink only relies on the methods we have implemented.
   *
   * @returns The stream cast as a NodeJS.WriteStream.
   */
  asNodeWriteStream(): NodeJS.WriteStream {
    return this as unknown as NodeJS.WriteStream;
  }
}

/**
 * A custom Readable stream that acts as a bridge between Xterm.js input and Ink.
 *
 * Captures user input from the Xterm.js `onData` event, buffers it, and emits Node.js-style
 * `readable` events for Ink to consume.
 */
export class TerminalReadableStream
  extends EventEmitter
  implements InkReadStream
{
  /**
   * Indicates if the stream is connected to a TTY.
   * @defaultValue true
   */
  public isTTY = true;

  /**
   * Indicates if the stream is in raw mode.
   * @defaultValue true
   */
  public isRaw = true;

  /**
   * Indicates if the stream is readable.
   * @defaultValue true
   */
  public readable = true;

  /**
   * The file descriptor for the stream.
   * @defaultValue 0
   */
  public fd = 0;

  /**
   * The underlying Xterm.js Terminal instance.
   * @private
   */
  private term: Terminal;

  /**
   * Buffer for incoming data chunks.
   * @private
   */
  private buffer: string[] = [];

  /**
   * Creates a new TerminalReadableStream.
   *
   * @param term - The Xterm.js Terminal instance to read input from.
   */
  constructor(term: Terminal) {
    super();
    this.term = term;

    // Set up xterm data handler
    // Ink uses 'readable' event + read() method, not 'data' event
    this.term.onData((data: string) => {
      this.buffer.push(data);
      // Emit 'readable' to notify that data is available
      this.emit("readable");
    });
  }

  /**
   * Reads data from the internal buffer.
   * Called by Ink's input handling logic after receiving a 'readable' event.
   *
   * @param _size - Number of bytes to read (ignored in this implementation, we return one chunk at a time).
   * @returns The next chunk of data from the buffer, or null if empty.
   */
  read(_size?: number): string | null {
    if (this.buffer.length === 0) {
      return null;
    }
    return this.buffer.shift() ?? null;
  }

  /**
   * Sets the stream's raw mode.
   *
   * In a browser environment with Xterm.js, input is effectively always "raw" in the sense that
   * we capture individual keystrokes. Ink sets this to true to indicate it expects to handle
   * input character-by-character.
   *
   * @param mode - Whether to enable raw mode.
   * @returns The stream instance.
   */
  setRawMode(mode: boolean): this {
    this.isRaw = mode;
    return this;
  }

  /**
   * Sets the encoding for the stream.
   *
   * @param _encoding - The encoding to use (e.g., 'utf-8'). No-op here as Xterm.js handles strings.
   * @returns The stream instance.
   */
  setEncoding(_encoding: BufferEncoding): this {
    // No-op in browser - xterm already handles string encoding
    return this;
  }

  /**
   * Resumes the paused stream. No-op for this mock implementation.
   */
  resume(): this {
    return this;
  }

  /**
   * Pauses the stream. No-op for this mock implementation.
   */
  pause(): this {
    return this;
  }

  /**
   * Keeps the Node.js event loop active. No-op in the browser.
   */
  ref(): this {
    return this;
  }

  /**
   * Allows the Node.js event loop to exit. No-op in the browser.
   */
  unref(): this {
    return this;
  }

  /**
   * Returns this stream typed as NodeJS.ReadStream for use with Ink's render().
   *
   * This casts the current instance, which implements the necessary subset of the ReadStream API,
   * to the full NodeJS.ReadStream type required by TypeScript definitions.
   *
   * @returns The stream cast as a NodeJS.ReadStream.
   */
  asNodeReadStream(): NodeJS.ReadStream {
    return this as unknown as NodeJS.ReadStream;
  }
}
