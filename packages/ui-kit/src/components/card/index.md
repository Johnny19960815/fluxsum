---
nav: Components
group: Data Display
title: Card
description: Card is a container component for displaying content in a contained block. Supports multiple variants, shadow, hoverable and glass effects.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Variants

<code src="./demos/Variants.tsx"></code>

## APIs

### Card

| Property  | Description                          | Type                                                  | Default     |
| --------- | ------------------------------------ | ----------------------------------------------------- | ----------- |
| variant   | Style variant                        | `'default' \| 'outlined' \| 'filled' \| 'ghost'`     | `'default'` |
| shadow    | Shadow intensity                     | `'none' \| 'sm' \| 'default' \| 'md' \| 'lg' \| 'xl'` | `'none'`   |
| hoverable | Enable hover lift animation          | `boolean`                                             | `false`     |
| glass     | Apply glass morphism effect          | `boolean`                                             | `false`     |

Sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
