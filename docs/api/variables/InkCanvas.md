[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / InkCanvas

# Variable: InkCanvas

> `const` **InkCanvas**: `ForwardRefExoticComponent`\<[`InkCanvasProps`](../interfaces/InkCanvasProps.md) & `RefAttributes`\<[`InkCanvasHandle`](../interfaces/InkCanvasHandle.md)\>\>

InkCanvas - A React component that bridges Ink applications with the browser using Xterm.js.

This component initializes an Xterm.js terminal in the browser and creates custom
generic Node.js-style streams (`stdout`, `stderr`, `stdin`) to pipe output from
an Ink application into the terminal and input from the terminal back to Ink.

Use this component to display command-line interfaces (built with Ink) directly
on a web page.

Features:

- auto-fitting to container size
- input handling
- customizable appearance via Xterm.js options

## Example

```tsx
import { InkCanvas } from "./components/InkCanvas";
import { MyInkApp } from "./MyInkApp";

function App() {
  const [focused, setFocused] = useState(false);

  return (
    <InkCanvas
      focused={focused}
      terminalOptions={{
        fontSize: 16,
        theme: { background: "#282c34" },
      }}
    >
      <MyInkApp />
    </InkCanvas>
  );
}
```
