---
nav: Components
group: Data Entry
title: Input
description: A basic widget for getting user input. Supports multiple variants, sizes, prefix/suffix decorators, password visibility toggle, and textarea.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Variants

<code src="./demos/Variants.tsx"></code>

## With Prefix / Suffix

<code src="./demos/Addons.tsx"></code>

## Password

<code src="./demos/Password.tsx"></code>

## TextArea

<code src="./demos/TextArea.tsx"></code>

## APIs

### Input

| Property     | Description                      | Type                                                               | Default     |
| ------------ | -------------------------------- | ------------------------------------------------------------------ | ----------- |
| variant      | Style variant                    | `'default' \| 'filled' \| 'outlined' \| 'ghost' \| 'underline'`   | `'default'` |
| inputSize    | Size of the input                | `'sm' \| 'default' \| 'middle' \| 'large' \| 'lg'`                | `'default'` |
| prefix       | Prefix content inside input      | `ReactNode`                                                        | -           |
| suffix       | Suffix content inside input      | `ReactNode`                                                        | -           |
| leftAddon    | Content prepended to the left    | `ReactNode`                                                        | -           |
| rightAddon   | Content appended to the right    | `ReactNode`                                                        | -           |
| error        | Show error state                 | `boolean`                                                          | `false`     |
| success      | Show success state               | `boolean`                                                          | `false`     |
| shadow       | Add shadow effect                | `boolean`                                                          | `false`     |
| allowClear   | Show clear button                | `boolean`                                                          | `false`     |
| errorMessage | Error message below input        | `string`                                                           | -           |
| helperText   | Helper text below input          | `string`                                                           | -           |

### InputPassword

Extends `Input` with password visibility toggle.

### Textarea

| Property | Description         | Type      | Default |
| -------- | ------------------- | --------- | ------- |
| shadow   | Add shadow effect   | `boolean` | `false` |
| resize   | Allow resize        | `boolean` | `false` |
