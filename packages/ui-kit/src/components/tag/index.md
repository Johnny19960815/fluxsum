---
nav: Components
group: Data Display
title: Tag
description: Tag component for categorizing or marking content. Supports closable tags, custom colors, icons, and multiple sizes.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Closable

<code src="./demos/Closable.tsx"></code>

## APIs

### Tag

| Property  | Description                           | Type                                                                 | Default     |
| --------- | ------------------------------------- | -------------------------------------------------------------------- | ----------- |
| variant   | Style variant                         | `'default' \| 'outline' \| 'borderless' \| 'filled'`                | `'default'` |
| size      | Size of the tag                       | `'sm' \| 'default' \| 'lg'`                                          | `'default'` |
| color     | Color (preset name or hex value)      | `string`                                                             | -           |
| icon      | Icon element                          | `ReactNode`                                                          | -           |
| closable  | Show close button                     | `boolean`                                                            | `false`     |
| onClose   | Callback when close button clicked    | `(e: MouseEvent) => void`                                            | -           |
