[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / processShim

# Variable: processShim

> `const` **processShim**: `object`

Default export compatible with Node.js 'process' module structure

This object mimics the global `process` object in Node.js and is used
as a drop-in replacement when aliased via the Vite configuration.

## Type Declaration

### argv

> **argv**: `string`[]

Command line arguments (empty in browser)

### cwd()

> **cwd**: () => `string`

Get current working directory

Mocked current working directory function

Returns a placeholder working directory since the browser doesn't have
a traditional file system with a current working directory concept.

#### Returns

`string`

Always returns "/" as the root directory

#### Example

```typescript
import { cwd } from "ink-canvas/shims/process";
console.log(cwd()); // "/"
```

### env

> **env**: `Record`\<`string`, `string` \| `undefined`\>

Environment variables object

### exit()

> **exit**: (`code?`) => `never`

Exit process (throws error in browser)

Mocks `process.exit` for the browser environment

In Node.js, `process.exit` terminates the process with the given exit code.
In the browser, we cannot close the window/tab programmatically (for security reasons),
so we throw an error instead to indicate that an exit was attempted.

#### Parameters

##### code?

`number`

The exit code (included in the error message)

#### Returns

`never`

Never returns - always throws an error

#### Throws

Error with message 'process.exit(code) called'

#### Example

```typescript
import { exit } from "ink-canvas/shims/process";

try {
  exit(0);
} catch (e) {
  console.error(e.message); // "process.exit(0) called"
}
```

### nextTick()

> **nextTick**: (`callback`, ...`args`) => `void`

Schedule callback on next tick

Emulates Node.js `process.nextTick` using `setTimeout`

In Node.js, `nextTick` schedules a callback to be invoked in the next
iteration of the event loop, before any I/O operations. In the browser,
we approximate this behavior using `setTimeout` with a delay of 0.

#### Parameters

##### callback

(...`args`) => `void`

The function to execute on the next tick

##### args

...`unknown`[]

Arguments to pass to the callback function

#### Returns

`void`

#### Remarks

This is not a perfect emulation since `setTimeout(..., 0)` has different
timing characteristics than the true Node.js `nextTick`. However, it's
sufficient for most use cases in Ink.

For better emulation, consider using `queueMicrotask` or `Promise.resolve().then()`,
but `setTimeout` is used here for broader compatibility.

#### Example

```typescript
import { nextTick } from "ink-canvas/shims/process";

nextTick(() => {
  console.log("Executed on next tick");
});
console.log("Executed first");
// Output:
// "Executed first"
// "Executed on next tick"
```

### off()

> **off**: (`_event`, `_listener`) => `void`

Remove event listener (no-op)

Mocks `process.off` event listener removal

In Node.js, this removes a previously registered event listener.
In the browser, this is a no-op since we don't register any listeners.

#### Parameters

##### \_event

`string`

The name of the event (ignored)

##### \_listener

(...`args`) => `void`

The callback function (ignored)

#### Returns

`void`

### on()

> **on**: (`_event`, `_listener`) => `void`

Register event listener (no-op)

Mocks `process.on` event listener registration

In Node.js, this registers listeners for process events like 'exit',
'uncaughtException', 'SIGINT', etc. In the browser, these events don't
exist, so this is a no-op.

#### Parameters

##### \_event

`string`

The name of the event (ignored)

##### \_listener

(...`args`) => `void`

The callback function (ignored)

#### Returns

`void`

#### Example

```typescript
import { on } from "ink-canvas/shims/process";

// This does nothing in the browser
on("exit", () => console.log("Exiting"));
```

### once()

> **once**: (`_event`, `_listener`) => `void`

Register one-time event listener (no-op)

Mocks `process.once` one-time event listener registration

In Node.js, this registers a listener that is automatically removed
after being called once. In the browser, this is a no-op.

#### Parameters

##### \_event

`string`

The name of the event (ignored)

##### \_listener

(...`args`) => `void`

The callback function (ignored)

#### Returns

`void`

### platform

> **platform**: `string`

Platform identifier ("browser")

### stderr

> **stderr**: `object`

Standard error stream mock

#### stderr.columns

> **columns**: `number` = `80`

Number of columns in the terminal

##### Default Value

```ts
80;
```

#### stderr.isTTY

> **isTTY**: `boolean` = `true`

Indicates if the stream is connected to a TTY

##### Default Value

```ts
true;
```

#### stderr.rows

> **rows**: `number` = `24`

Number of rows in the terminal

##### Default Value

```ts
24;
```

#### stderr.write()

> **write**: (`_chunk`) => `boolean`

Mock implementation of write method

##### Parameters

###### \_chunk

Data to write (ignored in this mock)

`string` | `Uint8Array`\<`ArrayBufferLike`\>

##### Returns

`boolean`

Always returns true

### stdin

> **stdin**: `object`

Standard input stream mock

#### stdin.isTTY

> **isTTY**: `boolean` = `true`

Indicates if the stream is connected to a TTY

Set to true to enable raw input mode in Ink.

##### Default Value

```ts
true;
```

#### stdin.on()

> **on**: () => `void`

Registers an event listener

No-op in browser. Event handling is done through TerminalReadableStream.

##### Returns

`void`

#### stdin.pause()

> **pause**: () => `void`

Pauses the stream

No-op in browser.

##### Returns

`void`

#### stdin.resume()

> **resume**: () => `void`

Resumes the paused stream

No-op in browser.

##### Returns

`void`

#### stdin.setRawMode()

> **setRawMode**: () => `void`

Sets raw mode for the input stream

No-op in browser. Xterm.js already provides character-by-character
input similar to raw mode.

##### Returns

`void`

### stdout

> **stdout**: `object`

Standard output stream mock

#### stdout.columns

> **columns**: `number` = `80`

Number of columns in the terminal

This is a default value. The actual column count is determined by
the Xterm.js instance dimensions in InkCanvas.

##### Default Value

```ts
80;
```

#### stdout.isTTY

> **isTTY**: `boolean` = `true`

Indicates if the stream is connected to a TTY (terminal)

Set to true so that Ink enables TTY-specific features like colors
and cursor manipulation.

##### Default Value

```ts
true;
```

#### stdout.rows

> **rows**: `number` = `24`

Number of rows in the terminal

This is a default value. The actual row count is determined by
the Xterm.js instance dimensions in InkCanvas.

##### Default Value

```ts
24;
```

#### stdout.write()

> **write**: (`_chunk`) => `boolean`

Mock implementation of write method

This is a no-op that simply returns true. The actual writing to the
terminal is handled by TerminalWritableStream in InkCanvas.

##### Parameters

###### \_chunk

Data to write (ignored in this mock)

`string` | `Uint8Array`\<`ArrayBufferLike`\>

##### Returns

`boolean`

Always returns true indicating the write was "successful"

### version

> **version**: `string`

Node.js version string (empty in browser)

### versions

> **versions**: `Record`\<`string`, `string`\>

Versions of Node.js dependencies (empty in browser)

## Remarks

This object is the primary export that gets used when code imports
`process` or `node:process`. It aggregates all the individual mocked
properties and methods defined above.

The object structure matches Node.js's process object, allowing code
that uses `process.env`, `process.stdout`, `process.nextTick`, etc.
to work without modification in the browser.

## Example

```typescript
// This works thanks to the alias configuration
import process from "node:process";

console.log(process.env.NODE_ENV); // "production"
console.log(process.platform); // "browser"

process.nextTick(() => {
  console.log("Next tick callback");
});
```
