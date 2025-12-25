[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / InkCanvasHandle

# Interface: InkCanvasHandle

Handle exposing imperative methods for controlling the InkCanvas.

## Properties

### dimensions

> `readonly` **dimensions**: `ITerminalDimensions` \| `null`

Gets the current dimensions of the terminal in columns and rows.

---

### instance

> `readonly` **instance**: `Instance` \| `null`

Retrieves the underlying Ink Instance.

---

### terminal

> `readonly` **terminal**: `Terminal` \| `null`

Retrieves the underlying Xterm.js Terminal instance.
Useful for advanced customization or direct access to the Xterm.js API.
