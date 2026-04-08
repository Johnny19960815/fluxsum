---
nav: Components
group: Feedback
title: Progress
description: Progress component for displaying operation progress. Supports bar, circle, and steps variants with customizable colors and labels.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Circle

<code src="./demos/Circle.tsx"></code>

## Steps

<code src="./demos/Steps.tsx"></code>

## APIs

### Progress

| Property      | Description                       | Type                                                      | Default     |
| ------------- | --------------------------------- | --------------------------------------------------------- | ----------- |
| value         | Current progress value (0–100)    | `number`                                                  | `0`         |
| variant       | Color variant                     | `'default' \| 'success' \| 'warning' \| 'destructive'`   | `'default'` |
| size          | Bar height size                   | `'sm' \| 'default' \| 'lg'`                              | `'default'` |
| showLabel     | Show percentage label             | `boolean`                                                 | `false`     |
| label         | Custom label content              | `ReactNode`                                               | -           |
| animated      | Enable animation                  | `boolean`                                                 | `false`     |
| indeterminate | Show indeterminate state          | `boolean`                                                 | `false`     |

### ProgressCircle

| Property  | Description                 | Type      | Default |
| --------- | --------------------------- | --------- | ------- |
| value     | Progress value (0–100)      | `number`  | `0`     |
| size      | Circle diameter in px       | `number`  | `64`    |
| strokeWidth | Stroke width              | `number`  | `6`     |
| showLabel | Show label inside circle    | `boolean` | `true`  |

### ProgressSteps

| Property | Description              | Type     | Default |
| -------- | ------------------------ | -------- | ------- |
| value    | Current completed steps  | `number` | `0`     |
| steps    | Total number of steps    | `number` | `5`     |
| size     | Step block size          | `'sm' \| 'default' \| 'lg'` | `'default'` |
