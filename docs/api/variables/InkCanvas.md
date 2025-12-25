[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / InkCanvas

# Variable: InkCanvas

> `const` **InkCanvas**: `ForwardRefExoticComponent`\<[`InkCanvasProps`](../interfaces/InkCanvasProps.md) & `RefAttributes`\<[`InkCanvasHandle`](../interfaces/InkCanvasHandle.md)\>\>

InkCanvas - A React component that bridges Ink applications with the browser using Xterm.js

This component initializes an Xterm.js terminal in the browser and creates custom
Node.js-style streams (`stdout`, `stderr`, `stdin`) to pipe output from an Ink
application into the terminal and input from the terminal back to Ink.

## Remarks

**Features:**

- Auto-fitting to container size (can be disabled with fixed `cols`/`rows`)
- Keyboard input handling via `focused` prop
- Customizable terminal appearance via `terminalOptions`
- Resize callback for tracking dimension changes
- Imperative handle for accessing terminal and Ink instances

**Lifecycle:**

1. On mount: Creates Terminal, FitAddon, streams, and Ink instance
2. Attaches resize observer for auto-fitting (if not using fixed dimensions)
3. Re-renders Ink children wrapped in Canvas when children change
4. On unmount: Disposes terminal and cleans up Ink instance

**Important Notes:**

- The container div must have explicit dimensions (via style or CSS) for
  auto-fitting to work correctly
- The component uses `forwardRef` to expose [InkCanvasHandle](../interfaces/InkCanvasHandle.md)
- Terminal options changes are applied reactively via useEffect

## Example

Full-featured example:

```tsx
import { InkCanvas, InkCanvasHandle } from "ink-canvas";
import { useRef, useState } from "react";

function App() {
  const canvasRef = useRef<InkCanvasHandle>(null);
  const [focused, setFocused] = useState(false);

  return (
    <InkCanvas
      ref={canvasRef}
      focused={focused}
      onClick={() => setFocused(true)}
      terminalOptions={{
        fontSize: 16,
        theme: { background: "#282c34" },
      }}
      onResize={(dims) => console.log("Resized:", dims)}
      style={{ width: "100%", height: "100vh" }}
    >
      <MyInkApp />
    </InkCanvas>
  );
}
```
