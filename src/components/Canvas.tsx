/**
 * Canvas Component
 *
 * A root container component that automatically sizes itself to match the stdout dimensions.
 * This component listens to resize events from the stdout stream and updates its dimensions
 * accordingly, ensuring the Ink application always fills the available terminal space.
 *
 * @remarks
 * In a typical terminal environment, the stdout stream provides `columns` and `rows` properties
 * indicating the terminal dimensions. This component uses those values to set the width and height
 * of its Box container.
 *
 * When used with InkCanvas, the stdout stream is the custom {@link TerminalWritableStream} which
 * emits 'resize' events whenever the Xterm.js terminal dimensions change.
 *
 * @module components/Canvas
 */

import React from "react";
import { Box, useStdout } from "ink";

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Props for the Canvas component
 *
 * Extends all props from Ink's Box component, allowing full customization
 * of the container's styling and layout properties.
 *
 * @remarks
 * While you can pass custom `width` and `height` props, the Canvas component
 * will override them with the current stdout dimensions. If you need a fixed-size
 * container, use a regular Box instead.
 *
 * @see https://github.com/vadimdemedes/ink#box for available Box props
 */
export type CanvasProps = React.ComponentProps<typeof Box>;

// ============================================================================
// Canvas Component
// ============================================================================

/**
 * A root component that automatically sizes itself to match stdout dimensions
 *
 * Use this as the top-level container for your Ink application to ensure it
 * fills the entire terminal viewport. The component automatically responds
 * to terminal resize events and updates its dimensions accordingly.
 *
 * @param props - Standard Ink Box props passed to the underlying container
 * @returns A Box component sized to match the terminal dimensions
 *
 * @remarks
 * This component is used internally by InkCanvas to wrap user-provided children.
 * It ensures that the Ink application's layout calculations use the full terminal
 * dimensions, enabling proper scrolling and layout behavior.
 *
 * **How it works:**
 * 1. Uses `useStdout` hook to access the stdout stream
 * 2. Initializes state with current stdout dimensions
 * 3. Sets up a resize event listener to track dimension changes
 * 4. Renders a Box with width/height matching the terminal size
 *
 * @example
 * Basic usage within an Ink application:
 * ```tsx
 * import { Canvas } from './Canvas';
 * import { Text } from 'ink';
 *
 * const App = () => (
 *   <Canvas>
 *     <Text>This will fill the entire terminal!</Text>
 *   </Canvas>
 * );
 * ```
 *
 * @example
 * With custom styling (note: width/height will be overridden):
 * ```tsx
 * <Canvas flexDirection="column" justifyContent="center">
 *   <Text>Vertically centered content</Text>
 * </Canvas>
 * ```
 */
export const Canvas = (props: CanvasProps) => {
  // ============================================================================
  // Hooks
  // ============================================================================

  /**
   * Access the stdout stream from Ink's context
   *
   * In regular Ink applications, this is process.stdout.
   * In InkCanvas, this is our custom TerminalWritableStream.
   *
   * The stdout object provides:
   * - `columns`: Number of columns in the terminal
   * - `rows`: Number of rows in the terminal
   * - Event: 'resize' - fired when dimensions change
   */
  const { stdout } = useStdout();

  /**
   * State to track the current terminal dimensions
   *
   * This state is updated whenever the stdout emits a 'resize' event.
   * The state object contains:
   * - `columns`: Current number of columns
   * - `rows`: Current number of rows
   */
  const [size, setSize] = React.useState({
    columns: stdout.columns,
    rows: stdout.rows,
  });

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Effect: Subscribe to stdout resize events
   *
   * Sets up an event listener for the 'resize' event on stdout.
   * When the terminal is resized, updates the size state with new dimensions.
   *
   * @remarks
   * The cleanup function removes the event listener when the component unmounts
   * or when the stdout reference changes (which shouldn't happen in practice).
   *
   * When using InkCanvas:
   * - The TerminalWritableStream emits 'resize' when Xterm.js terminal is resized
   * - This triggers a re-render with the new dimensions
   * - Ink then recalculates the layout based on the new size
   */
  React.useEffect(() => {
    /**
     * Handler for resize events
     *
     * Reads the current dimensions from stdout and updates component state.
     */
    const onResize = () => {
      setSize({
        columns: stdout.columns,
        rows: stdout.rows,
      });
    };

    // Subscribe to resize events
    stdout.on("resize", onResize);

    // Cleanup: unsubscribe when component unmounts
    return () => {
      stdout.off("resize", onResize);
    };
  }, [stdout]);

  // ============================================================================
  // Render
  // ============================================================================

  /**
   * Render a Box component with dimensions matching the terminal
   *
   * Spreads all passed props onto the Box, then overrides width and height
   * with the current terminal dimensions. This ensures the Box always fills
   * the entire terminal viewport.
   */
  return <Box {...props} width={size.columns} height={size.rows} />;
};
