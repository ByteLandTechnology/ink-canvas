[**ink-canvas**](../README.md)

---

[ink-canvas](../globals.md) / InkCanvasProps

# Interface: InkCanvasProps

Configuration props for the InkCanvas component.

## Extends

- `HTMLAttributes`\<`HTMLDivElement`\>

## Properties

### about?

> `optional` **about**: `string`

#### Inherited from

`HTMLAttributes.about`

---

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`HTMLAttributes.accessKey`

---

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`HTMLAttributes.aria-activedescendant`

---

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`HTMLAttributes.aria-atomic`

---

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`HTMLAttributes.aria-autocomplete`

---

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`HTMLAttributes.aria-braillelabel`

---

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`HTMLAttributes.aria-brailleroledescription`

---

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`HTMLAttributes.aria-busy`

---

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

- aria-pressed
- aria-selected.

#### Inherited from

`HTMLAttributes.aria-checked`

---

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`HTMLAttributes.aria-colcount`

---

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

- aria-colcount
- aria-colspan.

#### Inherited from

`HTMLAttributes.aria-colindex`

---

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`HTMLAttributes.aria-colindextext`

---

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

- aria-colindex
- aria-rowspan.

#### Inherited from

`HTMLAttributes.aria-colspan`

---

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`HTMLAttributes.aria-controls`

---

### aria-current?

> `optional` **aria-current**: `boolean` \| `"true"` \| `"false"` \| `"page"` \| `"step"` \| `"location"` \| `"date"` \| `"time"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`HTMLAttributes.aria-current`

---

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`HTMLAttributes.aria-describedby`

---

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`HTMLAttributes.aria-description`

---

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`HTMLAttributes.aria-details`

---

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

- aria-hidden
- aria-readonly.

#### Inherited from

`HTMLAttributes.aria-disabled`

---

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"none"` \| `"link"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`HTMLAttributes.aria-dropeffect`

---

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

- aria-invalid
- aria-describedby.

#### Inherited from

`HTMLAttributes.aria-errormessage`

---

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`HTMLAttributes.aria-expanded`

---

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`HTMLAttributes.aria-flowto`

---

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`HTMLAttributes.aria-grabbed`

---

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"true"` \| `"false"` \| `"dialog"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`HTMLAttributes.aria-haspopup`

---

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`HTMLAttributes.aria-hidden`

---

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`HTMLAttributes.aria-invalid`

---

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`HTMLAttributes.aria-keyshortcuts`

---

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`HTMLAttributes.aria-label`

---

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`HTMLAttributes.aria-labelledby`

---

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`HTMLAttributes.aria-level`

---

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`HTMLAttributes.aria-live`

---

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`HTMLAttributes.aria-modal`

---

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`HTMLAttributes.aria-multiline`

---

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`HTMLAttributes.aria-multiselectable`

---

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`HTMLAttributes.aria-orientation`

---

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`HTMLAttributes.aria-owns`

---

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`HTMLAttributes.aria-placeholder`

---

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`HTMLAttributes.aria-posinset`

---

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "pressed" state of toggle buttons.

#### See

- aria-checked
- aria-selected.

#### Inherited from

`HTMLAttributes.aria-pressed`

---

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`HTMLAttributes.aria-readonly`

---

### aria-relevant?

> `optional` **aria-relevant**: `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`HTMLAttributes.aria-relevant`

---

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`HTMLAttributes.aria-required`

---

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`HTMLAttributes.aria-roledescription`

---

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`HTMLAttributes.aria-rowcount`

---

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

- aria-rowcount
- aria-rowspan.

#### Inherited from

`HTMLAttributes.aria-rowindex`

---

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`HTMLAttributes.aria-rowindextext`

---

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

- aria-rowindex
- aria-colspan.

#### Inherited from

`HTMLAttributes.aria-rowspan`

---

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

- aria-checked
- aria-pressed.

#### Inherited from

`HTMLAttributes.aria-selected`

---

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`HTMLAttributes.aria-setsize`

---

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`HTMLAttributes.aria-sort`

---

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`HTMLAttributes.aria-valuemax`

---

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`HTMLAttributes.aria-valuemin`

---

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`HTMLAttributes.aria-valuenow`

---

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`HTMLAttributes.aria-valuetext`

---

### autoCapitalize?

> `optional` **autoCapitalize**: `"none"` \| `"off"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"` \| `string` & `object`

#### Inherited from

`HTMLAttributes.autoCapitalize`

---

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`HTMLAttributes.autoCorrect`

---

### autoFit?

> `optional` **autoFit**: `boolean`

Whether to wrap the Ink app in a Box that matches the terminal dimensions.
When `true`, the children will be rendered inside a Box with width and height set to the terminal's current size.

#### Default

```ts
true;
```

---

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`HTMLAttributes.autoFocus`

---

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`HTMLAttributes.autoSave`

---

### children?

> `optional` **children**: `ReactNode`

#### Inherited from

`HTMLAttributes.children`

---

### className?

> `optional` **className**: `string`

#### Inherited from

`HTMLAttributes.className`

---

### color?

