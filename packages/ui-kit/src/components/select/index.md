---
nav: Components
group: Data Entry
title: Select
description: A dropdown selection component built on Radix UI. Supports multiple sizes, variants, custom item rendering, and disabled states.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Sizes

<code src="./demos/Sizes.tsx"></code>

## APIs

### Select

| Property      | Description                        | Type                                                         | Default     |
| ------------- | ---------------------------------- | ------------------------------------------------------------ | ----------- |
| value         | Controlled selected value          | `string`                                                     | -           |
| defaultValue  | Default selected value             | `string`                                                     | -           |
| onValueChange | Callback when value changes        | `(value: string) => void`                                    | -           |
| placeholder   | Placeholder text                   | `string`                                                     | -           |
| disabled      | Disable the select                 | `boolean`                                                    | `false`     |
| size          | Size of the select trigger         | `'sm' \| 'default' \| 'lg'`                                  | `'default'` |

Sub-components: `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`
