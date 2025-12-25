[**ink-canvas**](README.md)

---

# ink-canvas

Ink Canvas

A library for rendering Ink applications in the browser using Xterm.js.

This package provides the [InkCanvas](variables/InkCanvas.md) component, which acts as a bridge
between Ink's Node.js-based rendering model and the browser-based Xterm.js terminal.
It mocks necessary Node.js globals (via shims) and provides custom stream implementations
to allow Ink to run seamlessly in a web environment.

## Interfaces

- [InkCanvasHandle](interfaces/InkCanvasHandle.md)
- [InkCanvasProps](interfaces/InkCanvasProps.md)

## Variables

- [InkCanvas](variables/InkCanvas.md)
- [processShim](variables/processShim.md)
