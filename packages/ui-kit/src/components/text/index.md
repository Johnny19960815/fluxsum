---
nav: Components
group: General
title: Text
description: Text component for rich typography. Supports semantic HTML tags, multiple type styles, font weight, size, decorations, color, ellipsis, and line clamping.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Types & Weights

<code src="./demos/Styles.tsx"></code>

## Ellipsis & Line Clamp

<code src="./demos/Overflow.tsx"></code>

## APIs

### Text

| Property   | Description                                    | Type                                                                         | Default   |
| ---------- | ---------------------------------------------- | ---------------------------------------------------------------------------- | --------- |
| as         | HTML tag to render                             | `'span' \| 'p' \| 'div' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'label' \| 'strong' \| 'em' \| 'code' \| 'kbd' \| 'small'` | `'span'` |
| type       | Semantic color type                            | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'destructive' \| 'info'` | `'default'` |
| size       | Font size preset                               | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| '2xl' \| '3xl'`              | -         |
| weight     | Font weight                                    | `'thin' \| 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold'` | -    |
| italic     | Italic style                                   | `boolean`                                                                    | `false`   |
| underline  | Underline decoration                           | `boolean`                                                                    | `false`   |
| mark       | Highlight mark background                      | `boolean`                                                                    | `false`   |
| code       | Code style                                     | `boolean`                                                                    | `false`   |
| disabled   | Disabled / muted appearance                    | `boolean`                                                                    | `false`   |
| delete     | Strikethrough decoration                       | `boolean`                                                                    | `false`   |
| ellipsis   | Truncate with ellipsis on single line          | `boolean`                                                                    | `false`   |
| lineClamp  | Clamp to N lines with ellipsis                 | `number`                                                                     | -         |
| color      | Custom CSS color value                         | `string`                                                                     | -         |
| noWrap     | Prevent text wrapping                          | `boolean`                                                                    | `false`   |
| textAlign  | Text alignment                                 | `CSSProperties['textAlign']`                                                 | -         |
| fontSize   | Custom font size CSS value                     | `string \| number`                                                           | -         |
| lineHeight | Custom line-height CSS value                   | `string \| number`                                                           | -         |
