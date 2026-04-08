---
nav: Components
group: Data Display
title: Accordion
description: Accordion is a vertically stacked set of interactive headings. Each section can be expanded to reveal its content. Supports single and multiple expansion modes.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Multiple

<code src="./demos/Multiple.tsx"></code>

## APIs

### Accordion

| Property       | Description                              | Type                                   | Default    |
| -------------- | ---------------------------------------- | -------------------------------------- | ---------- |
| type           | Single or multiple expansion mode        | `'single' \| 'multiple'`               | `'single'` |
| defaultValue   | Default expanded value(s)                | `string \| string[]`                   | -          |
| value          | Controlled expanded value(s)             | `string \| string[]`                   | -          |
| onValueChange  | Callback when expanded value changes     | `(value: string \| string[]) => void`  | -          |
| collapsible    | Allow collapsing all items (single mode) | `boolean`                              | `false`    |
| variant        | Style variant                            | `'default' \| 'bordered' \| 'ghost'`   | `'default'`|
| gap            | Gap between items in pixels              | `number`                               | -          |
| disabled       | Disable all items                        | `boolean`                              | `false`    |

Sub-components: `AccordionItem`, `AccordionTrigger`, `AccordionContent`
