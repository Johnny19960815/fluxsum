---
nav: Components
group: Data Display
title: Popover
description: Popover displays floating content triggered by a click. Supports custom content, placement, and controlled mode.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Popover

Built on Radix UI Popover. Accepts all `PopoverPrimitive.Root` props.

Sub-components: `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverClose`

### PopoverContent

| Property   | Description                  | Type                                                  | Default    |
| ---------- | ---------------------------- | ----------------------------------------------------- | ---------- |
| side       | Preferred side of trigger    | `'top' \| 'right' \| 'bottom' \| 'left'`             | `'bottom'` |
| align      | Alignment against trigger    | `'start' \| 'center' \| 'end'`                       | `'center'` |
| sideOffset | Offset from the trigger      | `number`                                              | `4`        |
