/**
 * InkCanvas Component
 *
 * A React component that bridges Ink CLI applications with the browser using Xterm.js.
 * This component enables running Ink-based terminal user interfaces directly in a web page.
 *
 * @remarks
 * Ink is a React-based framework for building command-line interfaces that normally
 * only runs in Node.js. This component makes it possible to render Ink applications
 * in the browser by:
 *
 * 1. Creating an Xterm.js terminal instance for rendering
 * 2. Providing custom stdout/stderr/stdin streams that bridge Ink and Xterm.js
 * 3. Managing terminal resizing and focus state
 * 4. Wrapping children in a Canvas component for proper dimensioning
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { InkCanvas } from 'ink-canvas';
 * import { Text, Box } from 'ink';
 *
 * const MyInkApp = () => (
 *   <Box borderStyle="round" borderColor="green">
 *     <Text>Hello from Ink in the Browser! 👋</Text>
 *   </Box>
 * );
 *
 * function App() {
 *   return (
 *     <InkCanvas
 *       focused={true}
 *       terminalOptions={{ fontSize: 14 }}
 *       style={{ width: '100%', height: '400px' }}
 *     >
 *       <MyInkApp />
 *     </InkCanvas>
 *   );
 * }
 * ```
 *
 * @module components/InkCanvas
 */

import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  type HTMLAttributes,
} from "react";
import { Terminal, type ITerminalOptions } from "@xterm/xterm";
import { FitAddon, type ITerminalDimensions } from "@xterm/addon-fit";
import { Box, render, type Instance } from "ink";
import {
  TerminalReadableStream,
  TerminalWritableStream,
} from "../utils/streams";
import { Canvas } from "./Canvas";
import "@xterm/xterm/css/xterm.css";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Configuration props for the InkCanvas component
 *
 * Extends standard HTML div attributes to allow full customization of the
 * container element (className, style, data-*, event handlers, etc.).
 *
 * @remarks
 * All HTML div attributes are passed through to the container element,
 * except for the InkCanvas-specific props defined in this interface.
 */
export interface InkCanvasProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the canvas is currently focused and should receive keyboard input
   *
   * When `true`, the terminal captures keyboard events and forwards them to the
   * Ink application. When `false`, keyboard events are ignored.
   *
   * @remarks
   * Use this prop to control when the terminal should accept input. For example,
   * you might set this to `false` when a modal dialog is open, or when the user
   * is interacting with other parts of your application.
   *
   * @defaultValue false
   *
   * @example
   * ```tsx
   * const [isFocused, setIsFocused] = useState(false);
   *
   * <InkCanvas
   *   focused={isFocused}
   *   onClick={() => setIsFocused(true)}
   *   onBlur={() => setIsFocused(false)}
   * >
   *   <MyApp />
   * </InkCanvas>
   * ```
   */
  focused?: boolean;

  /**
   * Fixed number of columns for the terminal
   *
   * If provided, the terminal will use this exact column count instead of
   * auto-fitting to the container width.
   *
   * @remarks
   * When both `cols` and `rows` are provided, auto-fitting is disabled entirely.
   * If only `cols` is provided without `rows`, auto-fitting will still occur
   * for rows while columns remain fixed.
   *
   * @example
   * ```tsx
   * // Fixed 80-column terminal
   * <InkCanvas cols={80}>
   *   <MyApp />
   * </InkCanvas>
   * ```
   */
  cols?: number;

  /**
   * Fixed number of rows for the terminal
   *
   * If provided, the terminal will use this exact row count instead of
   * auto-fitting to the container height.
   *
   * @see {@link cols} for remarks on auto-fitting behavior
   */
  rows?: number;

  /**
   * Full Xterm.js terminal options configuration
   *
   * Provides fine-grained control over the terminal's appearance and behavior.
   * All options from Xterm.js's ITerminalOptions are supported except `disableStdin`,
   * which is always set to `false` internally.
   *
   * @remarks
   * Common options include:
   * - `fontSize`: Font size in pixels
   * - `fontFamily`: Font family string
   * - `theme`: Color theme object with properties like `background`, `foreground`, etc.
   * - `cursorStyle`: 'block', 'underline', or 'bar'
   * - `cursorBlink`: Whether the cursor should blink
   *
   * @see https://xtermjs.org/docs/api/terminal/interfaces/iterminaloptions/
   *
   * @example
   * ```tsx
   * <InkCanvas
   *   terminalOptions={{
   *     fontSize: 16,
   *     fontFamily: 'JetBrains Mono, monospace',
   *     theme: {
   *       background: '#1a1b26',
   *       foreground: '#a9b1d6',
   *     },
   *     cursorStyle: 'bar',
   *     cursorBlink: true,
   *   }}
   * >
   *   <MyApp />
   * </InkCanvas>
   * ```
   */
  terminalOptions?: Omit<ITerminalOptions, "disableStdin">;

  /**
   * Callback triggered when the terminal is resized
   *
   * Called whenever the terminal dimensions change, either due to container
   * resizing (with auto-fit) or programmatic resize.
   *
   * @param dimensions - Object containing the new `cols` and `rows` values
   *
   * @example
   * ```tsx
   * <InkCanvas
   *   onResize={(dims) => {
   *     console.log(`Terminal resized to ${dims.cols}x${dims.rows}`);
   *   }}
   * >
   *   <MyApp />
   * </InkCanvas>
   * ```
   */
  onResize?: (dimensions: ITerminalDimensions) => void;
}