> `optional` **color**: `string`

#### Inherited from

`HTMLAttributes.color`

---

### cols?

> `optional` **cols**: `number`

Fixed number of columns for the terminal.
If not provided, the terminal will automatically fit to the container's width.

---

### content?

> `optional` **content**: `string`

#### Inherited from

`HTMLAttributes.content`

---

### contentEditable?

> `optional` **contentEditable**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`HTMLAttributes.contentEditable`

---

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`HTMLAttributes.contextMenu`

---

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`HTMLAttributes.dangerouslySetInnerHTML`

---

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`HTMLAttributes.datatype`

---

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`HTMLAttributes.defaultChecked`

---

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`HTMLAttributes.defaultValue`

---

### dir?

> `optional` **dir**: `string`

#### Inherited from

`HTMLAttributes.dir`

---

### draggable?

> `optional` **draggable**: `Booleanish`

#### Inherited from

`HTMLAttributes.draggable`

---

### enterKeyHint?

> `optional` **enterKeyHint**: `"search"` \| `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"send"`

#### Inherited from

`HTMLAttributes.enterKeyHint`

---

### exportparts?

> `optional` **exportparts**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`HTMLAttributes.exportparts`

---

### focused?

> `optional` **focused**: `boolean`

Whether the canvas is currently focused and should receive keyboard input.
When `false`, keyboard events will not be captured by the terminal.

#### Default

```ts
false;
```

---

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`HTMLAttributes.hidden`

---

### id?

> `optional` **id**: `string`

#### Inherited from

`HTMLAttributes.id`

---

### inert?

> `optional` **inert**: `boolean`

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`HTMLAttributes.inert`

---

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`HTMLAttributes.inlist`

---

### inputMode?

> `optional` **inputMode**: `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"email"` \| `"numeric"` \| `"decimal"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`HTMLAttributes.inputMode`

---

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`HTMLAttributes.is`

---

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`HTMLAttributes.itemID`

---

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`HTMLAttributes.itemProp`

---

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`HTMLAttributes.itemRef`

---

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`HTMLAttributes.itemScope`

---

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`HTMLAttributes.itemType`

---

### lang?

> `optional` **lang**: `string`

#### Inherited from

`HTMLAttributes.lang`

---

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`HTMLAttributes.nonce`

---

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAbort`

---

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAbortCapture`

---

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAnimationEnd`

---

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAnimationEndCapture`

---

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAnimationIteration`

---

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAnimationIterationCapture`

---

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAnimationStart`

---

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAnimationStartCapture`

---

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAuxClick`

---

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onAuxClickCapture`

---

### onBeforeInput?

> `optional` **onBeforeInput**: `InputEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onBeforeInput`

---

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onBeforeInputCapture`

---

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onBeforeToggle`

---

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onBlur`

---

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onBlurCapture`

---

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCanPlay`

---

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCanPlayCapture`

---

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCanPlayThrough`

---

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCanPlayThroughCapture`

---

### onChange?

> `optional` **onChange**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onChange`

---

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onChangeCapture`

---

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onClick`

---

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onClickCapture`

---

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCompositionEnd`

---

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCompositionEndCapture`

---

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCompositionStart`

---

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCompositionStartCapture`

---

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCompositionUpdate`

---

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCompositionUpdateCapture`

---

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onContextMenu`

---

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onContextMenuCapture`

---

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCopy`

---

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCopyCapture`

---

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCut`

---

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onCutCapture`

---

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDoubleClick`

---

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDoubleClickCapture`

---

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDrag`

---

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragCapture`

---

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragEnd`

---

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragEndCapture`

---

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragEnter`

---

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragEnterCapture`

---

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragExit`

---

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragExitCapture`

---

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragLeave`

---

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragLeaveCapture`

---

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragOver`

---

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragOverCapture`

---

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragStart`

---

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDragStartCapture`

---

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDrop`

---

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDropCapture`

---

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDurationChange`

---

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onDurationChangeCapture`

---

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onEmptied`

---

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onEmptiedCapture`

---

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onEncrypted`

---

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onEncryptedCapture`

---

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onEnded`

---

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onEndedCapture`

---

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onError`

---

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onErrorCapture`

---

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onFocus`

---

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onFocusCapture`

---

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onGotPointerCapture`

---

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onGotPointerCaptureCapture`

---

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onInput`

---

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onInputCapture`

---

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onInvalid`

---

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onInvalidCapture`

---

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onKeyDown`

---

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onKeyDownCapture`

---

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`HTMLAttributes.onKeyPress`

---

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`HTMLAttributes.onKeyPressCapture`

---

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onKeyUp`

---

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onKeyUpCapture`

---

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoad`

---

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoadCapture`

---

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoadedData`

---

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoadedDataCapture`

---

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoadedMetadata`

---

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoadedMetadataCapture`

---

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoadStart`

---

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLoadStartCapture`

---

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLostPointerCapture`

---

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onLostPointerCaptureCapture`

---

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseDown`

---

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseDownCapture`

---

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseEnter`

