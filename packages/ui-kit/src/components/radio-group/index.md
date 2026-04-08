---
nav: Components
group: Data Entry
title: RadioGroup
description: RadioGroup component for selecting a single option from a list. Built on Radix UI with keyboard navigation support.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### RadioGroup

| Property      | Description                      | Type                          | Default |
| ------------- | -------------------------------- | ----------------------------- | ------- |
| value         | Controlled selected value        | `string`                      | -       |
| defaultValue  | Default selected value           | `string`                      | -       |
| onValueChange | Callback when value changes      | `(value: string) => void`     | -       |
| disabled      | Disable all radio items          | `boolean`                     | `false` |
| orientation   | Layout orientation               | `'horizontal' \| 'vertical'`  | `'vertical'` |

### RadioGroupItem

| Property | Description          | Type      | Default |
| -------- | -------------------- | --------- | ------- |
| value    | Value for this item  | `string`  | -       |
| disabled | Disable this item    | `boolean` | `false` |
| id       | HTML id              | `string`  | -       |
