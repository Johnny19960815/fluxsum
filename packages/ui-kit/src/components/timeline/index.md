---
nav: Components
group: Data Display
title: Timeline
description: Timeline component for displaying chronological events. Supports custom dots, pending state, alternate and right modes.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Timeline

| Property | Description                          | Type                                    | Default  |
| -------- | ------------------------------------ | --------------------------------------- | -------- |
| mode     | Layout mode                          | `'left' \| 'alternate' \| 'right'`     | `'left'` |
| pending  | Show a loading indicator at the end  | `boolean \| ReactNode`                  | `false`  |
| reverse  | Reverse the order of items           | `boolean`                               | `false`  |

### TimelineItem

| Property   | Description                   | Type                                                      | Default     |
| ---------- | ----------------------------- | --------------------------------------------------------- | ----------- |
| dot        | Custom dot element             | `ReactNode`                                               | -           |
| dotVariant | Style for the default dot      | `'default' \| 'success' \| 'warning' \| 'destructive'`   | `'default'` |
| title      | Item title                     | `ReactNode`                                               | -           |
| time       | Timestamp                      | `string`                                                  | -           |
| extra      | Extra content                  | `ReactNode`                                               | -           |
| last       | Mark as last item              | `boolean`                                                 | `false`     |
