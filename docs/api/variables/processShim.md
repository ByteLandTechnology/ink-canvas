[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / processShim

# Variable: processShim

> `const` **processShim**: `object`

Default export compatible with Node.js 'process' module structure.
This object mimics the global `process` object in Node.js.

## Type Declaration

### argv

> **argv**: `string`[]

Mocked command line arguments.

#### Default Value

```ts
[];
```

### cwd()

> **cwd**: () => `string`

Mocked current working directory function.

#### Returns

`string`

Always returns root "/" in the browser environment.

### env

> **env**: `Record`\<`string`, `string` \| `undefined`\>

Mocked environment variables.
Includes defaults for common Node.js variables and Ink-specific settings.

#### Remarks

- `NODE_ENV`: Defaults to "production".
- `TERM`: Defaults to "xterm-256color" to ensure color support is detected.

### exit()

> **exit**: (`code?`) => `never`

Mocks `process.exit`.

Throws an error to indicate an exit attempt, as the browser window typically cannot be closed by scripts.

#### Parameters

##### code?

`number`

The exit code (unused effectively, but included in the error message).

#### Returns

`never`

Never returns.

#### Throws

Error Always throws 'process.exit(code) called'.

### nextTick()

> **nextTick**: (`callback`, ...`args`) => `void`

Emulates Node.js `process.nextTick` using `setTimeout`.

#### Parameters

##### callback

(...`args`) => `void`

The function to execute.

##### args

...`any`[]

Arguments to pass to the function.

#### Returns

`void`

### off()

> **off**: (`_event`, `_listener`) => `void`

Mocks `process.off` event listener removal.

#### Parameters

##### \_event

`string`

The name of the event.

##### \_listener

(...`args`) => `void`

The callback function.

#### Returns

`void`

### on()

> **on**: (`_event`, `_listener`) => `void`

Mocks `process.on` event listener registration.

#### Parameters

##### \_event

`string`

The name of the event.

##### \_listener

(...`args`) => `void`

The callback function.

#### Returns

`void`

### once()

> **once**: (`_event`, `_listener`) => `void`

Mocks `process.once` one-time event listener.

#### Parameters

##### \_event

`string`

The name of the event.

##### \_listener

(...`args`) => `void`

The callback function.

#### Returns

`void`

### platform

> **platform**: `string`

Mocked platform identifier.

#### Default Value

```ts
"browser";
```

### stderr

> **stderr**: `object`

Mocked stderr stream object.

#### stderr.columns

> **columns**: `number` = `80`

Number of columns in the terminal.

##### Default Value

```ts
80;
```

#### stderr.isTTY

> **isTTY**: `boolean` = `true`

Indicates if the stream is a TTY.

##### Default Value

```ts
true;
```

#### stderr.rows

> **rows**: `number` = `24`

Number of rows in the terminal.

##### Default Value

```ts
24;
```

#### stderr.write()

> **write**: (`_chunk`) => `boolean`

Mock implementation of write.

##### Parameters

###### \_chunk

Data to write (unused).

`string` | `Uint8Array`\<`ArrayBufferLike`\>

##### Returns

`boolean`

Always true.

### stdin

> **stdin**: `object`

Mocked stdin stream object.

#### stdin.isTTY

> **isTTY**: `boolean` = `true`

Indicates if the stream is a TTY.

##### Default Value

```ts
true;
```

#### stdin.on()

> **on**: () => `void`

Mock implementation of on (event listener).

##### Returns

`void`

#### stdin.pause()

> **pause**: () => `void`

Mock implementation of pause.

##### Returns

`void`

#### stdin.resume()

> **resume**: () => `void`

Mock implementation of resume.

##### Returns

`void`

#### stdin.setRawMode()

> **setRawMode**: () => `void`

Mock implementation of setRawMode.

##### Returns

`void`

### stdout

> **stdout**: `object`

Mocked stdout stream object.
Provides the minimal interface required by some checks before streams are fully piped.

#### stdout.columns

> **columns**: `number` = `80`

Number of columns in the terminal.

##### Default Value

```ts
80;
```

#### stdout.isTTY

> **isTTY**: `boolean` = `true`

Indicates if the stream is a TTY.

##### Default Value

```ts
true;
```

#### stdout.rows

> **rows**: `number` = `24`

Number of rows in the terminal.

##### Default Value

```ts
24;
```

#### stdout.write()

> **write**: (`_chunk`) => `boolean`

Mock implementation of write.

##### Parameters

###### \_chunk

Data to write (unused).

`string` | `Uint8Array`\<`ArrayBufferLike`\>

##### Returns

`boolean`

Always true.

### version

> **version**: `string`

Mocked Node.js version string.

#### Default Value

```ts
"";
```

### versions

> **versions**: `Record`\<`string`, `string`\>

Mocked versions object containing version strings of dependencies.

#### Default Value

```ts
{
}
```
