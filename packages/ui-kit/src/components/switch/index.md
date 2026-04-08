---
nav: Components
group: Data Entry
title: Switch
description: Switch component for toggling between two states. Supports sizes, disabled state, and loading state.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Switch

| Property      | Description                       | Type                           | Default |
| ------------- | --------------------------------- | ------------------------------ | ------- |
| checked       | Controlled checked state          | `boolean`                      | -       |
| defaultChecked | Default checked state            | `boolean`                      | `false` |
| onCheckedChange | Callback when state changes     | `(checked: boolean) => void`   | -       |
| disabled      | Disable the switch                | `boolean`                      | `false` |
| size          | Size of the switch                | `'sm' \| 'default' \| 'lg'`   | `'default'` |