/**
 * Handle exposing imperative methods for controlling the InkCanvas
 *
 * Use this interface with React's `useRef` and `useImperativeHandle` to
 * access the underlying terminal and Ink instances.
 *
 * @example
 * ```tsx
 * const canvasRef = useRef<InkCanvasHandle>(null);
 *
 * // Later, access the terminal:
 * const terminal = canvasRef.current?.terminal;
 * const dimensions = canvasRef.current?.dimensions;
 * const inkInstance = canvasRef.current?.instance;
 * ```
 */
export interface InkCanvasHandle {
  /**
   * The underlying Xterm.js Terminal instance
   *
   * Provides direct access to the terminal for advanced operations like:
   * - Custom escape sequence handling
   * - Terminal-level event listeners
   * - Programmatic writing to the terminal
   *
   * @remarks
   * Be cautious when interacting with the terminal directly, as it may
   * interfere with Ink's rendering. The terminal is initialized during
   * the first render, so this may be null before mount.
   *
   * @readonly
   */
  readonly terminal: Terminal | null;

  /**
   * Current dimensions of the terminal in columns and rows
   *
   * Returns an object with `cols` and `rows` properties, or `null` if
   * the terminal hasn't been initialized yet.
   *
   * @readonly
   */
  readonly dimensions: ITerminalDimensions | null;

  /**
   * The underlying Ink Instance
   *
   * Provides access to Ink's render instance for operations like:
   * - `instance.rerender()`: Force a re-render
   * - `instance.unmount()`: Unmount the Ink application
   * - `instance.waitUntilExit()`: Wait for the app to exit
   *
   * @readonly
   */
  readonly instance: Instance | null;
}

// ============================================================================
// InkCanvas Component
// ============================================================================

