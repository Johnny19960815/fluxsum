---
nav: Components
group: Data Entry
title: SearchBar
description: SearchBar component for search input with built-in clear and submit actions.
---

## Basic Usage

<code src="./demos/index.tsx"></code>

## APIs

### SearchBar

| Property    | Description                      | Type                          | Default |
| ----------- | -------------------------------- | ----------------------------- | ------- |
| value       | Controlled value                 | `string`                      | -       |
| defaultValue | Default value                   | `string`                      | -       |
| onChange    | Callback on input change         | `(value: string) => void`     | -       |
| onSearch    | Callback on search submit        | `(value: string) => void`     | -       |
| placeholder | Placeholder text                 | `string`                      | -       |
| allowClear  | Show clear button                | `boolean`                     | `true`  |
| loading     | Show loading state               | `boolean`                     | `false` |
| disabled    | Disable the search bar           | `boolean`                     | `false` |
| size        | Size of the search bar           | `'sm' \| 'default' \| 'lg'`   | `'default'` |