---

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseLeave`

---

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseMove`

---

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseMoveCapture`

---

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseOut`

---

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseOutCapture`

---

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseOver`

---

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseOverCapture`

---

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseUp`

---

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onMouseUpCapture`

---

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPaste`

---

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPasteCapture`

---

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPause`

---

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPauseCapture`

---

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPlay`

---

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPlayCapture`

---

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPlaying`

---

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPlayingCapture`

---

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerCancel`

---

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerCancelCapture`

---

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerDown`

---

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerDownCapture`

---

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerEnter`

---

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerLeave`

---

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerMove`

---

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerMoveCapture`

---

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerOut`

---

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerOutCapture`

---

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerOver`

---

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerOverCapture`

---

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerUp`

---

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onPointerUpCapture`

---

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onProgress`

---

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onProgressCapture`

---

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onRateChange`

---

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onRateChangeCapture`

---

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onReset`

---

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onResetCapture`

---

### onResize()?

> `optional` **onResize**: (`dimensions`) => `void`

Callback triggered when the terminal is resized.

#### Parameters

##### dimensions

`ITerminalDimensions`

#### Returns

`void`

---

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onScroll`

---

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onScrollCapture`

---

### onScrollEnd?

> `optional` **onScrollEnd**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onScrollEnd`

---

### onScrollEndCapture?

> `optional` **onScrollEndCapture**: `UIEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onScrollEndCapture`

---

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSeeked`

---

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSeekedCapture`

---

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSeeking`

---

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSeekingCapture`

---

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSelect`

---

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSelectCapture`

---

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onStalled`

---

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onStalledCapture`

---

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSubmit`

---

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSubmitCapture`

---

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSuspend`

---

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onSuspendCapture`

---

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTimeUpdate`

---

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTimeUpdateCapture`

---

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onToggle`

---

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchCancel`

---

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchCancelCapture`

---

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchEnd`

---

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchEndCapture`

---

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchMove`

---

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchMoveCapture`

---

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchStart`

---

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTouchStartCapture`

---

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionCancel`

---

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionCancelCapture`

---

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionEnd`

---

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionEndCapture`

---

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionRun`

---

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionRunCapture`

---

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionStart`

---

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onTransitionStartCapture`

---

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onVolumeChange`

---

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onVolumeChangeCapture`

---

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onWaiting`

---

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onWaitingCapture`

---

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onWheel`

---

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLDivElement`\>

#### Inherited from

`HTMLAttributes.onWheelCapture`

---

### part?

> `optional` **part**: `string`

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`HTMLAttributes.part`

---

### popover?

> `optional` **popover**: `""` \| `"auto"` \| `"manual"` \| `"hint"`

#### Inherited from

`HTMLAttributes.popover`

---

### popoverTarget?

> `optional` **popoverTarget**: `string`

#### Inherited from

`HTMLAttributes.popoverTarget`

---

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"toggle"` \| `"show"` \| `"hide"`

#### Inherited from

`HTMLAttributes.popoverTargetAction`

---

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`HTMLAttributes.prefix`

---

### property?

> `optional` **property**: `string`

#### Inherited from

`HTMLAttributes.property`

---

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`HTMLAttributes.radioGroup`

---

### rel?

> `optional` **rel**: `string`

#### Inherited from

`HTMLAttributes.rel`

---

### resource?

> `optional` **resource**: `string`

#### Inherited from

`HTMLAttributes.resource`

---

### results?

> `optional` **results**: `number`

#### Inherited from

`HTMLAttributes.results`

---

### rev?

> `optional` **rev**: `string`

#### Inherited from

`HTMLAttributes.rev`

---

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`HTMLAttributes.role`

---

### rows?

> `optional` **rows**: `number`

Fixed number of rows for the terminal.
If not provided, the terminal will automatically fit to the container's height.

---

### security?

> `optional` **security**: `string`

#### Inherited from

`HTMLAttributes.security`

---

### slot?

> `optional` **slot**: `string`

#### Inherited from

`HTMLAttributes.slot`

---

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`HTMLAttributes.spellCheck`

---

### style?

> `optional` **style**: `CSSProperties`

#### Inherited from

`HTMLAttributes.style`

---

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`HTMLAttributes.suppressContentEditableWarning`

---

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`HTMLAttributes.suppressHydrationWarning`

---

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`HTMLAttributes.tabIndex`

---

### terminalOptions?

> `optional` **terminalOptions**: `Omit`\<`ITerminalOptions`, `"disableStdin"`\>

Full Xterm.js terminal options configuration.

Provides fine-grained control over the terminal appearance and behavior.
Options provided here take precedence over legacy props like `fontFamily` or `fontSize`.

#### See

https://xtermjs.org/docs/api/terminal/interfaces/iterminaloptions/

---

### title?

> `optional` **title**: `string`

#### Inherited from

`HTMLAttributes.title`

---

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

#### Inherited from

`HTMLAttributes.translate`

---

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`HTMLAttributes.typeof`

---

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

#### Inherited from

`HTMLAttributes.unselectable`

---

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`HTMLAttributes.vocab`