/**
 * InkCanvas - A React component that bridges Ink applications with the browser using Xterm.js
 *
 * This component initializes an Xterm.js terminal in the browser and creates custom
 * Node.js-style streams (`stdout`, `stderr`, `stdin`) to pipe output from an Ink
 * application into the terminal and input from the terminal back to Ink.
 *
 * @remarks
 * **Features:**
 * - Auto-fitting to container size (can be disabled with fixed `cols`/`rows`)
 * - Keyboard input handling via `focused` prop
 * - Customizable terminal appearance via `terminalOptions`
 * - Resize callback for tracking dimension changes
 * - Imperative handle for accessing terminal and Ink instances
 *
 * **Lifecycle:**
 * 1. On mount: Creates Terminal, FitAddon, streams, and Ink instance
 * 2. Attaches resize observer for auto-fitting (if not using fixed dimensions)
 * 3. Re-renders Ink children wrapped in Canvas when children change
 * 4. On unmount: Disposes terminal and cleans up Ink instance
 *
 * **Important Notes:**
 * - The container div must have explicit dimensions (via style or CSS) for
 *   auto-fitting to work correctly
 * - The component uses `forwardRef` to expose {@link InkCanvasHandle}
 * - Terminal options changes are applied reactively via useEffect
 *
 * @example
 * Full-featured example:
 * ```tsx
 * import { InkCanvas, InkCanvasHandle } from 'ink-canvas';
 * import { useRef, useState } from 'react';
 *
 * function App() {
 *   const canvasRef = useRef<InkCanvasHandle>(null);
 *   const [focused, setFocused] = useState(false);
 *
 *   return (
 *     <InkCanvas
 *       ref={canvasRef}
 *       focused={focused}
 *       onClick={() => setFocused(true)}
 *       terminalOptions={{
 *         fontSize: 16,
 *         theme: { background: '#282c34' }
 *       }}
 *       onResize={(dims) => console.log('Resized:', dims)}
 *       style={{ width: '100%', height: '100vh' }}
 *     >
 *       <MyInkApp />
 *     </InkCanvas>
 *   );
 * }
 * ```
 */
