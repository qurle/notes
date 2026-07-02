# `createCanvasControl()`

Interactive on-canvas handle API for Figma plugins. Renders draggable handles directly on the canvas, attached to a layer, while the plugin is open.

> **Note:** This is a private/AI-agent-only API. It is not part of `@figma/plugin-typings` and does not appear on developers.figma.com. The source of truth is the bundled type definitions injected at plugin build time.

---

## Availability

Available on `SceneNode` as an optional method. Always guard before calling:

```ts
if (typeof node.createCanvasControl === 'function') {
  const control = node.createCanvasControl({ ... })
}
```

---

## Signature

```ts
node.createCanvasControl(options: CreateCanvasControlOptions): CanvasControl
```

---

## Control types

### `POINT`

A single draggable point.

```ts
{
  key: string
  type: 'POINT'
  name?: string
  unit?: 'px' | '%'        // default: '%'
  value: { x: number; y: number }
}
```

### `POINT_RADIUS`

A point with a radius ring. Drag the center to move, drag the ring to resize.

```ts
{
  key: string
  type: 'POINT_RADIUS'
  positionUnit?: 'px' | '%'
  radiusUnit?: 'px' | '%'
  value: { x: number; y: number; radius: number }
}
```

### `POINT_ANGLE_RADIUS`

A point with a radius ring and an angle arm. Used for light source / directional controls.

```ts
{
  key: string
  type: 'POINT_ANGLE_RADIUS'
  positionUnit?: 'px' | '%'
  radiusUnit?: 'px' | '%'
  value: { x: number; y: number; radius: number; angle: number }  // angle in degrees
}
```

### `POINT_POINT_LINE`

Two draggable endpoints connected by a line.

```ts
{
  key: string
  type: 'POINT_POINT_LINE'
  unit?: 'px' | '%'
  value: { x: number; y: number; x2: number; y2: number }
}
```

### `COLOR_POINT`

A draggable point with a color swatch. Clicking opens a color picker.

```ts
{
  key: string
  type: 'COLOR_POINT'
  unit?: 'px' | '%'
  value: {
    x: number; y: number
    color: { r: number; g: number; b: number; a: number }  // 0–1
  }
}
```

---

## `CanvasControl` interface

```ts
interface CanvasControl {
  readonly id: string
  readonly type:
    | 'POINT'
    | 'POINT_RADIUS'
    | 'POINT_ANGLE_RADIUS'
    | 'POINT_POINT_LINE'
    | 'COLOR_POINT'
  value: CanvasControlValue
  readonly removed: boolean
  on(
    event: 'change',
    handler: (value: CanvasControlValue, isDragging: boolean) => void,
  ): void
  once(
    event: 'change',
    handler: (value: CanvasControlValue, isDragging: boolean) => void,
  ): void
  off(
    event: 'change',
    handler: (value: CanvasControlValue, isDragging: boolean) => void,
  ): void
  remove(): void
}
```

| Member             | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `id`               | Unique handle ID                                                          |
| `value`            | Current position — readable and writable                                  |
| `removed`          | `true` after `remove()`                                                   |
| `on('change', fn)` | Fires while dragging; `isDragging` is `true` mid-drag, `false` on release |
| `remove()`         | Destroys the handle                                                       |

---

## Units

| Unit   | Meaning                                              |
| ------ | ---------------------------------------------------- |
| `'%'`  | Relative to the layer's size — scales with the layer |
| `'px'` | Absolute node-local pixels — does not scale          |

---

## Usage example

```ts
const control = node.createCanvasControl!({
  key: 'light-source',
  type: 'POINT_ANGLE_RADIUS',
  positionUnit: '%',
  radiusUnit: '%',
  value: { x: 50, y: 50, radius: 30, angle: -45 },
})

control.on('change', (value, isDragging) => {
  const v = value as CanvasControlPointAngleRadiusValue
  myParams.light = v
  figma.ui.postMessage({
    type: 'spatial-param-change',
    name: 'light',
    value: v,
  })
  applyEffect(myParams)
})

// Sync handle from UI
if (!control.removed) control.value = { x, y, radius, angle }

// Cleanup
figma.on('close', () => {
  if (!control.removed) control.remove()
})
```

---

## Behaviour notes

- Handles are visible **only while the plugin is open** — destroyed automatically on close.
- **One handle per `key` per node** — re-using the same key replaces the existing handle.
- Coordinates are **node-local**, not page coordinates. `{ x: 50, y: 50 }` in `%` is always the center of the layer.
- Always check `control.removed` before accessing a stored reference after selection changes.
- Do not create hidden layers to simulate handles — use this API directly.
