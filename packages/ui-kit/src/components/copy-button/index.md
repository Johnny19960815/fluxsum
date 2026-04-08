---
nav: Components
group: General
title: CopyButton
description: CopyButton copies content to clipboard with visual feedback. Shows a checkmark icon after successful copy.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### CopyButton

| Property | Description                          | Type                          | Default  |
| -------- | ------------------------------------ | ----------------------------- | -------- |
| content  | Text content to copy to clipboard    | `string`                      | -        |
| timeout  | Duration (ms) to show success state  | `number`                      | `2000`   |
| variant  | Button style variant                 | `'ghost' \| 'outline' \| 'filled'` | `'ghost'` |
| size     | Button size                          | `'sm' \| 'default' \| 'lg'`  | `'default'` |
| onCopy   | Callback after copy                  | `(content: string) => void`  | -        |
