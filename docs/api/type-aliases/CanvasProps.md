[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / CanvasProps

# Type Alias: CanvasProps

> **CanvasProps** = `React.ComponentProps`\<_typeof_ `Box`\>

Props for the Canvas component

Extends all props from Ink's Box component, allowing full customization
of the container's styling and layout properties.

## Remarks

While you can pass custom `width` and `height` props, the Canvas component
will override them with the current stdout dimensions. If you need a fixed-size
container, use a regular Box instead.

## See

https://github.com/vadimdemedes/ink#box for available Box props
