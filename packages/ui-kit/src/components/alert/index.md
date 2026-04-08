---
nav: Components
group: Feedback
title: Alert
description: Alert component for displaying important messages and notifications. Supports multiple types, filled and glass styles, and custom extra content.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Types

<code src="./demos/Types.tsx"></code>

## Filled & Glass

<code src="./demos/Styles.tsx"></code>

## APIs

### Alert

| Property     | Description                                    | Type                                               | Default   |
| ------------ | ---------------------------------------------- | -------------------------------------------------- | --------- |
| type         | Type of the alert                              | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| variant      | Style variant                                  | `'default' \| 'filled' \| 'glass'`                 | `'default'` |
| title        | Alert title                                    | `string`                                           | -         |
| description  | Alert description content                      | `ReactNode`                                        | -         |
| icon         | Custom icon                                    | `ReactNode`                                        | -         |
| action       | Action element on the right                    | `ReactNode`                                        | -         |
| extra        | Extra content below description                | `ReactNode`                                        | -         |
| closable     | Show close button                              | `boolean`                                          | `false`   |
| onClose      | Callback when closed                           | `() => void`                                       | -         |
| colorfulText | Apply colorful text matching alert type        | `boolean`                                          | `false`   |
