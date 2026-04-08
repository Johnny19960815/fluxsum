---
nav: Components
group: Navigation
title: Pagination
description: Pagination component for navigating between multiple pages of content. Supports page size selection and total count display.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### Pagination

| Property       | Description                       | Type                          | Default |
| -------------- | --------------------------------- | ----------------------------- | ------- |
| page           | Current page (1-based)            | `number`                      | `1`     |
| pageSize       | Items per page                    | `number`                      | `10`    |
| total          | Total number of items             | `number`                      | `0`     |
| onChange       | Callback when page changes        | `(page: number, size: number) => void` | - |
| showSizeChanger | Show page size selector          | `boolean`                     | `false` |
| showQuickJumper | Show quick jump input            | `boolean`                     | `false` |
| disabled       | Disable all pagination controls   | `boolean`                     | `false` |
| simple         | Simplified display mode           | `boolean`                     | `false` |
