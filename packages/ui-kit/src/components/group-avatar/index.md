---
nav: Components
group: Data Display
title: GroupAvatar
description: GroupAvatar displays a group of avatar images with overlap effect. Supports max display count, shapes, and sizes.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### GroupAvatar

| Property | Description                                | Type                                            | Default    |
| -------- | ------------------------------------------ | ----------------------------------------------- | ---------- |
| items    | Array of avatar data                       | `GroupAvatarItem[]`                             | `[]`       |
| max      | Maximum number of avatars to display       | `number`                                        | `5`        |
| size     | Size of each avatar                        | `number \| 'sm' \| 'default' \| 'lg' \| 'xl'`  | `'default'`|
| shape    | Shape of each avatar                       | `'circle' \| 'square'`                          | `'circle'` |
| overlap  | Overlap amount in pixels                   | `number`                                        | `8`        |
| bordered | Show border on each avatar                 | `boolean`                                       | `true`     |

### GroupAvatarItem

| Property | Description     | Type     |
| -------- | --------------- | -------- |
| src      | Image URL       | `string` |
| alt      | Alt text        | `string` |
| fallback | Fallback text   | `string` |
