---
nav: Components
group: Data Display
title: Statistic
description: Statistic component for displaying numerical statistics with prefix, suffix, trend indicators, and loading states.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## Group

<code src="./demos/Group.tsx"></code>

## APIs

### Statistic

| Property  | Description                     | Type                              | Default |
| --------- | ------------------------------- | --------------------------------- | ------- |
| title     | Title label                     | `ReactNode`                       | -       |
| value     | Numeric or string value         | `number \| string`                | -       |
| prefix    | Content before the value        | `ReactNode`                       | -       |
| suffix    | Content after the value         | `ReactNode`                       | -       |
| precision | Decimal precision                | `number`                          | -       |
| loading   | Show loading skeleton           | `boolean`                         | `false` |
| formatter | Custom value formatter          | `(value: number \| string) => ReactNode` | - |
| trend     | Trend direction                 | `'up' \| 'down'`                  | -       |

### StatisticGroup

| Property | Description            | Type        | Default |
| -------- | ---------------------- | ----------- | ------- |
| columns  | Number of columns      | `number`    | `3`     |
| divided  | Show dividers between  | `boolean`   | `false` |
