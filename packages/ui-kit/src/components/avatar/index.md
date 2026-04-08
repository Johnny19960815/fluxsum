---
nav: Components
group: Data Display
title: Avatar
description: Avatar component for displaying user profile images, initials, or icons. Supports multiple sizes, shapes, loading states, and fallback content.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Sizes & Shapes

<code src="./demos/Sizes.tsx"></code>

## APIs

### Avatar

| Property  | Description                     | Type                                              | Default    |
| --------- | ------------------------------- | ------------------------------------------------- | ---------- |
| src       | Image source URL                | `string`                                          | -          |
| alt       | Alt text for image              | `string`                                          | -          |
| fallback  | Fallback content when no image  | `ReactNode`                                       | -          |
| size      | Size in pixels or preset        | `number \| 'sm' \| 'default' \| 'lg' \| 'xl'`   | `'default'`|
| shape     | Shape of the avatar             | `'circle' \| 'square'`                            | `'circle'` |
| loading   | Show loading state              | `boolean`                                         | `false`    |
| animation | Animation on appearance         | `boolean`                                         | `false`    |
