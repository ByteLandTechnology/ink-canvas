[**ink-canvas**](README.md)

---

# ink-canvas

Ink Canvas - A library for rendering Ink applications in the browser using Xterm.js

This package provides the [InkCanvas](variables/InkCanvas.md) component, which acts as a bridge between
Ink's Node.js-based rendering model and browser-based Xterm.js terminals. It mocks
necessary Node.js globals (via shims) and provides custom stream implementations
to allow Ink to run seamlessly in a web environment.

## Remarks

Ink is a React framework for building command-line interfaces that natively only runs
in Node.js environments. This library enables it to run in the browser through the
following mechanisms:

1. **Process Shim**: Mocks the Node.js global `process` object
2. **Custom Streams**: Provides Node.js stream API compatible `stdout`, `stderr`, and `stdin` implementations
3. **Xterm.js Integration**: Uses Xterm.js as the terminal rendering backend

## Example

Basic usage example:

```tsx
import { InkCanvas } from "ink-canvas";
import { Text, Box } from "ink";

const MyApp = () => (
  <Box borderStyle="round">
    <Text>Hello from Ink in the Browser!</Text>
  </Box>
);

function App() {
  return (
    <InkCanvas focused>
      <MyApp />
    </InkCanvas>
  );
}
```

## Interfaces

- [InkCanvasHandle](interfaces/InkCanvasHandle.md)
- [InkCanvasProps](interfaces/InkCanvasProps.md)

## Type Aliases

- [CanvasProps](type-aliases/CanvasProps.md)

## Variables

- [InkCanvas](variables/InkCanvas.md)
- [processShim](variables/processShim.md)

## Functions

- [Canvas](functions/Canvas.md)
