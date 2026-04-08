---
nav: Components
group: General
title: Hotkey
description: Hotkey component for displaying keyboard shortcuts. Automatically adapts between Apple (⌘/⌥) and Windows (Ctrl/Alt) styles.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Apple vs Windows

<code src="./demos/Platforms.tsx"></code>

## APIs

### Hotkey

| Property | Description                        | Type                                        | Default    |
| -------- | ---------------------------------- | ------------------------------------------- | ---------- |
| keys     | Array of key strings to display    | `string[]`                                  | -          |
| variant  | Style variant                      | `'default' \| 'outline' \| 'filled'`        | `'default'`|
| size     | Size of each key badge             | `'sm' \| 'default' \| 'lg'`                 | `'default'`|
| isApple  | Override Apple key detection       | `boolean`                                   | auto       |
