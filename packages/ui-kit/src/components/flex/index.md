---
nav: Components
group: Layout
title: Flex
description: Flex is a layout utility component that wraps CSS flexbox. Provides convenient props for direction, gap, alignment, wrapping, and inline mode.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Flex

| Property  | Description                     | Type                                                                   | Default    |
| --------- | ------------------------------- | ---------------------------------------------------------------------- | ---------- |
| direction | Flex direction                  | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'`              | `'row'`    |
| align     | Align items                     | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`            | `'stretch'`|
| justify   | Justify content                 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'`  | `'start'`  |
| wrap      | Flex wrap                       | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                | `'nowrap'` |
| gap       | Gap between items               | `number \| string`                                                     | -          |
| inline    | Use inline-flex                 | `boolean`                                                              | `false`    |
| flex      | CSS flex shorthand              | `string \| number`                                                     | -          |
