import {
  useRef,
  useEffect,
  useState,
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
import "@xterm/xterm/css/xterm.css";

/**
 * Configuration props for the InkCanvas component.
 */
export interface InkCanvasProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the canvas is currently focused and should receive keyboard input.
   * When `false`, keyboard events will not be captured by the terminal.
   *
   * @default false
   */
  focused?: boolean;

  /**
   * Fixed number of columns for the terminal.
   * If not provided, the terminal will automatically fit to the container's width.
   */
  cols?: number;

  /**
   * Fixed number of rows for the terminal.
   * If not provided, the terminal will automatically fit to the container's height.
   */
  rows?: number;

  /**
   * Whether to wrap the Ink app in a Box that matches the terminal dimensions.
   * When `true`, the children will be rendered inside a Box with width and height set to the terminal's current size.
   *
   * @default true
   */
  autoFit?: boolean;

  /**
   * Full Xterm.js terminal options configuration.
   *
   * Provides fine-grained control over the terminal appearance and behavior.
   * Options provided here take precedence over legacy props like `fontFamily` or `fontSize`.
   *
   * @see https://xtermjs.org/docs/api/terminal/interfaces/iterminaloptions/
   */
  terminalOptions?: Omit<ITerminalOptions, "disableStdin">;

  /**
   * Callback triggered when the terminal is resized.
   */
  onResize?: (dimensions: ITerminalDimensions) => void;
}

/**
 * Handle exposing imperative methods for controlling the InkCanvas.
 */
export interface InkCanvasHandle {
  /**
   * Retrieves the underlying Xterm.js Terminal instance.
   * Useful for advanced customization or direct access to the Xterm.js API.
   */
  readonly terminal: Terminal | null;

  /**
   * Gets the current dimensions of the terminal in columns and rows.
   */
  readonly dimensions: ITerminalDimensions | null;

  /**
   * Retrieves the underlying Ink Instance.
   */
  readonly instance: Instance | null;
}

