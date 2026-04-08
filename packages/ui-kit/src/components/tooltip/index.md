---
nav: Components
group: Data Display
title: Tooltip
description: Tooltip displays a popup hint when hovering over an element. Supports hotkey display, custom content, and multiple placement options.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## With Hotkey

<code src="./demos/Hotkey.tsx"></code>

## APIs

### Tooltip

| Property  | Description                          | Type                                                                                | Default  |
| --------- | ------------------------------------ | ----------------------------------------------------------------------------------- | -------- |
| title     | Tooltip content                      | `ReactNode`                                                                         | -        |
| hotkey    | Keyboard shortcut to display         | `string[]`                                                                          | -        |
| shortcut  | Shortcut string (auto-formatted)     | `string`                                                                            | -        |
| side      | Placement side                       | `'top' \| 'right' \| 'bottom' \| 'left'`                                           | `'top'`  |
| align     | Alignment                            | `'start' \| 'center' \| 'end'`                                                     | `'center'` |
| delayDuration | Delay before showing             | `number`                                                                            | `400`    |
| children  | Trigger element                      | `ReactNode`                                                                         | -        |
