---
nav: Components
group: General
title: Snippet
description: Snippet displays code or command strings with optional copy button. Supports multiple variants and shadow effects.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Snippet

| Property | Description                        | Type                                              | Default     |
| -------- | ---------------------------------- | ------------------------------------------------- | ----------- |
| children | Code content to display            | `string`                                          | -           |
| prefix   | Prefix symbol (e.g. `$`, `>`)      | `string`                                          | -           |
| copyable | Show copy button                   | `boolean`                                         | `true`      |
| variant  | Style variant                      | `'default' \| 'filled' \| 'ghost' \| 'outlined'` | `'default'` |
| shadow   | Add shadow effect                  | `boolean`                                         | `false`     |
