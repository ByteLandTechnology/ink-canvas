**ink-canvas**

---

# ink-canvas

A library for rendering [Ink](https://github.com/vadimdemedes/ink) applications in the browser using [Xterm.js](https://xtermjs.org/).

`ink-canvas` bridges the gap between Node.js-based CLI UIs built with Ink and web-based terminal emulators. It provides custom stream implementations and Node.js environment mocks that allow Ink to render directly into an Xterm.js instance running in a React application.

![License](https://img.shields.io/npm/l/ink-canvas)
![Version](https://img.shields.io/npm/v/ink-canvas)

## Features

- 🖥️ **Browser Compatibility**: Run Ink applications entirely in the browser
- 🎨 **Xterm.js Integration**: Leverages the power and styling of Xterm.js
- 📐 **Auto Resizing**: Automatically handles terminal resizing and layout fitting
- ⌨️ **Input Handling**: Captures keyboard input from the browser and forwards it to Ink
- 🌊 **Custom Streams**: Built-in `stdout`, `stderr`, and `stdin` streams optimized for the browser
- 🔌 **Vite Plugin**: Easy setup with automatic polyfill configuration

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Vite Configuration](#vite-configuration)
  - [Polyfills Setup](#polyfills-setup)
- [API Reference](#api-reference)
  - [InkCanvas Component](#inkcanvas-component)
  - [InkCanvasHandle](#inkcanvashandle)
  - [inkCanvasPolyfills Plugin](#inkcanvaspolyfills-plugin)
- [How It Works](#how-it-works)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Installation

Install `ink-canvas` and its peer dependencies:

```bash
# npm
npm install ink-canvas ink react @xterm/xterm @xterm/addon-fit

# yarn
yarn add ink-canvas ink react @xterm/xterm @xterm/addon-fit

# pnpm
pnpm add ink-canvas ink react @xterm/xterm @xterm/addon-fit
```

## Quick Start

Here's a simple example to get you started:

```tsx
import React, { useState } from "react";
import { Text, Box } from "ink";
import { InkCanvas } from "ink-canvas";

// Your Ink application component
const MyInkApp = () => (
  <Box borderStyle="round" borderColor="green">
    <Text>Hello from Ink in the Browser! 👋</Text>
  </Box>
);

// Main React component
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

## Configuration

### Vite Configuration

To use `ink-canvas` with Vite, you need to configure polyfills for Node.js globals. The easiest way is to use the provided `inkCanvasPolyfills` plugin:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { inkCanvasPolyfills } from "ink-canvas/plugin";

export default defineConfig({
  plugins: [
    react(),
    inkCanvasPolyfills(), // Add this plugin
  ],
});
```

### Polyfills Setup

The `inkCanvasPolyfills` plugin handles the following automatically:

1. **Process Shim**: Redirects `node:process` imports to a browser-compatible shim
2. **Buffer Polyfill**: Provides the `Buffer` global for binary data operations
3. **Global Object**: Ensures the `global` object is available (maps to `globalThis`)

#### Manual Polyfill Configuration

If you prefer to configure polyfills manually or are using a different build tool, you need to:

1. **Install dependencies**:

```bash
npm install vite-plugin-node-polyfills
```

2. **Configure your bundler** to alias `node:process` to the ink-canvas process shim:

```typescript
// vite.config.ts (manual configuration)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ["process"], // We use our own process shim
      globals: {
        Buffer: true,
        global: true,
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "node:process": "ink-canvas/shims/process",
    },
  },
});
```

#### Development Mode (Library Development)

When developing the ink-canvas library itself, pass `true` to use local source files:

```typescript
inkCanvasPolyfills(true); // Uses local shims/process.ts
```

## API Reference

### InkCanvas Component

The main component that wraps your Ink application.

```tsx
import { InkCanvas } from "ink-canvas";
```

#### Props

| Prop              | Type                                             | Default     | Description                                         |
| ----------------- | ------------------------------------------------ | ----------- | --------------------------------------------------- |
| `children`        | `ReactNode`                                      | -           | The Ink application to render                       |
| `focused`         | `boolean`                                        | `false`     | Whether the terminal captures keyboard input        |
| `cols`            | `number`                                         | `undefined` | Fixed number of columns. If omitted, fits container |
| `rows`            | `number`                                         | `undefined` | Fixed number of rows. If omitted, fits container    |
| `terminalOptions` | `ITerminalOptions`                               | `{}`        | Configuration for the Xterm.js instance             |
| `onResize`        | `(dims: { cols: number, rows: number }) => void` | -           | Callback fired when terminal dimensions change      |
| `...divProps`     | `HTMLAttributes<HTMLDivElement>`                 | -           | All other props are passed to the container `div`   |

#### Terminal Options

The `terminalOptions` prop accepts all [Xterm.js ITerminalOptions](https://xtermjs.org/docs/api/terminal/interfaces/iterminaloptions/) except `disableStdin`. Common options include:

```tsx
<InkCanvas
  terminalOptions={{
    // Font settings
    fontSize: 16,
    fontFamily: "JetBrains Mono, Fira Code, monospace",
    fontWeight: "normal",
    fontWeightBold: "bold",

    // Cursor settings
    cursorStyle: "bar", // 'block' | 'underline' | 'bar'
    cursorBlink: true,

    // Theme (colors)
    theme: {
      background: "#1a1b26",
      foreground: "#a9b1d6",
      cursor: "#c0caf5",
      cursorAccent: "#1a1b26",
      selectionBackground: "#33467c",
      black: "#15161e",
      red: "#f7768e",
      green: "#9ece6a",
      yellow: "#e0af68",
      blue: "#7aa2f7",
      magenta: "#bb9af7",
      cyan: "#7dcfff",
      white: "#a9b1d6",
    },

    // Scrollback
    scrollback: 1000,

    // Other options
    allowProposedApi: true,
    convertEol: false,
  }}
>
  <MyApp />
</InkCanvas>
```

### InkCanvasHandle

Access the underlying terminal instance using a ref:

```tsx
import { useRef } from "react";
import { InkCanvas, InkCanvasHandle } from "ink-canvas";

const App = () => {
  const canvasRef = useRef<InkCanvasHandle>(null);

  const handleClick = () => {
    // Access the Xterm.js terminal
    const terminal = canvasRef.current?.terminal;

    // Get current dimensions
    const dimensions = canvasRef.current?.dimensions;
    console.log(`${dimensions?.cols}x${dimensions?.rows}`);

    // Access the Ink instance
    const inkInstance = canvasRef.current?.instance;
  };

  return (
    <InkCanvas ref={canvasRef}>
      <MyApp />
    </InkCanvas>
  );
};
```

#### Handle Properties

| Property     | Type                          | Description                             |
| ------------ | ----------------------------- | --------------------------------------- |
| `terminal`   | `Terminal \| null`            | The Xterm.js Terminal instance          |
| `dimensions` | `ITerminalDimensions \| null` | Current terminal columns and rows       |
| `instance`   | `Instance \| null`            | The Ink instance returned by `render()` |

### inkCanvasPolyfills Plugin

A Vite plugin that configures all necessary polyfills.

```typescript
import { inkCanvasPolyfills } from "ink-canvas/plugin";
```

#### Function Signature

```typescript
function inkCanvasPolyfills(dev?: boolean): Plugin[];
```

#### Parameters

| Parameter | Type      | Default | Description                                                |
| --------- | --------- | ------- | ---------------------------------------------------------- |
| `dev`     | `boolean` | `false` | If true, uses local source paths (for library development) |

#### Return Value

Returns an array of Vite plugins:

1. `vite-plugin-ink-canvas-polyfill`: Aliases `node:process` to the process shim
2. `vite-plugin-node-polyfills`: Provides `Buffer` and `global` polyfills

## How It Works

Ink is designed for Node.js environments and relies on `process.stdout`, `process.stdin`, and other system APIs. `ink-canvas` provides:

### 1. Process Shim (`shims/process.ts`)

A browser-compatible mock of Node.js's `process` object:

- `process.env`: Mocked environment variables with sensible defaults
- `process.stdout/stderr`: Minimal stream mocks with TTY properties
- `process.stdin`: Input stream mock
- `process.nextTick`: Implemented using `setTimeout`
- Other properties: `platform`, `version`, `argv`, `cwd()`, etc.

### 2. Custom Streams (`utils/streams.ts`)

**TerminalWritableStream** (stdout/stderr):

- Receives ANSI escape codes and text from Ink
- Converts LF (`\n`) to CRLF (`\r\n`) for proper Xterm.js rendering
- Provides cursor manipulation methods (`cursorTo`, `moveCursor`, `clearLine`)
- Emits `resize` events when terminal dimensions change

**TerminalReadableStream** (stdin):

- Captures keyboard input from Xterm.js `onData` events
- Buffers input and emits `readable` events for Ink to consume
- Supports raw mode for character-by-character input

### 3. Canvas Component (`components/Canvas.tsx`)

A wrapper component that:

- Automatically sizes itself to match stdout dimensions
- Listens for resize events and updates accordingly
- Ensures Ink's layout fills the entire terminal viewport

### 4. React Lifecycle Management (`components/InkCanvas.tsx`)

The InkCanvas component manages:

- Xterm.js terminal initialization and cleanup
- Stream creation and connection
- Ink instance lifecycle (render, rerender, unmount)
- Container auto-fitting with ResizeObserver
- Focus state management

## Examples

### Basic Counter App

```tsx
import { useState, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import { InkCanvas } from "ink-canvas";

const Counter = () => {
  const [count, setCount] = useState(0);

  useInput((input, key) => {
    if (input === "+" || key.upArrow) {
      setCount((c) => c + 1);
    } else if (input === "-" || key.downArrow) {
      setCount((c) => c - 1);
    } else if (input === "q") {
      // Handle quit
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text>Count: {count}</Text>
      <Text dimColor>Press +/- or ↑/↓ to change, q to quit</Text>
    </Box>
  );
};

const App = () => (
  <InkCanvas focused style={{ width: 400, height: 200 }}>
    <Counter />
  </InkCanvas>
);
```

### Interactive List with Scrolling

```tsx
import { useState } from "react";
import { Text, Box, useInput } from "ink";
import { InkCanvas } from "ink-canvas";

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const ScrollableList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex((i) => Math.max(0, i - 1));
    } else if (key.downArrow) {
      setSelectedIndex((i) => Math.min(items.length - 1, i + 1));
    }
  });

  return (
    <Box flexDirection="column">
      {items.map((item, index) => (
        <Text
          key={item}
          color={index === selectedIndex ? "green" : undefined}
          bold={index === selectedIndex}
        >
          {index === selectedIndex ? "❯ " : "  "}
          {item}
        </Text>
      ))}
    </Box>
  );
};

const App = () => (
  <InkCanvas focused style={{ width: "100%", height: "400px" }}>
    <ScrollableList />
  </InkCanvas>
);
```

### Dynamic Resize Handling

```tsx
import { useState } from "react";
import { Text, Box } from "ink";
import { InkCanvas } from "ink-canvas";

const ResizeDemo = () => {
  const [size, setSize] = useState({ cols: 0, rows: 0 });

  return (
    <InkCanvas
      focused
      onResize={(dims) => setSize(dims)}
      style={{ width: "100%", height: "100vh" }}
    >
      <Box borderStyle="single" padding={1}>
        <Text>
          Terminal size: {size.cols} columns × {size.rows} rows
        </Text>
      </Box>
    </InkCanvas>
  );
};
```

## Troubleshooting

### Common Issues

#### "process is not defined" or "Cannot read properties of undefined (reading 'env')"

Ensure you have configured the polyfills correctly. Add `inkCanvasPolyfills()` to your Vite plugins:

```typescript
// vite.config.ts
import { inkCanvasPolyfills } from "ink-canvas/plugin";

export default defineConfig({
  plugins: [react(), inkCanvasPolyfills()],
});
```

#### Terminal not displaying / appears empty

Make sure the container element has explicit dimensions:

```tsx
// ❌ Wrong - no dimensions
<InkCanvas>
  <MyApp />
</InkCanvas>

// ✅ Correct - explicit dimensions via style
<InkCanvas style={{ width: "100%", height: "400px" }}>
  <MyApp />
</InkCanvas>

// ✅ Correct - explicit dimensions via CSS class
<InkCanvas className="terminal-container">
  <MyApp />
</InkCanvas>
```

#### Keyboard input not working

Ensure the `focused` prop is set to `true`:

```tsx
<InkCanvas focused={true}>
  <MyApp />
</InkCanvas>
```

#### Text wrapping incorrectly / layout issues

The terminal must be mounted before Ink can calculate layout. If you're seeing layout issues on initial render, try using the `onResize` callback to trigger a re-render:

```tsx
const [ready, setReady] = useState(false);

<InkCanvas onResize={() => setReady(true)}>{ready && <MyApp />}</InkCanvas>;
```

#### Build errors with TypeScript

Ensure your `tsconfig.json` includes the necessary lib:

```json
{
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

### Getting Help

If you encounter issues not covered here, please:

1. Check the [GitHub Issues](https://github.com/ByteLandTechnology/ink-canvas/issues)
2. Create a new issue with a minimal reproduction

## License

MIT
