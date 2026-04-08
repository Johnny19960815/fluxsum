---
nav: Components
group: Data Display
title: List
description: List component for displaying a series of items. Supports variants, sizes, active key, loading state, header/footer, and custom renderItem.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### List

| Property    | Description                         | Type                                              | Default     |
| ----------- | ----------------------------------- | ------------------------------------------------- | ----------- |
| dataSource  | Data array for list items           | `T[]`                                             | `[]`        |
| renderItem  | Render function for each item       | `(item: T, index: number) => ReactNode`           | -           |
| header      | List header content                 | `ReactNode`                                       | -           |
| footer      | List footer content                 | `ReactNode`                                       | -           |
| loading     | Show loading state                  | `boolean`                                         | `false`     |
| variant     | Style variant                       | `'default' \| 'bordered' \| 'ghost'`              | `'default'` |
| size        | Item size                           | `'sm' \| 'default' \| 'lg'`                      | `'default'` |
| activeKey   | Active item key                     | `string \| number`                                | -           |
| onItemClick | Click handler for items             | `(item: T, index: number) => void`                | -           |
| emptyText   | Text shown when data is empty       | `ReactNode`                                       | `'No Data'` |
