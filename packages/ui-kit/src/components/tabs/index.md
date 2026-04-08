---
nav: Components
group: Navigation
title: Tabs
description: Tabs organize content into multiple sections. Supports multiple variants including default, line, pills, segment, and card styles.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Variants

<code src="./demos/Variants.tsx"></code>

## APIs

### Tabs

Built on Radix UI Tabs. Accepts all `TabsPrimitive.Root` props.

### TabsList

| Property | Description      | Type                                                          | Default     |
| -------- | ---------------- | ------------------------------------------------------------- | ----------- |
| variant  | Style variant    | `'default' \| 'line' \| 'pills' \| 'segment' \| 'card'`     | `'default'` |

### TabsTrigger

| Property  | Description           | Type                                                         | Default     |
| --------- | --------------------- | ------------------------------------------------------------ | ----------- |
| variant   | Style variant         | `'default' \| 'line' \| 'pills' \| 'segment' \| 'card'`    | `'default'` |
| leftIcon  | Icon on the left      | `ReactNode`                                                  | -           |
| rightIcon | Icon on the right     | `ReactNode`                                                  | -           |

### TabsContent

Accepts all `TabsPrimitive.Content` props.
