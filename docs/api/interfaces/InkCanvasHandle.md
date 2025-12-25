[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / InkCanvasHandle

# Interface: InkCanvasHandle

Handle exposing imperative methods for controlling the InkCanvas

Use this interface with React's `useRef` and `useImperativeHandle` to
access the underlying terminal and Ink instances.

## Example

```tsx
const canvasRef = useRef<InkCanvasHandle>(null);

// Later, access the terminal:
const terminal = canvasRef.current?.terminal;
const dimensions = canvasRef.current?.dimensions;
const inkInstance = canvasRef.current?.instance;
```

## Properties

### dimensions

> `readonly` **dimensions**: `ITerminalDimensions` \| `null`

Current dimensions of the terminal in columns and rows

Returns an object with `cols` and `rows` properties, or `null` if
the terminal hasn't been initialized yet.

---

### instance

> `readonly` **instance**: `Instance` \| `null`

The underlying Ink Instance

Provides access to Ink's render instance for operations like:

- `instance.rerender()`: Force a re-render
- `instance.unmount()`: Unmount the Ink application
- `instance.waitUntilExit()`: Wait for the app to exit

---

### terminal

> `readonly` **terminal**: `Terminal` \| `null`

The underlying Xterm.js Terminal instance

Provides direct access to the terminal for advanced operations like:

- Custom escape sequence handling
- Terminal-level event listeners
- Programmatic writing to the terminal

#### Remarks

Be cautious when interacting with the terminal directly, as it may
interfere with Ink's rendering. The terminal is initialized during
the first render, so this may be null before mount.