/**
 * InkCanvas - A React component that bridges Ink applications with the browser using Xterm.js.
 *
 * This component initializes an Xterm.js terminal in the browser and creates custom
 * generic Node.js-style streams (`stdout`, `stderr`, `stdin`) to pipe output from
 * an Ink application into the terminal and input from the terminal back to Ink.
 *
 * Use this component to display command-line interfaces (built with Ink) directly
 * on a web page.
 *
 * Features:
 * - auto-fitting to container size
 * - input handling
 * - customizable appearance via Xterm.js options
 *
 * @example
 * ```tsx
 * import { InkCanvas } from './components/InkCanvas';
 * import { MyInkApp } from './MyInkApp';
 *
 * function App() {
 *   const [focused, setFocused] = useState(false);
 *
 *   return (
 *     <InkCanvas
 *       focused={focused}
 *       terminalOptions={{
 *         fontSize: 16,
 *         theme: { background: '#282c34' }
 *       }}
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
      autoFit = true,
      ...props
    },
    ref,
  ) => {
    /**
     * Stores the current terminal dimensions to trigger re-renders when resized.
     * This is used by the `autoFit` feature to ensure the Ink content is wrapped
     * in a Box with the correct dimensions.
     */
    const [dimensions, setDimensions] = useState<ITerminalDimensions>({
      cols: 0,
      rows: 0,
    });

    /**
     * Reference to the container div element where Xterm.js will be mounted.
     */
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Reference to the Xterm.js Terminal instance.
     * Initialized lazily with provided options.
     */
    const terminalRef = useRef<Terminal>(
      new Terminal({
        disableStdin: false,
        ...terminalOptions,
      }),
    );

    /**
     * Reference to the FitAddon for auto-resizing the terminal.
     */
    const fitAddonRef = useRef<FitAddon>(new FitAddon());

    /**
     * Reference to the custom custom stdin stream (Readable).
     */
    const stdinRef = useRef<TerminalReadableStream>(
      new TerminalReadableStream(terminalRef.current),
    );

    /**
     * Reference to the custom stdout stream (Writable).
     */
    const stdoutRef = useRef<TerminalWritableStream>(
      new TerminalWritableStream(terminalRef.current),
    );

    /**
     * Reference to the custom stderr stream (Writable).
     * Usually maps to the same output behavior as stdout in this terminal.
     */
    const stderrRef = useRef<TerminalWritableStream>(
      new TerminalWritableStream(terminalRef.current),
    );

    /**
     * Reference to the Ink instance.
     * Manages the lifecycle of the Ink application running inside the terminal streams.
     */
    const instanceRef = useRef<Instance>(
      render(<Box />, {
        stdout: stdoutRef.current.asNodeWriteStream(),
        stdin: stdinRef.current.asNodeReadStream(),
        stderr: stderrRef.current.asNodeWriteStream(),
        exitOnCtrlC: false,
        patchConsole: false,
      }),
    );

    /**
     * Ref to store the latest onResize callback.
     * This allows the terminal resize listener (which is set up once) to always call the
     * most recent version of the callback without needing to re-bind the listener.
     */
    const onResizeRef = useRef(onResize);

    /**
     * Exposes the terminal, dimensions, and Ink instance to the parent component.
     * This allows the parent to access and control these properties imperatively.
     */
    useImperativeHandle(
      ref,
      () => ({
        get terminal() {
          return terminalRef.current;
        },
        get dimensions() {
          return (
            terminalRef.current && {
              cols: terminalRef.current.cols,
              rows: terminalRef.current.rows,
            }
          );
        },
        get instance() {
          return instanceRef.current;
        },
      }),
      [],
    );

    /**
     * Updates the Ink application render when the children prop changes or dimensions update.
     *
     * If `autoFit` is true, the children are wrapped in an Ink <Box> with explicit
     * width and height matching the terminal dimensions. This directs the Ink layout engine
     * to respect the full available space of the terminal.
     */
    useEffect(() => {
      const instance = instanceRef.current;
      if (autoFit) {
        instance.rerender(
          <Box width={dimensions.cols} height={dimensions.rows}>
            {children}
          </Box>,
        );
      } else {
        instance.rerender(children);
      }
    }, [children, autoFit, dimensions]);

    useEffect(() => {});

    /**
     * Initializes the terminal addon and sets up resize listeners.
     * Also handles unmounting the Ink instance when the component is removed.
     *
     * @remarks
     * - Loads the FitAddon to enable auto-resizing.
     * - Syncs terminal stream dimensions with Xterm.js resizing.
     * - Updates the local `dimensions` state to trigger a re-render if autoFit is active.
     * - Cleans up the Ink instance on unmount.
     */
    useEffect(() => {
      const terminal = terminalRef.current;
      const instance = instanceRef.current;
      terminal.loadAddon(fitAddonRef.current);
      terminal.onResize((dimensions) => {
        stdoutRef.current?.updateDimensions();
        stderrRef.current?.updateDimensions();
        onResizeRef.current?.(dimensions);
        setDimensions(dimensions);
      });
      return () => instance.unmount();
    }, []);

    /**
     * Mounts the Xterm.js terminal into the container DOM element.
     * This action renders the terminal UI onto the screen.
     */
    useEffect(() => {
      const terminal = terminalRef.current;
      const container = containerRef.current;
      if (!container) {
        return;
      }
      terminal.open(container);
      setDimensions({ rows: terminal.rows, cols: terminal.cols });
    }, [containerRef]);

    /**
     * Manages terminal resizing behavior.
     *
     * @remarks
     * - If static `cols` and `rows` are provided, the terminal is resized to those fixed dimensions.
     * - If no static dimensions are given, a `ResizeObserver` monitors the container to auto-fit
     *   the terminal using the `FitAddon`.
     */
    useEffect(() => {
      const terminal = terminalRef.current;
      const container = containerRef.current;
      if (cols && rows) {
        terminal.resize(cols, rows);
        return;
      }
      if (!container) {
        return;
      }
      const onResize = () => {
        const dimensions = fitAddonRef.current.proposeDimensions();
        console.log(dimensions);
        if (dimensions) {
          terminal.resize(cols ?? dimensions.cols, rows ?? dimensions.rows);
        }
      };
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);
      onResize();
      return () => resizeObserver.disconnect();
    }, [cols, rows, containerRef]);

    /**
     * Updates the terminal options dynamically when props change.
     * Allows customization of the terminal appearance (font, theme, etc.) at runtime.
     */
    useEffect(() => {
      terminalRef.current.options = terminalOptions!;
    }, [terminalRef, terminalOptions]);

    /**
     * Manages focus state of the terminal.
     * Focuses or blurs the terminal instance based on the `focused` prop.
     */
    useEffect(() => {
      const terminal = terminalRef.current;
      if (focused) {
        terminal.focus();
      } else {
        terminal.blur();
      }
    }, [focused]);

    return <div ref={containerRef} {...props} />;
  },
);

InkCanvas.displayName = "InkCanvas";
