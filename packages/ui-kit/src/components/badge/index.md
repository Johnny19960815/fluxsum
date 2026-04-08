---
nav: Components
group: Data Display
title: Badge
description: Badge generates a small badge to the top-right of its child element. Supports count display, dot mode, and status variants.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Variants

<code src="./demos/Variants.tsx"></code>

## APIs

### Badge

| Property  | Description                       | Type                                                                          | Default     |
| --------- | --------------------------------- | ----------------------------------------------------------------------------- | ----------- |
| variant   | Style variant                     | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info'` | `'default'` |
| className | Additional CSS class              | `string`                                                                      | -           |

### BadgeWrapper

| Property  | Description                       | Type                            | Default |
| --------- | --------------------------------- | ------------------------------- | ------- |
| count     | Count number to display           | `number`                        | -       |
| dot       | Show dot without number           | `boolean`                       | `false` |
| max       | Max count, shows `max+` when over | `number`                        | `99`    |
| offset    | Offset of the badge `[x, y]`      | `[number, number]`              | -       |
| variant   | Badge variant                     | `BadgeProps['variant']`         | -       |
| children  | Wrapped element                   | `ReactNode`                     | -       |
