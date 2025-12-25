/**
 * Ink Canvas
 *
 * A library for rendering Ink applications in the browser using Xterm.js.
 *
 * This package provides the {@link InkCanvas} component, which acts as a bridge
 * between Ink's Node.js-based rendering model and the browser-based Xterm.js terminal.
 * It mocks necessary Node.js globals (via shims) and provides custom stream implementations
 * to allow Ink to run seamlessly in a web environment.
 *
 * @packageDocumentation
 */

export { InkCanvas } from "./components/InkCanvas";
export type { InkCanvasProps, InkCanvasHandle } from "./components/InkCanvas";
