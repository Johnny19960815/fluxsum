---
nav: Components
group: Data Entry
title: Checkbox
description: Checkbox component for selecting one or more options. Supports indeterminate state, disabled state, and custom labels.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Checkbox

| Property      | Description                         | Type                                           | Default |
| ------------- | ----------------------------------- | ---------------------------------------------- | ------- |
| checked       | Controlled checked state            | `boolean`                                      | -       |
| defaultChecked | Default checked state              | `boolean`                                      | `false` |
| onCheckedChange | Callback when checked changes     | `(checked: boolean \| 'indeterminate') => void`| -       |
| indeterminate | Show indeterminate state            | `boolean`                                      | `false` |
| disabled      | Disable the checkbox                | `boolean`                                      | `false` |
| id            | HTML id for label association       | `string`                                       | -       |
