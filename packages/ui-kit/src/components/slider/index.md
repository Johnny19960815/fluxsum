---
nav: Components
group: Data Entry
title: Slider
description: Slider component for selecting a value within a range. Supports min, max, step, marks, and vertical orientation.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Slider

Built on Radix UI Slider. Accepts all `SliderPrimitive.Root` props.

| Property     | Description                  | Type                  | Default |
| ------------ | ---------------------------- | --------------------- | ------- |
| min          | Minimum value                | `number`              | `0`     |
| max          | Maximum value                | `number`              | `100`   |
| step         | Step increment               | `number`              | `1`     |
| defaultValue | Default value array          | `number[]`            | `[0]`   |
| value        | Controlled value array       | `number[]`            | -       |
| onValueChange | Callback on value change    | `(values: number[]) => void` | -  |
| disabled     | Disable the slider           | `boolean`             | `false` |
| orientation  | Layout orientation           | `'horizontal' \| 'vertical'` | `'horizontal'` |