export const InkCanvas = forwardRef<InkCanvasHandle, InkCanvasProps>(
  (
    {
      children,
      focused = false,
      cols,
      rows,
      terminalOptions,
      onResize,
      ...props
    },
    ref,
  ) => {
    // ==========================================================================
    // Refs
    // ==========================================================================

    /**
     * Reference to the container div element where Xterm.js will be mounted
     *
     * The terminal is attached to this DOM element during initialization.
     * The element's dimensions are used for auto-fitting calculations.
     */
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Reference to the Xterm.js Terminal instance
     *
     * Initialized lazily in the first useEffect hook. Used for all terminal
     * operations including writing output, handling input, and resizing.
     */
    const terminalRef = useRef<Terminal>(null);

    /**
     * Reference to the FitAddon for auto-resizing the terminal
     *
     * The FitAddon provides methods for calculating and applying terminal
     * dimensions based on the container element's size.
     */
    const fitAddonRef = useRef<FitAddon>(null);

    /**
     * Reference to the custom stdout stream (TerminalWritableStream)
     *
     * This stream receives Ink's output and forwards it to the Xterm.js terminal.
     * It handles newline conversion and emits resize events.
     */
    const stdoutRef = useRef<TerminalWritableStream>(null);

    /**
     * Reference to the custom stderr stream (TerminalWritableStream)
     *
     * Similar to stdout, this stream handles error output from Ink.
     * In practice, stderr behaves identically to stdout since both
     * write to the same Xterm.js terminal.
     */
    const stderrRef = useRef<TerminalWritableStream>(null);

    /**
     * Reference to the Ink instance
     *
     * Manages the lifecycle of the Ink application running inside the terminal.
     * Used for re-rendering when children change and cleanup on unmount.
     */
    const instanceRef = useRef<Instance>(null);

    /**
     * Ref to store the latest onResize callback
     *
     * This pattern allows the terminal resize listener (set up once during
     * initialization) to always call the most recent version of the callback
     * without needing to re-bind the listener when onResize prop changes.
     */
    const onResizeRef = useRef(onResize);

    // ==========================================================================
    // Imperative Handle
    // ==========================================================================

    /**
     * Exposes terminal, dimensions, and Ink instance to parent components
     *
     * Uses getter properties to ensure fresh values are returned on each access.
     * The dependency array is empty because the refs themselves don't change,
     * only their `.current` values.
     */
    useImperativeHandle(
      ref,
      () => ({
        /**
         * Getter for the terminal instance
         * @returns The Xterm.js Terminal or null if not initialized
         */
        get terminal() {
          return terminalRef.current;
        },

        /**
         * Getter for the current terminal dimensions
         * @returns Object with cols and rows, or null if terminal not initialized
         */
        get dimensions() {
          return (
            terminalRef.current && {
              cols: terminalRef.current.cols,
              rows: terminalRef.current.rows,
            }
          );
        },

        /**
         * Getter for the Ink instance
         * @returns The Ink Instance or null if not initialized
         */
        get instance() {
          return instanceRef.current;
        },
      }),
      [],
    );

    // ==========================================================================
    // Effects
    // ==========================================================================

    /**
     * Effect: Initialize terminal, streams, and Ink instance
     *
     * This is the main initialization effect that runs once on mount.
     * It sets up all the necessary infrastructure for running Ink in the browser.
     *
     * @remarks
     * **Initialization steps:**
     * 1. Create Xterm.js Terminal with provided options
     * 2. Create and attach FitAddon for auto-resizing
     * 3. Create custom stdout, stdin, stderr streams
     * 4. Call `render()` to start the Ink application with an empty Box
     * 5. Open the terminal in the container element
     * 6. Set up terminal resize handler
     * 7. Store references for later use
     *
     * **Cleanup on unmount:**
     * - Disposes the terminal (removes from DOM, cleans up resources)
     * - Unmounts the Ink instance
     * - Calls Ink cleanup for any pending operations
     *
     * The empty dependency array ensures this runs only once on mount.
     */
    useEffect(() => {
      // Get container element reference
      const container = containerRef.current;
      if (!container) {
        return;
      }

      // Create Xterm.js terminal with user options
      // disableStdin is always false to enable keyboard input
      const terminal = new Terminal({
        disableStdin: false,
      });

      // Create FitAddon for auto-sizing terminal to container
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);

      // Create custom streams that bridge Ink and Xterm.js
      const stdout = new TerminalWritableStream(terminal);
      const stdin = new TerminalReadableStream(terminal);
      const stderr = new TerminalWritableStream(terminal);

      // Initialize Ink with custom streams
      // Start with empty Box - actual children are rendered in another effect
      const instance = render(<Box />, {
        stdout: stdout.asNodeWriteStream(),
        stdin: stdin.asNodeReadStream(),
        stderr: stderr.asNodeWriteStream(),
        exitOnCtrlC: false, // Prevent Ink from trying to call process.exit
        patchConsole: false, // Don't patch console.log since we're in browser
      });

      // Mount terminal to the DOM container
      terminal.open(container);

      // Set up terminal resize handler
      // This updates stream dimensions and calls the onResize callback
      const onTerminalResize = (size: ITerminalDimensions) => {
        // Update stream dimensions to match terminal
        stdout.updateDimensions();
        stderr.updateDimensions();

        // Call user's onResize callback if provided
        onResizeRef.current?.(size);
      };

      // Register resize handler with terminal
      terminal.onResize(onTerminalResize);

      // Trigger initial resize event with current dimensions
      onTerminalResize({ rows: terminal.rows, cols: terminal.cols });

      // Store references for use in other effects and imperative handle
      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;
      stdoutRef.current = stdout;
      stderrRef.current = stderr;
      instanceRef.current = instance;

      // Cleanup function: runs when component unmounts
      return () => {
        // Dispose terminal (removes from DOM, cleans up event listeners)
        terminal.dispose();

        // Unmount Ink application
        instance.unmount();

        // Additional Ink cleanup (cancel pending operations)
        instance.cleanup();
      };
    }, []);

    /**
     * Effect: Keep onResizeRef updated with latest callback
     *
     * This effect ensures the resize handler always has access to the
     * latest onResize callback, even though the handler itself is only
     * set up once during initialization.
     */
    useEffect(() => {
      onResizeRef.current = onResize;
    }, [onResize]);

    /**
     * Effect: Update Ink render when children change
     *
     * Re-renders the Ink application whenever the children prop changes.
     * Children are wrapped in a Canvas component to ensure proper sizing.
     *
     * @remarks
     * The Canvas component automatically sizes itself to match the terminal
     * dimensions, ensuring the Ink layout fills the available space.
     */
    useEffect(() => {
      const instance = instanceRef.current;
      if (instance) {
        // Re-render with new children wrapped in Canvas
        instance.rerender(<Canvas>{children}</Canvas>);
      }
    }, [children]);

    /**
     * Effect: Manage terminal resizing behavior
     *
     * Handles both fixed-dimension and auto-fit modes:
     *
     * **Fixed dimensions mode** (when both cols and rows are provided):
     * - Simply resizes the terminal to the specified dimensions
     * - No ResizeObserver is used
     *
     * **Auto-fit mode** (when cols or rows are not provided):
     * - Uses ResizeObserver to monitor container size changes
     * - Uses FitAddon to calculate optimal terminal dimensions
     * - Allows partial override (e.g., fixed cols but auto rows)
     *
     * @remarks
     * The ResizeObserver is cleaned up when:
     * - The component unmounts
     * - The cols or rows props change
     * - Switching from auto-fit to fixed dimensions mode
     */
    useEffect(() => {
      const terminal = terminalRef.current;
      const container = containerRef.current;
      if (!terminal || !container) {
        return;
      }

      // Fixed dimensions mode: resize to specified size
      if (cols && rows) {
        terminal.resize(Math.floor(cols), Math.floor(rows));
        return;
      }

      // Auto-fit mode: observe container size changes
      const onContainerSizeChanged = () => {
        const fitAddon = fitAddonRef.current;
        if (fitAddon) {
          // Calculate optimal dimensions based on container size
          const dimensions = fitAddon.proposeDimensions();
          if (dimensions) {
            // Use fixed value if provided, otherwise use calculated value
            const targetCols = Math.floor(cols ?? dimensions.cols);
            const targetRows = Math.floor(rows ?? dimensions.rows);

            // Ensure dimensions are valid (positive integers) for Xterm.js
            if (targetCols > 0 && targetRows > 0) {
              terminal.resize(targetCols, targetRows);
            }
          }
        }
      };

      // Set up ResizeObserver to monitor container size changes
      const resizeObserver = new ResizeObserver(onContainerSizeChanged);
      resizeObserver.observe(container);

      // Trigger initial fit
      onContainerSizeChanged();

      // Cleanup: disconnect observer when effect is cleaned up
      return () => resizeObserver.disconnect();
    }, [cols, rows]);

    /**
     * Effect: Update terminal options dynamically
     *
     * Applies changes to terminalOptions prop to the running terminal.
     * This allows customization of font, theme, and other options at runtime.
     *
     * @remarks
     * Xterm.js supports changing most options on a running terminal.
     * The terminal will re-render with the new options automatically.
     */
    useEffect(() => {
      const terminal = terminalRef.current;

      // Apply new options to terminal if both exist
      if (terminal && terminalOptions) {
        terminal.options = { disableStdin: false, ...terminalOptions };
      }
    }, [terminalOptions]);

    /**
     * Effect: Manage focus state of the terminal
     *
     * Focuses or blurs the terminal instance based on the `focused` prop.
     * When focused, the terminal captures keyboard events.
     * When blurred, keyboard events are not captured.
     *
     * @remarks
     * The terminal's focus state affects whether keyboard input is
     * forwarded to the Ink application via the stdin stream.
     */
    useEffect(() => {
      const terminal = terminalRef.current;
      if (terminal) {
        if (focused) {
          // Focus terminal to capture keyboard input
          terminal.focus();
        } else {
          // Blur terminal to stop capturing keyboard input
          terminal.blur();
        }
      }
    }, [focused]);

    // ==========================================================================
    // Render
    // ==========================================================================

    /**
     * Render the container div
     *
     * This div serves as the mount point for the Xterm.js terminal.
     * All remaining props (className, style, data-*, event handlers, etc.)
     * are spread onto this element.
     *
     * @remarks
     * The container must have explicit dimensions (via CSS or style prop)
     * for auto-fitting to work correctly. If no dimensions are set, the
     * terminal may not display properly.
     */
    return <div ref={containerRef} {...props} />;
  },
);

/**
 * Display name for the InkCanvas component
 *
 * Used by React DevTools for component identification.
 */
InkCanvas.displayName = "InkCanvas";
