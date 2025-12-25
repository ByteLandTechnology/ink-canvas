# ink-canvas

A library for rendering [Ink](https://github.com/vadimdemedes/ink) applications in the browser using [Xterm.js](https://xtermjs.org/).

`ink-canvas` bridges the gap between Node.js-based CLI UIs built with Ink and web-based terminal emulators. It provides custom stream implementations and Node.js environment mocks that allow Ink to render directly into an Xterm.js instance running in a React application.

![License](https://img.shields.io/npm/l/ink-canvas)
![Version](https://img.shields.io/npm/v/ink-canvas)

## Features

- 🖥️ **Browser Compatibility**: Run Ink applications entirely in the browser.
- 🎨 **Xterm.js Integration**: Leverages the power and styling of Xterm.js.
- 📐 **Auto Resizing**: Automatically handles terminal resizing and layout fitting.
- ⌨️ **Input Handling**: Captures keyboard input from the browser and forwards it to Ink.
- 🌊 **Custom Streams**: built-in `stdout`, `stderr`, and `stdin` streams optimized for the browser.

## Installation

Install `ink-canvas`

```bash
npm install ink-canvas
```

## Usage

Looking to build a web-based terminal UI? Here is a simple example:

```tsx
import React, { useState } from "react";
import { render, Text, Box } from "ink";
import { InkCanvas } from "ink-canvas";

const MyInkApp = () => (
  <Box borderStyle="round" borderColor="green">
    <Text>Hello from Ink in the Browser! 👋</Text>
  </Box>
);

const App = () => {
  const [focused, setFocused] = useState(true);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <InkCanvas
        focused={focused}
        terminalOptions={{
          fontSize: 14,
          theme: { background: "#1a1b26" },
        }}
      >
        <MyInkApp />
      </InkCanvas>
    </div>
  );
};

export default App;
```

## API Reference

### `<InkCanvas />`

The main component that wraps your Ink application.

#### Props

| Prop              | Type                                             | Default     | Description                                          |
| ----------------- | ------------------------------------------------ | ----------- | ---------------------------------------------------- |
| `children`        | `ReactNode`                                      | -           | The Ink application to render.                       |
| `focused`         | `boolean`                                        | `false`     | Whether the terminal captures keyboard input.        |
| `cols`            | `number`                                         | `undefined` | Fixed number of columns. If omitted, fits container. |
| `rows`            | `number`                                         | `undefined` | Fixed number of rows. If omitted, fits container.    |
| `terminalOptions` | `ITerminalOptions`                               | `{}`        | Configuration for the Xterm.js instance.             |
| `onResize`        | `(dims: { cols: number, rows: number }) => void` | -           | Callback fired when terminal dimensions change.      |
| `autoFit`         | `boolean`                                        | `true`      | Whether to resize Ink layout to match terminal size. |
| `...divProps`     | `HTMLAttributes<HTMLDivElement>`                 | -           | All other props are passed to the container `div`.   |

#### Ref (`InkCanvasHandle`)

You can access the underlying terminal instance using a ref:

```tsx
const canvasRef = useRef<InkCanvasHandle>(null);

// Access xterm instance
// canvasRef.current?.terminal

// Access dimensions
// canvasRef.current?.dimensions

// Access ink instance
// canvasRef.current?.instance
```

| Property     | Type                          | Description                              |
| ------------ | ----------------------------- | ---------------------------------------- |
| `terminal`   | `Terminal \| null`            | The Xterm.js Terminal instance.          |
| `dimensions` | `ITerminalDimensions \| null` | Current terminal columns and rows.       |
| `instance`   | `Instance \| null`            | The Ink instance returned by `render()`. |

## How it Works

Ink is designed for Node.js environments and relies on `process.stdout`, `process.stdin`, and other system APIs. `ink-canvas` provides:

1.  **Shims**: Polyfills for global `process` properties needed by Ink.
2.  **Custom Streams**: `TerminalWritableStream` and `TerminalReadableStream` that implement the minimal Node.js stream interfaces required by Ink, converting data to/from Xterm.js API calls.
3.  **React Lifecycle**: A bridge component that manages the Xterm.js lifecycle and mounts the Ink instance.

## License

MIT
